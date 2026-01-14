"""
Pydantic models for API requests and responses.
Matches the TypeScript interfaces for frontend compatibility.
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


# =============================================================================
# Chat API Models
# =============================================================================


class MetadataFilter(BaseModel):
    """Filter criteria for document retrieval."""

    tags: Optional[list[str]] = None
    source: Optional[str] = None  # "forum" | "docs"
    resolved: Optional[bool] = None


class ChatRequest(BaseModel):
    """Request model for chat endpoint."""

    query: str = Field(..., min_length=1, description="User question")
    filter: Optional[MetadataFilter] = None
    stream: bool = False


class Source(BaseModel):
    """Source document returned with chat response."""

    id: str
    title: str
    url: str
    relevanceScore: float = Field(..., ge=0, le=1)
    snippet: str
    tags: list[str] = []


class Trace(BaseModel):
    """Timing trace for RAG pipeline steps."""

    embeddingDuration: float
    retrievalDuration: float
    rerankingDuration: Optional[float] = None
    generationDuration: float
    totalDuration: float


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""

    answer: str
    sources: list[Source]
    trace: Optional[Trace] = None


# =============================================================================
# Evaluation API Models
# =============================================================================


class EvaluationMetrics(BaseModel):
    """Evaluation metrics for a run."""

    faithfulness: float = Field(0, ge=0, le=1)
    relevance: float = Field(0, ge=0, le=1)
    correctness: float = Field(0, ge=0, le=1)
    helpfulness: float = Field(0, ge=0, le=1)


class EvaluationSummary(BaseModel):
    """Summary statistics for evaluation runs."""

    totalRuns: int
    avgFaithfulness: float
    avgRelevance: float
    avgCorrectness: float
    passRate: float
    totalExamples: int
    passedExamples: int
    avgLatency: float


class EvaluationRun(BaseModel):
    """Single evaluation run details."""

    id: str
    name: str
    projectName: str
    createdAt: str
    status: str  # "completed" | "running" | "failed"
    metrics: EvaluationMetrics
    totalExamples: int
    passedExamples: int
    avgLatency: float


class EvaluationScores(BaseModel):
    """Individual trace scores."""

    faithfulness: Optional[float] = None
    relevance: Optional[float] = None
    correctness: Optional[float] = None


class EvaluationTrace(BaseModel):
    """Single trace details."""

    id: str
    input: str
    expectedOutput: Optional[str] = None
    actualOutput: str
    scores: EvaluationScores
    passed: bool
    latency: float


class EvaluationResponse(BaseModel):
    """Combined evaluation response."""

    summary: Optional[EvaluationSummary] = None
    runs: Optional[list[EvaluationRun]] = None
    traces: Optional[list[EvaluationTrace]] = None


# =============================================================================
# Internal Models (for RAG pipeline)
# =============================================================================


class Document(BaseModel):
    """Internal document representation."""

    id: str
    content: str
    metadata: dict
    embedding: Optional[list[float]] = None
    score: Optional[float] = None


class RetrievedDocument(BaseModel):
    """Document with retrieval score."""

    id: str
    content: str
    metadata: dict
    score: float
