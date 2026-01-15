/**
 * Evaluation Types
 * Types for LangSmith Evaluation, Friction Log, and RAG Metrics
 */

// ============================================================================
// LangSmith Evaluation Types
// ============================================================================

export interface EvaluationRun {
  id: string
  name: string
  datasetName: string
  createdAt: string
  status: 'completed' | 'running' | 'failed'
  metrics: {
    faithfulness: number
    relevance: number
    correctness: number
    helpfulness: number
  }
  totalExamples: number
  passedExamples: number
  avgLatency: number // ms
}

export interface EvaluationExample {
  id: string
  input: string
  expectedOutput: string
  actualOutput: string
  scores: {
    faithfulness: number
    relevance: number
    correctness: number
  }
  passed: boolean
  latency: number
}

// ============================================================================
// Friction Log Types
// ============================================================================

export type FrictionSeverity = 'low' | 'medium' | 'high' | 'critical'
export type FrictionCategory =
  | 'ux'
  | 'documentation'
  | 'api'
  | 'performance'
  | 'error-handling'
  | 'other'

export type FrictionStatus = 'open' | 'acknowledged' | 'fixed' | 'wont-fix'

export type ImpactLevel = 'minimal' | 'moderate' | 'significant' | 'blocking'

export interface FrictionLogEntry {
  id: string
  title: string
  description: string
  category: FrictionCategory
  severity: FrictionSeverity
  status: FrictionStatus
  component: string // e.g., "Chat", "Dashboard", "RAG Pipeline"
  stepsToReproduce?: string
  expectedBehavior?: string
  actualBehavior?: string
  // New fields for interview demo
  traceUrl?: string // LangSmith trace URL
  runId?: string // LangSmith run ID
  impactLevel?: ImpactLevel // Developer experience impact
  impactDescription?: string // e.g., "Blocked for 20 min"
  suggestedFix?: string // Proposed solution
  relatedDocs?: string // Link to relevant documentation
  createdAt: string
  updatedAt: string
}

// ============================================================================
// RAG Performance Types (Real-time)
// ============================================================================

export interface RAGQueryLog {
  id: string
  query: string
  timestamp: string
  latency: {
    embedding: number
    retrieval: number
    generation: number
    total: number
  }
  relevanceScores: number[]
  topK: number
  success: boolean
  errorMessage?: string
}

export interface RAGPerformanceSummary {
  totalQueries: number
  avgLatency: number
  p50Latency: number
  p95Latency: number
  p99Latency: number
  avgRelevance: number
  successRate: number
  queriesLast24h: number
}
