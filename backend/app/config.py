"""
Configuration management using Pydantic Settings.
Loads environment variables from .env file.
"""

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",  # Ignore extra environment variables
    )

    # OpenAI API
    openai_api_key: str

    # LangSmith Tracing
    langsmith_api_key: str = ""
    langchain_tracing_v2: bool = True
    langchain_project: str = "langchain-forum-rag"

    # Application Settings
    use_mock_chat: bool = False

    # Server Settings
    host: str = "0.0.0.0"
    port: int = 8000

    # RAG Configuration
    embedding_model: str = "text-embedding-3-small"
    embedding_dimensions: int = 1536
    llm_model: str = "gpt-4o-mini"
    llm_temperature: float = 0.1
    llm_max_tokens: int = 1000
    retrieval_top_k: int = 10  # Increased from 5 to get more diverse candidates
    rerank_top_k: int = 5  # Increased from 3 to provide more context

    # Data paths
    embeddings_file: str = "data/embeddings.json"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance (singleton pattern)."""
    return Settings()
