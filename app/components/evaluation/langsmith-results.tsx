"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  evaluationRuns as mockRuns,
  evaluationExamples as mockExamples,
  getEvaluationSummary as getMockSummary,
  formatMetricScore,
  getMetricColor,
  getMetricBadgeClass,
} from "@/lib/evaluation/langsmith-data"
import { EvaluationRun, EvaluationExample } from "@/lib/evaluation/types"
import {
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  RefreshCw,
  AlertCircle,
} from "lucide-react"

// ============================================================================
// Types for API Response
// ============================================================================

interface LangSmithSummary {
  totalRuns: number
  avgFaithfulness: number
  avgRelevance: number
  avgCorrectness: number
  passRate: number
  totalExamples: number
  passedExamples: number
  avgLatency: number
}

interface LangSmithRun {
  id: string
  name: string
  projectName: string
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
  avgLatency: number
}

interface LangSmithTrace {
  id: string
  input: string
  expectedOutput?: string
  actualOutput: string
  scores: {
    faithfulness?: number
    relevance?: number
    correctness?: number
  }
  passed: boolean
  latency: number
}

// ============================================================================
// Main Component
// ============================================================================

export function LangSmithResults() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [useMockData, setUseMockData] = React.useState(false)
  const [expandedRun, setExpandedRun] = React.useState<string | null>(null)

  // Real data state
  const [summary, setSummary] = React.useState<LangSmithSummary | null>(null)
  const [runs, setRuns] = React.useState<LangSmithRun[]>([])
  const [traces, setTraces] = React.useState<LangSmithTrace[]>([])

  // Fetch data from API
  const fetchData = React.useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/evaluation?type=all&limit=20')

      if (!response.ok) {
        throw new Error('Failed to fetch evaluation data')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Check if we got meaningful data
      if (data.summary && data.summary.totalRuns > 0) {
        setSummary(data.summary)
        setRuns(data.runs || [])
        setTraces(data.traces || [])
        setUseMockData(false)
      } else {
        // No data from LangSmith, use mock
        setUseMockData(true)
      }
    } catch (err) {
      console.error('Error fetching LangSmith data:', err)
      setError((err as Error).message)
      setUseMockData(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  // Get display data (real or mock)
  const displaySummary = useMockData ? getMockSummary() : summary
  const displayRuns = useMockData
    ? mockRuns
    : runs.map((r): EvaluationRun => ({
        id: r.id,
        name: r.name,
        datasetName: r.projectName,
        createdAt: r.createdAt,
        status: r.status,
        metrics: r.metrics,
        totalExamples: r.totalExamples,
        passedExamples: r.passedExamples,
        avgLatency: r.avgLatency,
      }))

  // Get examples for a run
  const getExamplesForRun = (runId: string): EvaluationExample[] => {
    if (useMockData) {
      return mockExamples[runId] || []
    }
    // For real data, use traces as examples
    return traces.slice(0, 5).map((t): EvaluationExample => ({
      id: t.id,
      input: t.input,
      expectedOutput: t.expectedOutput || '',
      actualOutput: t.actualOutput,
      scores: {
        faithfulness: t.scores.faithfulness || 0,
        relevance: t.scores.relevance || 0,
        correctness: t.scores.correctness || 0,
      },
      passed: t.passed,
      latency: t.latency,
    }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 font-mono text-sm text-muted-foreground">
          Loading LangSmith data...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Data Source Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {useMockData ? (
            <Badge variant="outline" className="font-mono text-yellow-500 border-yellow-500">
              <AlertCircle className="h-3 w-3 mr-1" />
              Mock Data
            </Badge>
          ) : (
            <Badge variant="outline" className="font-mono text-green-500 border-green-500">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
          )}
          {error && (
            <span className="font-mono text-xs text-muted-foreground">
              ({error})
            </span>
          )}
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      {displaySummary && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Runs"
            value={displaySummary.totalRuns.toString()}
            icon={<TrendingUp className="h-5 w-5" />}
            color="purple"
          />
          <SummaryCard
            title="Avg Faithfulness"
            value={formatMetricScore(displaySummary.avgFaithfulness)}
            icon={<CheckCircle2 className="h-5 w-5" />}
            color="green"
          />
          <SummaryCard
            title="Pass Rate"
            value={formatMetricScore(displaySummary.passRate)}
            subtext={`${displaySummary.passedExamples}/${displaySummary.totalExamples} examples`}
            icon={<CheckCircle2 className="h-5 w-5" />}
            color="teal"
          />
          <SummaryCard
            title="Avg Latency"
            value={`${(displaySummary.avgLatency / 1000).toFixed(2)}s`}
            icon={<Clock className="h-5 w-5" />}
            color="blue"
          />
        </div>
      )}

      {/* Evaluation Runs List */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-mono text-xl">Evaluation Runs</CardTitle>
              <p className="font-mono text-sm text-muted-foreground mt-1">
                {useMockData ? 'Sample evaluation results' : 'LangSmith experiment results'}
              </p>
            </div>
            <a
              href="https://smith.langchain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-purple-500 hover:text-purple-400 transition-colors"
            >
              Open LangSmith <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </CardHeader>
        <CardContent>
          {displayRuns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground font-mono">
              No evaluation runs found. Run some queries in the Chat tab to generate traces.
            </div>
          ) : (
            <div className="space-y-3">
              {displayRuns.map((run) => (
                <EvaluationRunCard
                  key={run.id}
                  run={run}
                  isExpanded={expandedRun === run.id}
                  onToggle={() => setExpandedRun(expandedRun === run.id ? null : run.id)}
                  examples={getExamplesForRun(run.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// Sub-components
// ============================================================================

function SummaryCard({
  title,
  value,
  subtext,
  icon,
  color,
}: {
  title: string
  value: string
  subtext?: string
  icon: React.ReactNode
  color: 'purple' | 'green' | 'teal' | 'blue'
}) {
  const colorClasses = {
    purple: 'text-purple-500',
    green: 'text-green-500',
    teal: 'text-teal-500',
    blue: 'text-blue-500',
  }

  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground">{title}</p>
            <p className={`font-mono text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
            {subtext && (
              <p className="font-mono text-xs text-muted-foreground mt-1">{subtext}</p>
            )}
          </div>
          <div className={`${colorClasses[color]} opacity-50`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function EvaluationRunCard({
  run,
  isExpanded,
  onToggle,
  examples,
}: {
  run: EvaluationRun
  isExpanded: boolean
  onToggle: () => void
  examples: EvaluationExample[]
}) {
  const passRate = run.totalExamples > 0 ? run.passedExamples / run.totalExamples : 0

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="text-left">
            <h3 className="font-mono font-semibold text-foreground">{run.name}</h3>
            <p className="font-mono text-xs text-muted-foreground">
              {run.datasetName} • {new Date(run.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Metrics Pills */}
          <div className="hidden md:flex items-center gap-2">
            <MetricPill label="Faith" score={run.metrics.faithfulness} />
            <MetricPill label="Rel" score={run.metrics.relevance} />
            <MetricPill label="Corr" score={run.metrics.correctness} />
          </div>

          {/* Pass Rate */}
          <Badge
            variant="outline"
            className={`font-mono ${passRate >= 0.8 ? 'border-green-500 text-green-500' : passRate >= 0.6 ? 'border-yellow-500 text-yellow-500' : 'border-red-500 text-red-500'}`}
          >
            {run.passedExamples}/{run.totalExamples} passed
          </Badge>

          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/30">
          {/* Detailed Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <MetricDetail label="Faithfulness" score={run.metrics.faithfulness} />
            <MetricDetail label="Relevance" score={run.metrics.relevance} />
            <MetricDetail label="Correctness" score={run.metrics.correctness} />
            <MetricDetail label="Helpfulness" score={run.metrics.helpfulness} />
          </div>

          {/* Examples */}
          {examples.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-mono text-sm font-semibold text-muted-foreground">
                Example Results
              </h4>
              {examples.map((example) => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function MetricPill({ label, score }: { label: string; score: number }) {
  return (
    <span className={`px-2 py-1 rounded text-xs font-mono ${getMetricBadgeClass(score)}`}>
      {label}: {formatMetricScore(score)}
    </span>
  )
}

function MetricDetail({ label, score }: { label: string; score: number }) {
  return (
    <div className="text-center">
      <p className="font-mono text-xs text-muted-foreground">{label}</p>
      <p className={`font-mono text-lg font-bold ${getMetricColor(score)}`}>
        {formatMetricScore(score)}
      </p>
    </div>
  )
}

function ExampleCard({ example }: { example: EvaluationExample }) {
  return (
    <div
      className={`rounded-lg border p-3 ${example.passed ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {example.passed ? (
              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
            )}
            <p className="font-mono text-sm font-medium truncate">{example.input}</p>
          </div>
          <p className="font-mono text-xs text-muted-foreground line-clamp-2">
            {example.actualOutput}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono text-xs text-muted-foreground">{example.latency}ms</span>
        </div>
      </div>
    </div>
  )
}
