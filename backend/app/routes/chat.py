"""
Chat API Route.

POST /api/chat - RAG query endpoint with streaming support.
GET /api/chat - Health check.

Includes automatic evaluation and LangSmith feedback submission.
"""

import asyncio
import logging
import time
from typing import AsyncGenerator

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from langsmith import Client as LangSmithClient
from pydantic import BaseModel
from tenacity import retry, stop_after_attempt, wait_exponential

from app.config import get_settings
from app.chains.rag_chain import get_rag_chain
from app.components.evaluator import RAGEvaluator
from app.models.schemas import ChatRequest, ChatResponse, Source, Trace

logger = logging.getLogger(__name__)

router = APIRouter()

# Initialize evaluator (singleton)
_evaluator: RAGEvaluator | None = None


def get_evaluator() -> RAGEvaluator:
    """Get or create evaluator singleton."""
    global _evaluator
    if _evaluator is None:
        _evaluator = RAGEvaluator()
    return _evaluator


@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
)
async def submit_langsmith_feedback(
    run_id: str,
    query: str,
    context: str,
    answer: str,
    langsmith_api_key: str,
) -> None:
    """
    Compute evaluation metrics and submit as LangSmith feedback.

    This runs asynchronously in the background after the response is sent.

    Args:
        run_id: LangSmith run ID (captured directly from trace context)
        query: User query
        context: Retrieved context
        answer: Generated answer
        langsmith_api_key: LangSmith API key
    """
    try:
        # Initialize LangSmith client
        client = LangSmithClient(api_key=langsmith_api_key)

        # Compute evaluation scores
        evaluator = get_evaluator()
        scores = await evaluator.evaluate_async(query, context, answer)

        # Submit feedback for each metric
        for metric, score in scores.items():
            if metric != "overall":  # Skip overall, it's derived
                client.create_feedback(
                    run_id=run_id,
                    key=metric,
                    score=score,
                    comment=f"Auto-evaluated {metric} score",
                )

        logger.info(f"Submitted LangSmith feedback for run {run_id}: {scores}")

    except Exception as e:
        logger.error(f"Failed to submit LangSmith feedback: {e}")


# =============================================================================
# Mock Response (for development)
# =============================================================================

MOCK_RESPONSE = ChatResponse(
    answer="""Based on the forum discussions, here are common LangSmith authentication issues and solutions:

**Common Issues:**
1. **429 Too Many Requests** - Rate limiting on the API
2. **Invalid API Key** - Check your `LANGSMITH_API_KEY` environment variable
3. **Workspace Access** - Ensure your API key has access to the workspace

**Solutions:**
- Verify your API key at https://smith.langchain.com/settings
- Set `LANGCHAIN_TRACING_V2=true` in your environment
- Check your API key permissions

For more details, see the LangSmith documentation.""",
    sources=[
        Source(
            id="mock-1",
            title="Cannot log in to LangSmith",
            url="https://forum.langchain.com/t/2719",
            relevanceScore=0.92,
            snippet="Getting 429 Too Many Requests error when trying to authenticate...",
            tags=["langsmith", "authentication"],
        ),
        Source(
            id="mock-2",
            title="LangSmith API Key Issues",
            url="https://forum.langchain.com/t/2456",
            relevanceScore=0.88,
            snippet="My API key doesn't seem to work. I've double-checked...",
            tags=["langsmith", "api-key"],
        ),
    ],
    trace=Trace(
        embeddingDuration=0.15,
        retrievalDuration=0.32,
        rerankingDuration=0.18,
        generationDuration=1.42,
        totalDuration=2.07,
    ),
)


# =============================================================================
# Health Check
# =============================================================================


class HealthResponse(BaseModel):
    status: str
    message: str
    version: str


@router.get("/chat", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="ok",
        message="RAG Chat API is running",
        version="1.0.0",
    )


