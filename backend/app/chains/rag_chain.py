"""
LCEL RAG Chain Implementation.

This module demonstrates LangChain Expression Language (LCEL) for building
composable RAG pipelines. Key concepts for interview:

1. RunnablePassthrough - Pass data through unchanged or with modifications
2. RunnableParallel - Execute multiple branches concurrently
3. | operator - Chain composition (pipe operator)
4. .assign() - Add new keys to the state dictionary
"""

import time
import logging
from functools import lru_cache
from typing import Any, Optional

from langchain_core.documents import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import (
    Runnable,
    RunnableLambda,
    RunnableParallel,
    RunnablePassthrough,
)
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

from app.config import get_settings
from app.loaders.embedding_loader import get_embedding_loader
from app.components.retriever import VectorRetriever
from app.components.reranker import CrossEncoderReranker
from app.components.evaluator import RAGEvaluator
from app.models.schemas import MetadataFilter, Source, Trace

logger = logging.getLogger(__name__)

# =============================================================================
# System Prompt (matches TypeScript implementation)
# =============================================================================

SYSTEM_PROMPT = """You are a helpful assistant specializing in LangChain, LangSmith, and LangGraph.
You answer questions based on the provided context from the LangChain forum and documentation.

RULES:
1. Only answer based on the provided context. If the context doesn't contain relevant information, say "I don't have enough information to answer this question."
2. Cite sources when possible by mentioning the forum post title or documentation page.
3. Be concise but thorough in your explanations.
4. If the question is about code, provide code examples when relevant.
5. Format your response using markdown for better readability.

CONTEXT:
{context}

Remember: Only use information from the context above. Do not make up information."""


# =============================================================================
# Helper Functions
# =============================================================================


def format_context(documents: list[Document]) -> str:
    """Format retrieved documents into context string for LLM.

    Args:
        documents: List of retrieved documents with metadata

    Returns:
        Formatted context string with document content and metadata
    """
    if not documents:
        return "No relevant documents found."

    context_parts = []
    for i, doc in enumerate(documents, 1):
        metadata = doc.metadata
        title = metadata.get("title", "Unknown")
        source = metadata.get("source", "unknown")
        url = metadata.get("url", "")

        # Format each document
        context_parts.append(
            f"[Source {i}] {title}\n"
            f"Type: {source}\n"
            f"URL: {url}\n"
            f"Content: {doc.page_content}\n"
        )

    return "\n---\n".join(context_parts)


def format_sources(documents: list[Document]) -> list[Source]:
    """Convert documents to Source response objects.

    Args:
        documents: List of retrieved documents with scores

    Returns:
        List of Source objects for API response
    """
    sources = []
    for doc in documents:
        metadata = doc.metadata
        score = metadata.get("relevance_score", metadata.get("score", 0.0))

        sources.append(
            Source(
                id=metadata.get("id", metadata.get("topic_id", "unknown")),
                title=metadata.get("title", "Unknown"),
                url=metadata.get("url", ""),
                relevanceScore=min(max(score, 0.0), 1.0),  # Clamp to [0, 1]
                snippet=doc.page_content[:150] + "..."
                if len(doc.page_content) > 150
                else doc.page_content,
                tags=metadata.get("tags", []),
            )
        )

    return sources


# =============================================================================
# RAG Chain Class
# =============================================================================


