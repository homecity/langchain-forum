/**
 * RAG Performance Metrics
 * Tracks query latency, retrieval quality, and system performance
 * Last updated: 2026-01-14
 */

// ============================================================================
// Interfaces
// ============================================================================

export interface RAGMetrics {
  totalQueries: number
  avgLatency: number
  p50Latency: number
  p95Latency: number
  p99Latency: number
  avgRelevanceScore: number
  sourceDistribution: {
    forum: number
    docs: number
  }
  queryVolume: Array<{ date: string; count: number }>
  latencyOverTime: Array<{ date: string; p50: number; p95: number; p99: number }>
  relevanceOverTime: Array<{ date: string; score: number }>
  tokenUsage: Array<{ date: string; input: number; output: number }>
  trends: {
    totalQueries: number
    avgLatency: number
    avgRelevanceScore: number
  }
}

export interface LatencyMetrics {
  p50: number
  p95: number
  p99: number
}

export interface SourceDistribution {
  forum: number
  docs: number
}

// ============================================================================
// Mock Data
// ============================================================================

export const mockRAGMetrics: RAGMetrics = {
  totalQueries: 1247,
  avgLatency: 1850, // ms
  p50Latency: 1650,
  p95Latency: 2800,
  p99Latency: 3500,
  avgRelevanceScore: 0.87,
  sourceDistribution: {
    forum: 65,
    docs: 35
  },

  // Query volume over last 7 days
  queryVolume: [
    { date: '2026-01-07', count: 142 },
    { date: '2026-01-08', count: 168 },
    { date: '2026-01-09', count: 175 },
    { date: '2026-01-10', count: 156 },
    { date: '2026-01-11', count: 189 },
    { date: '2026-01-12', count: 201 },
    { date: '2026-01-13', count: 216 },
  ],

  // Latency percentiles over time
  latencyOverTime: [
    { date: '2026-01-07', p50: 1720, p95: 2950, p99: 3680 },
    { date: '2026-01-08', p50: 1680, p95: 2850, p99: 3550 },
    { date: '2026-01-09', p50: 1650, p95: 2800, p99: 3500 },
    { date: '2026-01-10', p50: 1620, p95: 2750, p99: 3420 },
    { date: '2026-01-11', p50: 1600, p95: 2700, p99: 3380 },
    { date: '2026-01-12', p50: 1590, p95: 2680, p99: 3350 },
    { date: '2026-01-13', p50: 1580, p95: 2650, p99: 3300 },
  ],

  // Retrieval quality (relevance score) over time
  relevanceOverTime: [
    { date: '2026-01-07', score: 0.83 },
    { date: '2026-01-08', score: 0.84 },
    { date: '2026-01-09', score: 0.85 },
    { date: '2026-01-10', score: 0.86 },
    { date: '2026-01-11', score: 0.87 },
    { date: '2026-01-12', score: 0.88 },
    { date: '2026-01-13', score: 0.89 },
  ],

  // Token usage tracking (input/output tokens per day)
  tokenUsage: [
    { date: '2026-01-07', input: 45200, output: 32100 },
    { date: '2026-01-08', input: 52800, output: 38400 },
    { date: '2026-01-09', input: 54600, output: 39900 },
    { date: '2026-01-10', input: 48900, output: 35200 },
    { date: '2026-01-11', input: 59200, output: 42800 },
    { date: '2026-01-12', input: 62800, output: 45600 },
    { date: '2026-01-13', input: 67500, output: 49100 },
  ],

  // Trends (vs previous period)
  trends: {
    totalQueries: 15, // +15% vs last week
    avgLatency: -8, // -8% improvement (lower is better)
    avgRelevanceScore: 5, // +5% improvement
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

export function formatLatency(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`
  }
  return `${(ms / 1000).toFixed(2)}s`
}

export function formatRelevanceScore(score: number): string {
  return `${(score * 100).toFixed(1)}%`
}

export function formatTokenCount(count: number): string {
  if (count < 1000) {
    return count.toString()
  }
  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return `${(count / 1000000).toFixed(2)}M`
}

// ============================================================================
// Export
// ============================================================================

export default mockRAGMetrics
