"""
Reranker component for retrieved documents using cross-encoder models.

Provides relevance-based reranking using sentence-transformers cross-encoders
with fallback to text overlap heuristics.
"""

import logging
from typing import List, Tuple

import numpy as np
from langchain_core.documents import Document
from sentence_transformers import CrossEncoder

logger = logging.getLogger(__name__)


class CrossEncoderReranker:
    """
    Reranks retrieved documents using a cross-encoder model.

    Cross-encoders jointly encode query and document pairs to produce
    relevance scores, providing more accurate ranking than bi-encoders.

    Attributes:
        model_name: HuggingFace model name for cross-encoder
        top_k: Number of top documents to return after reranking
        model: Loaded CrossEncoder model instance
    """

    def __init__(
        self,
        model_name: str = "cross-encoder/ms-marco-MiniLM-L-6-v2",
        top_k: int = 3
    ):
        """
        Initialize the reranker with specified model and top-K parameter.

        Args:
            model_name: HuggingFace cross-encoder model identifier
            top_k: Number of top-ranked documents to return
        """
        self.model_name = model_name
        self.top_k = top_k
        self.model = None

        try:
            logger.info(f"Loading cross-encoder model: {model_name}")
            self.model = CrossEncoder(model_name)
            logger.info("Cross-encoder model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load cross-encoder model: {e}")
            logger.warning("Will use fallback text overlap heuristic")

    def _sigmoid(self, x: np.ndarray) -> np.ndarray:
        """
        Apply sigmoid function to normalize scores to [0, 1] range.

        Args:
            x: Input scores array

        Returns:
            Normalized scores in [0, 1] range
        """
        return 1 / (1 + np.exp(-x))

    def _text_overlap_score(self, query: str, document: str) -> float:
        """
        Calculate relevance score based on text overlap heuristic.

        Fallback method when cross-encoder model is unavailable.
        Uses Jaccard similarity on word sets.

        Args:
            query: Query text
            document: Document text

        Returns:
            Overlap score in [0, 1] range
        """
        query_words = set(query.lower().split())
        doc_words = set(document.lower().split())

        if not query_words or not doc_words:
            return 0.0

        intersection = query_words.intersection(doc_words)
        union = query_words.union(doc_words)

        return len(intersection) / len(union)

    def _rerank_with_model(
        self,
        query: str,
        documents: List[Document]
    ) -> List[Tuple[Document, float]]:
        """
        Rerank documents using the cross-encoder model.

        Args:
            query: Query text
            documents: List of documents to rerank

        Returns:
            List of (document, score) tuples sorted by relevance
        """
        if not self.model:
            raise ValueError("Cross-encoder model not loaded")

        # Prepare query-document pairs for the model
        pairs = [[query, doc.page_content] for doc in documents]

        # Get relevance scores from cross-encoder
        raw_scores = self.model.predict(pairs)

        # Normalize scores to [0, 1] using sigmoid
        normalized_scores = self._sigmoid(np.array(raw_scores))

        # Combine documents with scores
        doc_score_pairs = list(zip(documents, normalized_scores))

        # Sort by score descending
        doc_score_pairs.sort(key=lambda x: x[1], reverse=True)

        return doc_score_pairs

    def _rerank_with_fallback(
        self,
        query: str,
        documents: List[Document]
    ) -> List[Tuple[Document, float]]:
        """
        Rerank documents using text overlap heuristic (fallback).

        Args:
            query: Query text
            documents: List of documents to rerank

        Returns:
            List of (document, score) tuples sorted by relevance
        """
        doc_score_pairs = []

        for doc in documents:
            score = self._text_overlap_score(query, doc.page_content)
            doc_score_pairs.append((doc, score))

        # Sort by score descending
        doc_score_pairs.sort(key=lambda x: x[1], reverse=True)

        return doc_score_pairs

    def rerank(
        self,
        query: str,
        documents: List[Document],
        top_k: int | None = None
    ) -> List[Document]:
        """
        Rerank documents based on query-document relevance.

        Uses cross-encoder model if available, otherwise falls back to
        text overlap heuristic. Returns top-K most relevant documents.

        Args:
            query: Query text
            documents: List of documents to rerank
            top_k: Number of top documents to return (overrides instance default)

        Returns:
            Top-K reranked documents sorted by relevance (descending)

        Raises:
            ValueError: If documents list is empty
        """
        if not documents:
            raise ValueError("Documents list cannot be empty")

        k = top_k if top_k is not None else self.top_k
        k = min(k, len(documents))  # Don't exceed available documents

        logger.info(f"Reranking {len(documents)} documents with query: {query[:100]}...")

        try:
            if self.model:
                doc_score_pairs = self._rerank_with_model(query, documents)
                logger.info("Reranking completed using cross-encoder model")
            else:
                doc_score_pairs = self._rerank_with_fallback(query, documents)
                logger.info("Reranking completed using fallback heuristic")

            # Extract top-K documents
            top_docs = [doc for doc, score in doc_score_pairs[:k]]

            # Log scores for debugging
            for i, (doc, score) in enumerate(doc_score_pairs[:k], 1):
                logger.debug(f"Rank {i}: score={score:.4f}, content={doc.page_content[:100]}...")

            return top_docs

        except Exception as e:
            logger.error(f"Error during reranking: {e}")

            # Final fallback: return original documents truncated to top-K
            logger.warning(f"Returning original document order (top {k})")
            return documents[:k]

    def rerank_with_scores(
        self,
        query: str,
        documents: List[Document],
        top_k: int | None = None
    ) -> List[Tuple[Document, float]]:
        """
        Rerank documents and return with relevance scores.

        Args:
            query: Query text
            documents: List of documents to rerank
            top_k: Number of top documents to return (overrides instance default)

        Returns:
            List of (document, score) tuples for top-K documents

        Raises:
            ValueError: If documents list is empty
        """
        if not documents:
            raise ValueError("Documents list cannot be empty")

        k = top_k if top_k is not None else self.top_k
        k = min(k, len(documents))

        logger.info(f"Reranking {len(documents)} documents with scores...")

        try:
            if self.model:
                doc_score_pairs = self._rerank_with_model(query, documents)
            else:
                doc_score_pairs = self._rerank_with_fallback(query, documents)

            return doc_score_pairs[:k]

        except Exception as e:
            logger.error(f"Error during reranking with scores: {e}")

            # Final fallback: return with zero scores
            logger.warning("Returning original documents with zero scores")
            return [(doc, 0.0) for doc in documents[:k]]