# =============================================================================
# Chat Endpoint
# =============================================================================


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    RAG Chat endpoint.

    Args:
        request: ChatRequest with query, optional filter, and stream flag

    Returns:
        ChatResponse with answer, sources, and trace metrics
    """
    settings = get_settings()

    # Mock mode for development
    if settings.use_mock_chat:
        logger.info("Using mock response (USE_MOCK_CHAT=true)")
        await asyncio.sleep(0.8)  # Simulate processing delay
        return MOCK_RESPONSE

    try:
        # Get RAG chain (singleton)
        chain = get_rag_chain()

        # Execute chain
        logger.info(f"Processing query: {request.query[:100]}...")
        start = time.time()

        result = await chain.ainvoke(
            query=request.query,
            filter=request.filter,
        )

        logger.info(f"Query processed in {time.time() - start:.2f}s")

        # Build context string from sources for evaluation
        context = "\n\n".join([
            f"[{s.title}]: {s.snippet}"
            for s in result["sources"]
        ]) if result["sources"] else ""

        # Submit evaluation feedback to LangSmith in background
        # (non-blocking - response is sent immediately)
        if result.get("run_id") and settings.langsmith_api_key and settings.langchain_tracing_v2:
            asyncio.create_task(
                submit_langsmith_feedback(
                    run_id=result["run_id"],
                    query=request.query,
                    context=context,
                    answer=result["answer"],
                    langsmith_api_key=settings.langsmith_api_key,
                )
            )

        return ChatResponse(
            answer=result["answer"],
            sources=result["sources"],
            trace=result["trace"],
        )

    except Exception as e:
        logger.error(f"Chat error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process query: {str(e)}",
        )


# =============================================================================
# Streaming Endpoint (LangServe native format)
# =============================================================================


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    Streaming RAG Chat endpoint with TRUE token-level streaming.

    Uses Server-Sent Events (SSE) to stream the response.
    Uses astream_events() for real token-by-token LLM streaming.
    """
    settings = get_settings()

    async def generate() -> AsyncGenerator[str, None]:
        """Generate SSE events."""
        import json

        try:
            if settings.use_mock_chat:
                # Mock streaming
                await asyncio.sleep(0.5)

                # Send sources first
                sources_data = [s.model_dump() for s in MOCK_RESPONSE.sources]
                yield f"data: {json.dumps({'type': 'sources', 'sources': sources_data})}\n\n"

                # Stream answer chunks
                for word in MOCK_RESPONSE.answer.split():
                    yield f"data: {json.dumps({'type': 'chunk', 'content': word + ' '})}\n\n"
                    await asyncio.sleep(0.05)

                yield "data: [DONE]\n\n"
                return

            # Real streaming using astream_events() for token-level streaming
            chain = get_rag_chain()
            inputs = {"query": request.query}
            if request.filter:
                inputs["filter"] = request.filter

            sources_sent = False
            trace_sent = False

            # Use astream_events() to get fine-grained events including LLM tokens
            async for event in chain._chain.astream_events(inputs, version="v2"):
                event_type = event.get("event")

                # Send sources when they're available (after retrieval + reranking)
                if not sources_sent and event_type == "on_chain_end":
                    data = event.get("data", {})
                    output = data.get("output", {})

                    if "sources" in output and output["sources"]:
                        sources_data = [s.model_dump() for s in output["sources"]]
                        yield f"data: {json.dumps({'type': 'sources', 'sources': sources_data})}\n\n"
                        sources_sent = True

                # Stream LLM tokens as they arrive (TRUE streaming)
                if event_type == "on_chat_model_stream":
                    chunk = event.get("data", {}).get("chunk")
                    if chunk and hasattr(chunk, "content") and chunk.content:
                        yield f"data: {json.dumps({'type': 'chunk', 'content': chunk.content})}\n\n"

                # Send trace at the end
                if not trace_sent and event_type == "on_chain_end":
                    data = event.get("data", {})
                    output = data.get("output", {})

                    if "trace" in output:
                        trace_data = output["trace"].model_dump()
                        yield f"data: {json.dumps({'type': 'trace', 'trace': trace_data})}\n\n"
                        trace_sent = True

            # Send done signal
            yield "data: [DONE]\n\n"

        except Exception as e:
            logger.error(f"Stream error: {str(e)}", exc_info=True)
            yield f"data: {json.dumps({'type': 'error', 'error': str(e)})}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
