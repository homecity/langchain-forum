/**
 * LangSmith Evaluation Data
 * Mock data representing LangSmith evaluation runs
 * In production, this would connect to LangSmith API
 */

import { EvaluationRun, EvaluationExample } from './types'

// ============================================================================
// Evaluation Runs (Simulated LangSmith Data)
// ============================================================================

export const evaluationRuns: EvaluationRun[] = [
  {
    id: 'eval-001',
    name: 'RAG Faithfulness Test',
    datasetName: 'langchain-forum-qa',
    createdAt: '2026-01-15T08:00:00Z',
    status: 'completed',
    metrics: {
      faithfulness: 0.87,
      relevance: 0.82,
      correctness: 0.79,
      helpfulness: 0.85,
    },
    totalExamples: 25,
    passedExamples: 21,
    avgLatency: 1850,
  },
  {
    id: 'eval-002',
    name: 'LangSmith Query Accuracy',
    datasetName: 'langsmith-specific-qa',
    createdAt: '2026-01-14T16:30:00Z',
    status: 'completed',
    metrics: {
      faithfulness: 0.91,
      relevance: 0.88,
      correctness: 0.85,
      helpfulness: 0.89,
    },
    totalExamples: 15,
    passedExamples: 14,
    avgLatency: 1620,
  },
  {
    id: 'eval-003',
    name: 'Edge Case Handling',
    datasetName: 'edge-cases',
    createdAt: '2026-01-14T10:00:00Z',
    status: 'completed',
    metrics: {
      faithfulness: 0.72,
      relevance: 0.65,
      correctness: 0.68,
      helpfulness: 0.70,
    },
    totalExamples: 10,
    passedExamples: 7,
    avgLatency: 2100,
  },
  {
    id: 'eval-004',
    name: 'Streaming Response Test',
    datasetName: 'streaming-test',
    createdAt: '2026-01-13T14:00:00Z',
    status: 'completed',
    metrics: {
      faithfulness: 0.84,
      relevance: 0.80,
      correctness: 0.82,
      helpfulness: 0.86,
    },
    totalExamples: 20,
    passedExamples: 17,
    avgLatency: 1750,
  },
]

// ============================================================================
// Example Details (for drill-down view)
// ============================================================================

export const evaluationExamples: Record<string, EvaluationExample[]> = {
  'eval-001': [
    {
      id: 'ex-001',
      input: 'What are common LangSmith authentication errors?',
      expectedOutput: 'Common errors include 403 Forbidden, expired OTPs, and API key issues.',
      actualOutput: 'Common LangSmith authentication issues include: 1. 403 Forbidden Errors - often due to incorrect API keys or workspace IDs...',
      scores: { faithfulness: 0.92, relevance: 0.88, correctness: 0.85 },
      passed: true,
      latency: 1650,
    },
    {
      id: 'ex-002',
      input: 'How to fix LangGraph deployment failures?',
      expectedOutput: 'Check Docker configuration, environment variables, and resource limits.',
      actualOutput: 'LangGraph deployment failures can be caused by several factors: 1. Docker configuration issues...',
      scores: { faithfulness: 0.88, relevance: 0.85, correctness: 0.82 },
      passed: true,
      latency: 1820,
    },
    {
      id: 'ex-003',
      input: 'How to install LangChain?',
      expectedOutput: 'pip install langchain or npm install langchain',
      actualOutput: 'The forum data does not cover specific installation instructions...',
      scores: { faithfulness: 0.95, relevance: 0.45, correctness: 0.50 },
      passed: false,
      latency: 1200,
    },
  ],
  'eval-002': [
    {
      id: 'ex-004',
      input: 'Why is LangSmith tracing not working?',
      expectedOutput: 'Check LANGCHAIN_TRACING_V2 and LANGSMITH_API_KEY environment variables.',
      actualOutput: 'LangSmith tracing issues are commonly caused by: 1. Missing or incorrect environment variables...',
      scores: { faithfulness: 0.94, relevance: 0.92, correctness: 0.90 },
      passed: true,
      latency: 1580,
    },
  ],
}

// ============================================================================
// Summary Statistics
// ============================================================================

export function getEvaluationSummary() {
  const totalRuns = evaluationRuns.length
  const avgFaithfulness = evaluationRuns.reduce((sum, r) => sum + r.metrics.faithfulness, 0) / totalRuns
  const avgRelevance = evaluationRuns.reduce((sum, r) => sum + r.metrics.relevance, 0) / totalRuns
  const avgCorrectness = evaluationRuns.reduce((sum, r) => sum + r.metrics.correctness, 0) / totalRuns
  const totalExamples = evaluationRuns.reduce((sum, r) => sum + r.totalExamples, 0)
  const passedExamples = evaluationRuns.reduce((sum, r) => sum + r.passedExamples, 0)
  const avgLatency = evaluationRuns.reduce((sum, r) => sum + r.avgLatency, 0) / totalRuns

  return {
    totalRuns,
    avgFaithfulness,
    avgRelevance,
    avgCorrectness,
    passRate: passedExamples / totalExamples,
    totalExamples,
    passedExamples,
    avgLatency,
  }
}

// ============================================================================
// LangSmith Integration Helpers
// ============================================================================

export function formatMetricScore(score: number): string {
  return `${(score * 100).toFixed(1)}%`
}

export function getMetricColor(score: number): string {
  if (score >= 0.85) return 'text-green-500'
  if (score >= 0.70) return 'text-yellow-500'
  return 'text-red-500'
}

export function getMetricBadgeClass(score: number): string {
  if (score >= 0.85) return 'bg-green-500/10 text-green-500 border-green-500/30'
  if (score >= 0.70) return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
  return 'bg-red-500/10 text-red-500 border-red-500/30'
}