class RAGChain:
    """
    RAG Chain implementation using LangChain Expression Language (LCEL).

    This class demonstrates key LCEL patterns:
    - Composable chains with | operator
    - State management with RunnablePassthrough
    - Parallel execution with RunnableParallel
    - Custom runnables with RunnableLambda

    Interview talking points:
    1. Why LCEL? - Composable, type-safe, streaming support
    2. RunnablePassthrough.assign() - Add computed values to state
    3. RunnableParallel - Execute branches concurrently
    4. Streaming - Built-in streaming through the chain
    """

    def __init__(
        self,
        embeddings: Optional[OpenAIEmbeddings] = None,
        llm: Optional[ChatOpenAI] = None,
        retriever: Optional[VectorRetriever] = None,
        reranker: Optional[CrossEncoderReranker] = None,
        evaluator: Optional[RAGEvaluator] = None,
    ):
        """
        Initialize RAG chain with optional dependency injection.

        Args:
            embeddings: OpenAI embeddings (default: text-embedding-3-small)
            llm: Language model (default: gpt-4o-mini)
            retriever: Vector retriever (default: FAISS-based)
            reranker: Cross-encoder reranker (optional)
            evaluator: RAG evaluator (optional)
        """
        settings = get_settings()

        # Load embeddings into vector store (singleton - only loads once)
        logger.info("Loading embeddings...")
        loader = get_embedding_loader()
        loader.load(embeddings_path=settings.embeddings_file)
        logger.info(f"Loaded {len(loader.documents)} documents into vector store")

        # Initialize components with dependency injection
        self.embeddings = embeddings or OpenAIEmbeddings(
            model=settings.embedding_model,
            openai_api_key=settings.openai_api_key,
        )

        self.llm = llm or ChatOpenAI(
            model=settings.llm_model,
            temperature=settings.llm_temperature,
            max_tokens=settings.llm_max_tokens,
            openai_api_key=settings.openai_api_key,
        )

        self.retriever = retriever or VectorRetriever(
            k=settings.retrieval_top_k,
        )

        self.reranker = reranker or CrossEncoderReranker(
            top_k=settings.rerank_top_k,
        )

        self.evaluator = evaluator or RAGEvaluator()

        # Build the chain
        self._chain = self._build_chain()

        # Timing state (for trace)
        self._timing: dict[str, float] = {}

    def _build_chain(self) -> Runnable:
        """
        Build the LCEL chain.

        Chain architecture:
        Input: {"query": str, "filter": Optional[MetadataFilter]}
            ↓
        [Retrieve] - Get relevant documents
            ↓
        [Rerank] - Reorder by relevance
            ↓
        [Generate] - Produce answer with context
            ↓
        Output: {"answer": str, "sources": list[Source], "trace": Trace}
        """
        # Prompt template
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", SYSTEM_PROMPT),
                ("human", "{query}"),
            ]
        )

        # Build chain using LCEL
        chain = (
            # Step 1: Retrieve documents
            RunnablePassthrough.assign(
                documents=self._retrieve_with_timing,
            )
            # Step 2: Rerank documents
            | RunnablePassthrough.assign(
                reranked_docs=self._rerank_with_timing,
            )
            # Step 3: Format context
            | RunnablePassthrough.assign(
                context=lambda x: format_context(x["reranked_docs"]),
            )
            # Step 4: Generate answer with parallel source formatting
            | RunnableParallel(
                answer=(
                    RunnableLambda(lambda x: {"query": x["query"], "context": x["context"]})
                    | prompt
                    | self._generate_with_timing
                    | StrOutputParser()
                ),
                sources=RunnableLambda(lambda x: format_sources(x["reranked_docs"])),
                trace=RunnableLambda(lambda _: self._get_trace()),
            )
        )

        return chain

    def _retrieve_with_timing(self, inputs: dict[str, Any]) -> list[Document]:
        """Retrieve documents with timing."""
        start = time.time()

        # Apply filter if provided
        filter_dict = inputs.get("filter")
        if filter_dict and isinstance(filter_dict, dict):
            self.retriever.update_filter(MetadataFilter(**filter_dict))
        elif isinstance(filter_dict, MetadataFilter):
            self.retriever.update_filter(filter_dict)

        # Retrieve
        docs = self.retriever.invoke(inputs["query"])

        self._timing["retrieval"] = time.time() - start
        return docs

    def _rerank_with_timing(self, inputs: dict[str, Any]) -> list[Document]:
        """Rerank documents with timing."""
        start = time.time()

        docs = self.reranker.rerank(inputs["query"], inputs["documents"])

        self._timing["reranking"] = time.time() - start
        return docs

    def _generate_with_timing(self, messages: Any) -> Any:
        """Wrap LLM with timing."""
        start = time.time()
        result = self.llm.invoke(messages)
        self._timing["generation"] = time.time() - start
        return result

    def _get_trace(self) -> Trace:
        """Get timing trace for the pipeline."""
        total = sum(self._timing.values())
        return Trace(
            embeddingDuration=self._timing.get("embedding", 0.0),
            retrievalDuration=self._timing.get("retrieval", 0.0),
            rerankingDuration=self._timing.get("reranking"),
            generationDuration=self._timing.get("generation", 0.0),
            totalDuration=total,
        )

    def invoke(
        self,
        query: str,
        filter: Optional[MetadataFilter] = None,
    ) -> dict[str, Any]:
        """
        Execute the RAG chain.

        Args:
            query: User question
            filter: Optional metadata filter

        Returns:
            Dict with answer, sources, and trace
        """
        # Reset timing
        self._timing = {}

        # Execute chain
        inputs = {"query": query}
        if filter:
            inputs["filter"] = filter

        return self._chain.invoke(inputs)

    async def ainvoke(
        self,
        query: str,
        filter: Optional[MetadataFilter] = None,
    ) -> dict[str, Any]:
        """Async version of invoke."""
        self._timing = {}
        inputs = {"query": query}
        if filter:
            inputs["filter"] = filter

        return await self._chain.ainvoke(inputs)

    def stream(
        self,
        query: str,
        filter: Optional[MetadataFilter] = None,
    ):
        """
        Stream the RAG chain output.

        Yields chunks as they're generated by the LLM.
        """
        self._timing = {}
        inputs = {"query": query}
        if filter:
            inputs["filter"] = filter

        return self._chain.stream(inputs)

    async def astream(
        self,
        query: str,
        filter: Optional[MetadataFilter] = None,
    ):
        """Async streaming version."""
        self._timing = {}
        inputs = {"query": query}
        if filter:
            inputs["filter"] = filter

        async for chunk in self._chain.astream(inputs):
            yield chunk


# =============================================================================
# Singleton Factory
# =============================================================================

_chain_instance: Optional[RAGChain] = None


@lru_cache(maxsize=1)
def get_rag_chain() -> RAGChain:
    """
    Get or create singleton RAG chain instance.

    Uses lru_cache for thread-safe singleton pattern.
    """
    global _chain_instance
    if _chain_instance is None:
        logger.info("Initializing RAG chain...")
        _chain_instance = RAGChain()
        logger.info("RAG chain initialized successfully")
    return _chain_instance


# =============================================================================
# LangServe-compatible Chain Export
# =============================================================================

def get_langserve_chain() -> Runnable:
    """
    Get the raw LCEL chain for LangServe integration.

    LangServe expects a Runnable, not a wrapper class.
    This returns the internal chain directly.
    """
    return get_rag_chain()._chain
