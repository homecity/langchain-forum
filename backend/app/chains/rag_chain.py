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

from langsmith import traceable
from langsmith.run_helpers import get_current_run_tree
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
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
)
import openai
import httpx

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
1. Answer based on the provided context. Use the context to synthesize a helpful response.
2. If the context contains related information, use it to provide useful guidance even if it doesn't perfectly match the question.
3. Cite sources when possible by mentioning the forum post title or documentation page.
4. Be concise but thorough in your explanations.
5. If the question is about code, provide code examples when relevant.
6. Format your response using markdown for better readability.
7. Only say "I don't have enough information" if the context is completely unrelated to the question.

CONTEXT:
{context}

Use the context above to provide a helpful answer."""


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
            # Step 3: Format context and sources (can be parallel since no timing)
            | RunnablePassthrough.assign(
                context=lambda x: format_context(x["reranked_docs"]),
                sources=lambda x: format_sources(x["reranked_docs"]),
            )
            # Step 4: Generate answer (must complete before trace)
            | RunnablePassthrough.assign(
                answer=RunnableLambda(self._generate_answer_with_timing),
            )
            # Step 5: Compute trace AFTER generation is complete
            | RunnableParallel(
                answer=RunnableLambda(lambda x: x["answer"]),
                sources=RunnableLambda(lambda x: x["sources"]),
                trace=RunnableLambda(lambda x: self._get_trace(x)),
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

        # Store timing in inputs dict instead of instance variable
        duration = time.time() - start
        inputs["_retrieval_duration"] = duration

        return docs

    def _rerank_with_timing(self, inputs: dict[str, Any]) -> list[Document]:
        """Rerank documents with timing."""
        start = time.time()

        docs = self.reranker.rerank(inputs["query"], inputs["documents"])

        # Store timing in inputs dict instead of instance variable
        duration = time.time() - start
        inputs["_reranking_duration"] = duration

        return docs

    def _generate_answer_with_timing(self, inputs: dict[str, Any]) -> str:
        """Generate answer with timing, storing duration in inputs dict."""
        # Build the prompt
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", SYSTEM_PROMPT),
                ("human", "{query}"),
            ]
        )

        start = time.time()

        # Format and invoke
        messages = prompt.invoke({"query": inputs["query"], "context": inputs["context"]})
        result = self.llm.invoke(messages)

        # Store timing in inputs dict
        duration = time.time() - start
        inputs["_generation_duration"] = duration

        # Parse to string
        return StrOutputParser().invoke(result)

    def _get_trace(self, inputs: dict[str, Any]) -> Trace:
        """Get timing trace for the pipeline from inputs dict."""
        retrieval = inputs.get("_retrieval_duration", 0.0)
        reranking = inputs.get("_reranking_duration")
        generation = inputs.get("_generation_duration", 0.0)

        total = retrieval + (reranking or 0.0) + generation

        return Trace(
            embeddingDuration=0.0,  # Not tracked separately
            retrievalDuration=retrieval,
            rerankingDuration=reranking,
            generationDuration=generation,
            totalDuration=total,
        )

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type((openai.RateLimitError, httpx.TimeoutException)),
        reraise=True
    )
    @traceable(name="RAG Query", run_type="chain")
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
        # Execute chain
        inputs = {"query": query}
        if filter:
            inputs["filter"] = filter

        result = self._chain.invoke(inputs)

        # Capture run ID from trace context
        run_tree = get_current_run_tree()
        if run_tree:
            result["run_id"] = str(run_tree.id)

        return result

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        retry=retry_if_exception_type((openai.RateLimitError, httpx.TimeoutException)),
        reraise=True
    )
    @traceable(name="RAG Query", run_type="chain")
    async def ainvoke(
        self,
        query: str,
        filter: Optional[MetadataFilter] = None,
    ) -> dict[str, Any]:
        """Async version of invoke."""
        inputs = {"query": query}
        if filter:
            inputs["filter"] = filter

        result = await self._chain.ainvoke(inputs)

        # Capture run ID from trace context
        run_tree = get_current_run_tree()
        if run_tree:
            result["run_id"] = str(run_tree.id)

        return result

    def stream(
        self,
        query: str,
        filter: Optional[MetadataFilter] = None,
    ):
        """
        Stream the RAG chain output.

        Yields chunks as they're generated by the LLM.
        """
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
