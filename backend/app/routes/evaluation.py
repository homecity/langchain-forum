"""
Evaluation API Route.

GET /api/evaluation - Fetch evaluation data from LangSmith.
"""

import logging
from enum import Enum
from typing import Optional

from fastapi import APIRouter, HTTPException, Query
from langsmith import Client

from app.config import get_settings
from app.models.schemas import (
    EvaluationResponse,
    EvaluationSummary,
    EvaluationRun,
    EvaluationTrace,
    EvaluationMetrics,
    EvaluationScores,
)

logger = logging.getLogger(__name__)

router = APIRouter()


class EvaluationType(str, Enum):
    """Evaluation data type to fetch."""
    SUMMARY = "summary"
    RUNS = "runs"
    TRACES = "traces"
    ALL = "all"


# =============================================================================
# LangSmith Client Wrapper
# =============================================================================


class LangSmithEvaluationClient:
    """
    Client for fetching evaluation data from LangSmith.

    Wraps the LangSmith Python SDK to match the TypeScript API responses.
    """

    def __init__(self):
        settings = get_settings()
        self.client = Client(api_key=settings.langsmith_api_key)
        self.project_name = settings.langchain_project

    async def get_summary(self) -> EvaluationSummary:
        """Get summary statistics for evaluation runs."""
        try:
            runs = list(self.client.list_runs(
                project_name=self.project_name,
                is_root=True,
                limit=50,
            ))

            if not runs:
                return EvaluationSummary(
                    totalRuns=0,
                    avgFaithfulness=0,
                    avgRelevance=0,
                    avgCorrectness=0,
                    passRate=0,
                    totalExamples=0,
                    passedExamples=0,
                    avgLatency=0,
                )

            # Calculate metrics from feedback
            faithfulness_scores = []
            relevance_scores = []
            correctness_scores = []
            latencies = []
            passed_count = 0

            for run in runs:
                # Get feedback for this run
                try:
                    feedbacks = list(self.client.list_feedback(run_ids=[run.id]))
                    for fb in feedbacks:
                        if fb.score is not None and isinstance(fb.score, (int, float)):
                            key = (fb.key or "").lower()
                            if "faithful" in key:
                                faithfulness_scores.append(fb.score)
                            elif "relevan" in key:
                                relevance_scores.append(fb.score)
                            elif "correct" in key:
                                correctness_scores.append(fb.score)
                except Exception:
                    pass

                # Calculate latency
                if run.end_time and run.start_time:
                    latency = (run.end_time - run.start_time).total_seconds() * 1000
                    latencies.append(latency)

                # Check if passed
                if run.status == "success":
                    passed_count += 1

            def avg(lst: list) -> float:
                return sum(lst) / len(lst) if lst else 0

            return EvaluationSummary(
                totalRuns=len(runs),
                avgFaithfulness=avg(faithfulness_scores),
                avgRelevance=avg(relevance_scores),
                avgCorrectness=avg(correctness_scores),
                passRate=passed_count / len(runs) if runs else 0,
                totalExamples=len(runs),
                passedExamples=passed_count,
                avgLatency=avg(latencies),
            )

        except Exception as e:
            logger.error(f"Error fetching summary: {e}")
            return EvaluationSummary(
                totalRuns=0,
                avgFaithfulness=0,
                avgRelevance=0,
                avgCorrectness=0,
                passRate=0,
                totalExamples=0,
                passedExamples=0,
                avgLatency=0,
            )

    async def get_runs(self, limit: int = 10) -> list[EvaluationRun]:
        """Get evaluation runs."""
        try:
            runs = list(self.client.list_runs(
                project_name=self.project_name,
                is_root=True,
                limit=limit,
            ))

            result = []
            for run in runs:
                # Get feedback scores
                metrics = EvaluationMetrics()
                try:
                    feedbacks = list(self.client.list_feedback(run_ids=[run.id]))
                    for fb in feedbacks:
                        if fb.score is not None and isinstance(fb.score, (int, float)):
                            key = (fb.key or "").lower()
                            if "faithful" in key:
                                metrics.faithfulness = fb.score
                            elif "relevan" in key:
                                metrics.relevance = fb.score
                            elif "correct" in key:
                                metrics.correctness = fb.score
                            elif "helpful" in key:
                                metrics.helpfulness = fb.score
                except Exception:
                    pass

                # Calculate latency
                latency = 0
                if run.end_time and run.start_time:
                    latency = (run.end_time - run.start_time).total_seconds() * 1000

                # Determine status
                status = "completed"
                if run.error:
                    status = "failed"
                elif not run.end_time:
                    status = "running"

                result.append(EvaluationRun(
                    id=str(run.id),
                    name=run.name or "RAG Query",
                    projectName=self.project_name,
                    createdAt=run.start_time.isoformat() if run.start_time else "",
                    status=status,
                    metrics=metrics,
                    totalExamples=1,
                    passedExamples=1 if run.status == "success" else 0,
                    avgLatency=latency,
                ))

            return result

        except Exception as e:
            logger.error(f"Error fetching runs: {e}")
            return []

    async def get_traces(self, limit: int = 20) -> list[EvaluationTrace]:
        """Get recent traces."""
        try:
            runs = list(self.client.list_runs(
                project_name=self.project_name,
                is_root=True,
                limit=limit,
            ))

            result = []
            for run in runs:
                # Get input/output
                input_str = ""
                output_str = ""

                if run.inputs:
                    if isinstance(run.inputs, dict):
                        input_str = run.inputs.get("query", run.inputs.get("input", str(run.inputs)))
                    else:
                        input_str = str(run.inputs)

                if run.outputs:
                    if isinstance(run.outputs, dict):
                        output_str = run.outputs.get("answer", run.outputs.get("output", str(run.outputs)))
                    else:
                        output_str = str(run.outputs)

                # Get feedback scores
                scores = EvaluationScores()
                try:
                    feedbacks = list(self.client.list_feedback(run_ids=[run.id]))
                    for fb in feedbacks:
                        if fb.score is not None and isinstance(fb.score, (int, float)):
                            key = (fb.key or "").lower()
                            if "faithful" in key:
                                scores.faithfulness = fb.score
                            elif "relevan" in key:
                                scores.relevance = fb.score
                            elif "correct" in key:
                                scores.correctness = fb.score
                except Exception:
                    pass

                # Calculate latency
                latency = 0
                if run.end_time and run.start_time:
                    latency = (run.end_time - run.start_time).total_seconds() * 1000

                # Determine passed status
                passed = run.status == "success" and (
                    scores.faithfulness is None or scores.faithfulness >= 0.7
                )

                result.append(EvaluationTrace(
                    id=str(run.id),
                    input=input_str[:200] if input_str else "",
                    expectedOutput=None,
                    actualOutput=output_str[:500] if output_str else "",
                    scores=scores,
                    passed=passed,
                    latency=latency,
                ))

            return result

        except Exception as e:
            logger.error(f"Error fetching traces: {e}")
            return []


