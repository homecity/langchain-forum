"""
LangChain Forum RAG Backend - FastAPI Application.

This is the main entry point for the LangServe backend.

Features:
- CORS middleware for Next.js frontend
- LangServe automatic routes (/langserve/chat)
- Custom API routes (/api/chat, /api/evaluation)
- Health check endpoint

Run with:
    uvicorn app.main:app --reload --port 8000
"""

import logging
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langserve import add_routes

from app.config import get_settings
from app.routes.chat import router as chat_router
from app.routes.evaluation import router as evaluation_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def create_app() -> FastAPI:
    """
    Create and configure the FastAPI application.

    This factory pattern allows for easy testing and configuration.
    """
    settings = get_settings()

    # Set API keys as environment variables (required for LangChain components)
    os.environ["OPENAI_API_KEY"] = settings.openai_api_key

    # Set LangSmith environment variables
    if settings.langchain_tracing_v2:
        os.environ["LANGCHAIN_TRACING_V2"] = "true"
    if settings.langsmith_api_key:
        os.environ["LANGSMITH_API_KEY"] = settings.langsmith_api_key
    if settings.langchain_project:
        os.environ["LANGCHAIN_PROJECT"] = settings.langchain_project

    # Create FastAPI app
    app = FastAPI(
        title="LangChain Forum RAG API",
        description="RAG-powered Q&A system for LangChain forum and documentation",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # ==========================================================================
    # CORS Middleware
    # ==========================================================================

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3000",  # Next.js dev server
            "http://127.0.0.1:3000",
            "http://localhost:3001",  # Alternative port
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ==========================================================================
    # Health Check
    # ==========================================================================

    @app.get("/")
    async def root():
        """Root endpoint - basic health check."""
        return {
            "status": "ok",
            "service": "LangChain Forum RAG API",
            "version": "1.0.0",
        }

    @app.get("/health")
    async def health():
        """Health check endpoint."""
        return {
            "status": "healthy",
            "langsmith_enabled": bool(settings.langsmith_api_key),
            "mock_mode": settings.use_mock_chat,
        }

    # ==========================================================================
    # LangServe Routes (Automatic playground, invoke, stream, batch)
    # ==========================================================================

    try:
        from app.chains.rag_chain import get_langserve_chain

        add_routes(
            app,
            get_langserve_chain(),
            path="/langserve/chat",
            enabled_endpoints=["invoke", "stream", "batch", "playground"],
        )
        logger.info("LangServe routes added at /langserve/chat")
    except Exception as e:
        logger.warning(f"Could not add LangServe routes: {e}")
        logger.warning("LangServe playground will not be available")

    # ==========================================================================
    # Custom API Routes
    # ==========================================================================

    app.include_router(chat_router, prefix="/api", tags=["Chat"])
    app.include_router(evaluation_router, prefix="/api", tags=["Evaluation"])

    logger.info("API routes registered:")
    logger.info("  - POST /api/chat - RAG query endpoint")
    logger.info("  - POST /api/chat/stream - Streaming endpoint")
    logger.info("  - GET /api/evaluation - LangSmith evaluation data")
    logger.info("  - GET /langserve/chat/playground - LangServe playground")

    return app


# Create the app instance
app = create_app()


if __name__ == "__main__":
    import uvicorn

    settings = get_settings()
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=True,
    )
