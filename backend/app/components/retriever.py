"""
Custom FAISS-based vector retriever with metadata filtering.

This module provides a VectorRetriever class that implements document retrieval
using FAISS for similarity search with support for metadata filtering.
"""

from typing import Any, Optional

from langchain_core.callbacks import (
    AsyncCallbackManagerForRetrieverRun,
    CallbackManagerForRetrieverRun,
)
from langchain_core.documents import Document
from langchain_core.retrievers import BaseRetriever
from langchain_openai import OpenAIEmbeddings

from app.loaders import get_embedding_loader
from app.models.schemas import MetadataFilter


class VectorRetriever(BaseRetriever):
    """
    Custom retriever using FAISS for vector similarity search.

    This retriever supports:
    - FAISS-based cosine similarity search
    - Metadata filtering (tags, source, resolved status)
    - Top-K document retrieval with scores
    - LCEL chain compatibility via BaseRetriever inheritance

    Attributes:
        k: Number of documents to retrieve (default: 5)
        filter: Optional metadata filter criteria
        score_threshold: Minimum similarity score threshold (default: 0.0)
        embeddings: OpenAI embedding model instance

    Example:
        ```python
        retriever = VectorRetriever(
            k=5,
            filter=MetadataFilter(tags=["python"], resolved=True)
        )
        docs = retriever.invoke("How to use async in Python?")
        ```
    """

    k: int = 5
    filter: Optional[MetadataFilter] = None
    score_threshold: float = 0.0
    embeddings: Optional[OpenAIEmbeddings] = None

    def __init__(
        self,
        k: int = 5,
        filter: Optional[MetadataFilter] = None,
        score_threshold: float = 0.0,
        embeddings: Optional[OpenAIEmbeddings] = None,
        **kwargs: Any,
    ):
        """
        Initialize the VectorRetriever.

        Args:
            k: Number of documents to retrieve (default: 5)
            filter: Optional metadata filter for document filtering
            score_threshold: Minimum similarity score (0.0-1.0, default: 0.0)
            embeddings: Optional OpenAI embeddings instance (uses default if None)
            **kwargs: Additional arguments passed to BaseRetriever
        """
        super().__init__(**kwargs)
        self.k = k
        self.filter = filter
        self.score_threshold = score_threshold
        self.embeddings = embeddings or OpenAIEmbeddings(
            model="text-embedding-3-small"
        )

    def _get_relevant_documents(
        self,
        query: str,
        *,
        run_manager: Optional[CallbackManagerForRetrieverRun] = None,
    ) -> list[Document]:
        """
        Retrieve relevant documents for the given query.

        This method:
        1. Gets the FAISS vector store from EmbeddingLoader
        2. Applies metadata filtering if specified
        3. Performs similarity search with scores
        4. Filters by score threshold
        5. Returns top-K documents

        Args:
            query: User's search query
            run_manager: Optional callback manager for tracing

        Returns:
            List of Document objects with metadata and similarity scores

        Raises:
            ValueError: If vector store is not initialized or query is empty
        """
        if not query or not query.strip():
            raise ValueError("Query cannot be empty")

        # Get vector store from loader
        loader = get_embedding_loader()
        vector_store = loader.vector_store

        if vector_store is None:
            raise ValueError(
                "Vector store not initialized. Run embedding loader first."
            )

        # Build metadata filter dictionary for FAISS
        metadata_filter = self._build_metadata_filter()

        # Perform similarity search with scores
        # FAISS returns (Document, score) tuples where score is distance
        # We convert distance to similarity score (1 - distance for cosine)
        docs_and_scores = vector_store.similarity_search_with_score(
            query,
            k=self.k * 2,  # Fetch 2x to account for filtering
            filter=metadata_filter,
        )

        # For FAISS with Inner Product (IP) and normalized vectors:
        # - Higher scores = more similar (range approximately 0 to 1)
        # - Score is already a similarity score, not a distance
        filtered_docs = []
        for doc, score in docs_and_scores:
            # Score from FAISS IP is already similarity (higher = better)
            # Normalize to [0, 1] range (IP scores can sometimes exceed 1 slightly)
            similarity_score = max(0.0, min(1.0, score))

            # Apply score threshold filter
            if similarity_score >= self.score_threshold:
                # Add score to document metadata for downstream use
                doc.metadata["relevance_score"] = round(similarity_score, 4)
                filtered_docs.append(doc)

        # Return top-K documents after filtering
        return filtered_docs[: self.k]

    def _build_metadata_filter(self) -> Optional[dict[str, Any]]:
        """
        Build FAISS-compatible metadata filter dictionary.

        Converts MetadataFilter object to a dictionary that FAISS can use
        for filtering documents during retrieval.

        Returns:
            Dictionary with filter criteria, or None if no filter specified

        Example:
            MetadataFilter(tags=["python"], resolved=True)
            -> {"tags": ["python"], "resolved": True}
        """
        if not self.filter:
            return None

        filter_dict: dict[str, Any] = {}

        if self.filter.tags is not None:
            # FAISS supports array membership filtering
            filter_dict["tags"] = self.filter.tags

        if self.filter.source is not None:
            filter_dict["source"] = self.filter.source

        if self.filter.resolved is not None:
            filter_dict["resolved"] = self.filter.resolved

        return filter_dict if filter_dict else None

    async def _aget_relevant_documents(
        self,
        query: str,
        *,
        run_manager: Optional[AsyncCallbackManagerForRetrieverRun] = None,
    ) -> list[Document]:
        """
        Async version of document retrieval.

        Currently delegates to synchronous implementation since FAISS
        operations are CPU-bound and don't benefit from async.

        Args:
            query: User's search query
            run_manager: Optional callback manager for tracing

        Returns:
            List of Document objects with metadata and similarity scores
        """
        # FAISS is CPU-bound, so we use sync implementation
        # In production, consider using asyncio.to_thread() for true async
        # Note: We don't pass the async run_manager to the sync method
        return self._get_relevant_documents(query)

    def update_filter(self, filter: Optional[MetadataFilter]) -> None:
        """
        Update the metadata filter for subsequent retrievals.

        Allows dynamic filter modification without recreating the retriever.

        Args:
            filter: New metadata filter or None to clear

        Example:
            ```python
            retriever = VectorRetriever(k=5)
            retriever.update_filter(MetadataFilter(resolved=False))
            unresolved_docs = retriever.invoke("bug in async code")
            ```
        """
        self.filter = filter

    def update_k(self, k: int) -> None:
        """
        Update the number of documents to retrieve.

        Args:
            k: New top-K value (must be positive)

        Raises:
            ValueError: If k is less than 1
        """
        if k < 1:
            raise ValueError("k must be at least 1")
        self.k = k

    def update_score_threshold(self, threshold: float) -> None:
        """
        Update the minimum similarity score threshold.

        Args:
            threshold: New threshold value (0.0-1.0)

        Raises:
            ValueError: If threshold is outside [0.0, 1.0] range
        """
        if not 0.0 <= threshold <= 1.0:
            raise ValueError("Score threshold must be between 0.0 and 1.0")
        self.score_threshold = threshold


# Convenience function for quick retriever creation
def create_vector_retriever(
    k: int = 5,
    filter: Optional[MetadataFilter] = None,
    score_threshold: float = 0.0,
) -> VectorRetriever:
    """
    Factory function to create a VectorRetriever instance.

    Args:
        k: Number of documents to retrieve
        filter: Optional metadata filter
        score_threshold: Minimum similarity score

    Returns:
        Configured VectorRetriever instance

    Example:
        ```python
        retriever = create_vector_retriever(
            k=3,
            filter=MetadataFilter(source="docs"),
            score_threshold=0.7
        )
        ```
    """
    return VectorRetriever(k=k, filter=filter, score_threshold=score_threshold)
