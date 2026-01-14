"""
Embedding Loader for FAISS Vector Store

Loads pre-computed embeddings from JSON and initializes FAISS index.
Uses singleton pattern for memory efficiency.

CRITICAL: This module handles protected RAG elements:
- Embedding dimensions: 1536 (text-embedding-3-small)
- Vector store schema: FAISS with cosine similarity
- NEVER modify these without user approval + full impact analysis

Format: {"metadata": {...}, "documents": [{"id", "content", "metadata", "embedding"}]}
"""

import json
import logging
from pathlib import Path
from typing import Optional, List, Dict, Any
from threading import Lock

import faiss
import numpy as np
from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_core.embeddings import Embeddings
from langchain_openai import OpenAIEmbeddings


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DummyEmbeddings(Embeddings):
    """
    Dummy embeddings class for FAISS initialization.

    Since embeddings are pre-computed, we don't need actual embedding calls.
    This class satisfies LangChain's FAISS interface requirements.
    """

    def __init__(self, dimension: int = 1536):
        self.dimension = dimension

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Not used - embeddings are pre-computed"""
        logger.warning("embed_documents called on DummyEmbeddings - returning zeros")
        return [[0.0] * self.dimension for _ in texts]

    def embed_query(self, text: str) -> List[float]:
        """Not used - embeddings are pre-computed"""
        logger.warning("embed_query called on DummyEmbeddings - returning zeros")
        return [0.0] * self.dimension


class EmbeddingLoader:
    """
    Singleton loader for pre-computed embeddings.

    Features:
    - Loads embeddings from JSON file
    - Initializes FAISS index with cosine similarity
    - Supports metadata filtering
    - Thread-safe singleton pattern
    - Memory efficient (loads once)

    Protected Elements (DO NOT MODIFY without approval):
    - Embedding dimensions: 1536
    - Distance metric: cosine similarity (L2 normalized)
    - Vector store schema: FAISS flat index
    """

    _instance: Optional['EmbeddingLoader'] = None
    _lock: Lock = Lock()

    def __new__(cls):
        """Singleton pattern - only one instance exists"""
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        """Initialize loader (only runs once due to singleton)"""
        if self._initialized:
            return

        self.vector_store: Optional[FAISS] = None
        self.metadata: Optional[Dict[str, Any]] = None
        self.documents: List[Document] = []
        self._initialized = True
        logger.info("EmbeddingLoader initialized (singleton)")

    def load(
        self,
        embeddings_path: str = "../app/data/embeddings.json",
        force_reload: bool = False
    ) -> FAISS:
        """
        Load embeddings and initialize FAISS index.

        Args:
            embeddings_path: Path to embeddings JSON file (relative to backend folder)
            force_reload: Force reload even if already loaded

        Returns:
            FAISS vector store instance

        Raises:
            FileNotFoundError: If embeddings file doesn't exist
            ValueError: If embeddings format is invalid
            RuntimeError: If FAISS initialization fails
        """
        if self.vector_store is not None and not force_reload:
            logger.info("Using cached FAISS index")
            return self.vector_store

        # Resolve path (handle relative paths)
        embeddings_file = Path(embeddings_path)
        if not embeddings_file.is_absolute():
            # Assuming we're in backend/app/loaders/
            base_path = Path(__file__).parent.parent.parent
            embeddings_file = base_path / embeddings_path

        if not embeddings_file.exists():
            raise FileNotFoundError(
                f"Embeddings file not found: {embeddings_file}\n"
                f"Expected format: {{'metadata': {{...}}, 'documents': [...]}}"
            )

        logger.info(f"Loading embeddings from: {embeddings_file}")

        try:
            # Load JSON
            with open(embeddings_file, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Validate structure
            if 'metadata' not in data or 'documents' not in data:
                raise ValueError(
                    "Invalid embeddings format. Expected keys: 'metadata', 'documents'"
                )

            self.metadata = data['metadata']
            raw_documents = data['documents']

            # Validate metadata
            expected_dims = self.metadata.get('dimensions', 1536)
            if expected_dims != 1536:
                logger.warning(
                    f"⚠️  EMBEDDING DIMENSION MISMATCH: Expected 1536, got {expected_dims}\n"
                    f"This may require re-indexing. Proceed with caution."
                )

            logger.info(
                f"Loaded metadata: {self.metadata['total_documents']} documents, "
                f"{expected_dims} dimensions, "
                f"model: {self.metadata.get('embedding_model', 'unknown')}"
            )

            # Convert to LangChain Documents
            self.documents = []
            embeddings_matrix = []

            for doc_data in raw_documents:
                # Validate document structure
                if not all(k in doc_data for k in ['id', 'content', 'metadata', 'embedding']):
                    logger.warning(f"Skipping malformed document: {doc_data.get('id', 'unknown')}")
                    continue

                # Create Document
                doc = Document(
                    page_content=doc_data['content'],
                    metadata={
                        **doc_data['metadata'],
                        'id': doc_data['id']
                    }
                )
                self.documents.append(doc)

                # Extract embedding vector
                embedding = doc_data['embedding']
                if len(embedding) != expected_dims:
                    logger.warning(
                        f"Document {doc_data['id']} has wrong dimensions: "
                        f"{len(embedding)} (expected {expected_dims})"
                    )
                    continue

                embeddings_matrix.append(embedding)

            logger.info(f"Converted {len(self.documents)} documents to LangChain format")

            # Initialize FAISS index
            self.vector_store = self._create_faiss_index(
                self.documents,
                embeddings_matrix,
                expected_dims
            )

            logger.info("✅ FAISS index initialized successfully")
            return self.vector_store

        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON format: {e}")
        except Exception as e:
            raise RuntimeError(f"Failed to load embeddings: {e}")

    def _create_faiss_index(
        self,
        documents: List[Document],
        embeddings_matrix: List[List[float]],
        dimension: int
    ) -> FAISS:
        """
        Create FAISS index from documents and embeddings.

        Uses L2 normalized vectors for cosine similarity.

        Args:
            documents: LangChain Document objects
            embeddings_matrix: Pre-computed embedding vectors
            dimension: Embedding dimension (1536 for text-embedding-3-small)

        Returns:
            FAISS vector store instance
        """
        # Convert to numpy array
        embeddings_array = np.array(embeddings_matrix, dtype=np.float32)

        # L2 normalize for cosine similarity
        # cosine(a, b) = dot(a, b) / (norm(a) * norm(b))
        # With L2 normalized vectors: cosine(a, b) = dot(a, b)
        faiss.normalize_L2(embeddings_array)

        # Create FAISS index (Flat = exact search, no approximation)
        index = faiss.IndexFlatIP(dimension)  # IP = Inner Product (dot product)
        index.add(embeddings_array)

        logger.info(
            f"FAISS index created: {index.ntotal} vectors, "
            f"{dimension} dimensions, metric: cosine (L2 normalized)"
        )

        # Create FAISS vector store
        # Use OpenAIEmbeddings for query embedding (same model as stored embeddings)
        query_embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

        # Create InMemoryDocstore with document id mapping
        docstore = InMemoryDocstore({
            str(i): doc for i, doc in enumerate(documents)
        })

        vector_store = FAISS(
            embedding_function=query_embeddings,
            index=index,
            docstore=docstore,
            index_to_docstore_id={i: str(i) for i in range(len(documents))}
        )

        return vector_store

    def get_metadata(self) -> Optional[Dict[str, Any]]:
        """Get embeddings metadata (requires load() to be called first)"""
        return self.metadata

    def get_stats(self) -> Dict[str, Any]:
        """
        Get statistics about loaded embeddings.

        Returns:
            Dictionary with stats (requires load() to be called first)
        """
        if self.metadata is None or self.vector_store is None:
            return {"status": "not_loaded"}

        return {
            "status": "loaded",
            "total_documents": len(self.documents),
            "dimensions": self.metadata.get('dimensions'),
            "embedding_model": self.metadata.get('embedding_model'),
            "chunk_size": self.metadata.get('chunk_size'),
            "chunk_overlap": self.metadata.get('chunk_overlap'),
            "sources": self.metadata.get('sources', {}),
            "generated_at": self.metadata.get('generated_at'),
            "index_type": "FAISS Flat (exact search)",
            "distance_metric": "cosine (L2 normalized)"
        }

    def search(
        self,
        query_embedding: List[float],
        k: int = 5,
        filter_metadata: Optional[Dict[str, Any]] = None
    ) -> List[tuple[Document, float]]:
        """
        Search for similar documents.

        Args:
            query_embedding: Query vector (1536 dimensions)
            k: Number of results to return
            filter_metadata: Optional metadata filters (e.g., {"source": "forum"})

        Returns:
            List of (Document, similarity_score) tuples

        Raises:
            RuntimeError: If vector store not loaded
            ValueError: If query embedding has wrong dimensions
        """
        if self.vector_store is None:
            raise RuntimeError("Vector store not loaded. Call load() first.")

        expected_dims = self.metadata.get('dimensions', 1536)
        if len(query_embedding) != expected_dims:
            raise ValueError(
                f"Query embedding dimension mismatch: "
                f"got {len(query_embedding)}, expected {expected_dims}"
            )

        # LangChain FAISS handles metadata filtering internally
        if filter_metadata:
            # Note: LangChain's FAISS doesn't natively support metadata filtering
            # This would require post-filtering or using a different vector store
            logger.warning(
                "Metadata filtering not natively supported by FAISS. "
                "Consider using Pinecone, Milvus, or Chroma for advanced filtering."
            )

        # Perform similarity search
        # Note: We'd need to normalize the query embedding for cosine similarity
        query_array = np.array([query_embedding], dtype=np.float32)
        faiss.normalize_L2(query_array)

        # Search using FAISS directly for better control
        distances, indices = self.vector_store.index.search(query_array, k)

        # Convert to (Document, score) tuples
        results = []
        for idx, distance in zip(indices[0], distances[0]):
            if idx < len(self.documents):
                # Apply metadata filtering if specified
                doc = self.documents[idx]
                if filter_metadata:
                    if all(doc.metadata.get(k) == v for k, v in filter_metadata.items()):
                        results.append((doc, float(distance)))
                else:
                    results.append((doc, float(distance)))

        return results


# Global instance getter
_loader_instance: Optional[EmbeddingLoader] = None


def get_embedding_loader() -> EmbeddingLoader:
    """
    Get singleton EmbeddingLoader instance.

    Usage:
        loader = get_embedding_loader()
        vector_store = loader.load()
        results = vector_store.similarity_search("query", k=5)
    """
    global _loader_instance
    if _loader_instance is None:
        _loader_instance = EmbeddingLoader()
    return _loader_instance