# =============================================================================
# API Endpoint
# =============================================================================


@router.get("/evaluation", response_model=EvaluationResponse)
async def get_evaluation(
    type: EvaluationType = Query(default=EvaluationType.SUMMARY),
    limit: int = Query(default=10, ge=1, le=50),
):
    """
    Get evaluation data from LangSmith.

    Args:
        type: Type of data to fetch (summary, runs, traces, all)
        limit: Maximum number of items to return

    Returns:
        EvaluationResponse with requested data
    """
    settings = get_settings()

    if not settings.langsmith_api_key:
        raise HTTPException(
            status_code=503,
            detail="LangSmith API key not configured",
        )

    try:
        client = LangSmithEvaluationClient()
        response = EvaluationResponse()

        if type == EvaluationType.SUMMARY:
            response.summary = await client.get_summary()

        elif type == EvaluationType.RUNS:
            response.runs = await client.get_runs(limit)

        elif type == EvaluationType.TRACES:
            response.traces = await client.get_traces(limit)

        elif type == EvaluationType.ALL:
            response.summary = await client.get_summary()
            response.runs = await client.get_runs(limit)
            response.traces = await client.get_traces(limit)

        return response

    except Exception as e:
        logger.error(f"Evaluation API error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch evaluation data: {str(e)}",
        )
