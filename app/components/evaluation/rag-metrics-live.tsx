"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockRAGMetrics, formatLatency } from "@/lib/analytics/rag-metrics"
import { Zap, Target, Database, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react"

export function RAGMetricsLive() {
  // In production, this would fetch real metrics from an API
  // For now, using mock data with simulated real-time updates
  const [metrics, setMetrics] = React.useState(mockRAGMetrics)
  const [lastUpdated, setLastUpdated] = React.useState(new Date())

  // Simulate periodic updates (in production, use WebSocket or polling)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
      // Simulate slight metric variations
      setMetrics((prev) => ({
        ...prev,
        totalQueries: prev.totalQueries + Math.floor(Math.random() * 3),
        avgLatency: prev.avgLatency + (Math.random() - 0.5) * 50,
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Last Updated */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm text-muted-foreground">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
        <Badge variant="outline" className="font-mono">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Live
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Queries"
          value={metrics.totalQueries.toLocaleString()}
          trend={metrics.trends.totalQueries}
          icon={<Database className="h-5 w-5" />}
        />
        <MetricCard
          title="Avg Latency"
          value={formatLatency(metrics.avgLatency)}
          trend={metrics.trends.avgLatency}
          trendInverse
          icon={<Zap className="h-5 w-5" />}
        />
        <MetricCard
          title="P50 Latency"
          value={formatLatency(metrics.p50Latency)}
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          title="Avg Relevance"
          value={`${(metrics.avgRelevanceScore * 100).toFixed(1)}%`}
          trend={metrics.trends.avgRelevanceScore}
          icon={<Target className="h-5 w-5" />}
        />
      </div>

      {/* Detailed Performance */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Latency Breakdown */}
        <Card className="border-purple-500/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg">Latency Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <LatencyBar label="P50 (Median)" value={metrics.p50Latency} max={metrics.p99Latency} color="green" />
            <LatencyBar label="P95" value={metrics.p95Latency} max={metrics.p99Latency} color="yellow" />
            <LatencyBar label="P99" value={metrics.p99Latency} max={metrics.p99Latency} color="red" />

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Min</p>
                  <p className="font-mono text-lg font-bold text-green-500">0.8s</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Mean</p>
                  <p className="font-mono text-lg font-bold text-yellow-500">
                    {formatLatency(metrics.avgLatency)}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground">Max</p>
                  <p className="font-mono text-lg font-bold text-red-500">
                    {formatLatency(metrics.p99Latency * 1.2)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Source Distribution */}
        <Card className="border-purple-500/20">
          <CardHeader>
            <CardTitle className="font-mono text-lg">Source Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">Forum Posts</span>
              <span className="font-mono text-sm font-bold text-purple-500">
                {metrics.sourceDistribution.forum}%
              </span>
            </div>
            <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                style={{ width: `${metrics.sourceDistribution.forum}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">Documentation</span>
              <span className="font-mono text-sm font-bold text-teal-500">
                {metrics.sourceDistribution.docs}%
              </span>
            </div>
            <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-teal-400"
                style={{ width: `${metrics.sourceDistribution.docs}%` }}
              />
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="font-mono text-muted-foreground">Total Documents</span>
                <span className="font-mono font-bold">363</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="font-mono text-muted-foreground">Embedding Dimension</span>
                <span className="font-mono font-bold">1536</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token Usage */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="font-mono text-lg">Token Usage (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TokenStat
              label="Total Input"
              value={metrics.tokenUsage.reduce((sum, d) => sum + d.input, 0)}
            />
            <TokenStat
              label="Total Output"
              value={metrics.tokenUsage.reduce((sum, d) => sum + d.output, 0)}
            />
            <TokenStat
              label="Avg Input/Query"
              value={Math.round(
                metrics.tokenUsage.reduce((sum, d) => sum + d.input, 0) /
                  metrics.queryVolume.reduce((sum, d) => sum + d.count, 0)
              )}
            />
            <TokenStat
              label="Avg Output/Query"
              value={Math.round(
                metrics.tokenUsage.reduce((sum, d) => sum + d.output, 0) /
                  metrics.queryVolume.reduce((sum, d) => sum + d.count, 0)
              )}
            />
          </div>

          {/* Daily breakdown */}
          <div className="mt-6 space-y-2">
            <p className="font-mono text-xs text-muted-foreground">Daily Breakdown</p>
            <div className="grid grid-cols-7 gap-2">
              {metrics.tokenUsage.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="h-16 flex items-end justify-center gap-0.5">
                    <div
                      className="w-3 bg-purple-500 rounded-t"
                      style={{
                        height: `${(day.input / 70000) * 100}%`,
                      }}
                    />
                    <div
                      className="w-3 bg-teal-500 rounded-t"
                      style={{
                        height: `${(day.output / 70000) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mt-1">
                    {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-500 rounded" />
                <span className="font-mono text-xs text-muted-foreground">Input</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-teal-500 rounded" />
                <span className="font-mono text-xs text-muted-foreground">Output</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// Sub-components
// ============================================================================

function MetricCard({
  title,
  value,
  trend,
  trendInverse = false,
  icon,
}: {
  title: string
  value: string
  trend?: number
  trendInverse?: boolean
  icon: React.ReactNode
}) {
  const getTrendIcon = () => {
    if (trend === undefined) return null
    if (trend > 0) return <TrendingUp className="h-3 w-3" />
    if (trend < 0) return <TrendingDown className="h-3 w-3" />
    return <Minus className="h-3 w-3" />
  }

  const getTrendColor = () => {
    if (trend === undefined) return ''
    const isPositive = trendInverse ? trend < 0 : trend > 0
    if (isPositive) return 'text-green-500'
    if (trend === 0) return 'text-gray-500'
    return 'text-red-500'
  }

  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground">{title}</p>
            <p className="font-mono text-2xl font-bold text-foreground">{value}</p>
            {trend !== undefined && (
              <div className={`flex items-center gap-1 mt-1 ${getTrendColor()}`}>
                {getTrendIcon()}
                <span className="font-mono text-xs">
                  {trend > 0 ? '+' : ''}{trend}% vs prev
                </span>
              </div>
            )}
          </div>
          <div className="text-muted-foreground opacity-50">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function LatencyBar({
  label,
  value,
  max,
  color,
}: {
  label: string
  value: number
  max: number
  color: 'green' | 'yellow' | 'red'
}) {
  const colorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm">{label}</span>
        <span className="font-mono text-sm font-bold">{formatLatency(value)}</span>
      </div>
      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClasses[color]}`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  )
}

function TokenStat({ label, value }: { label: string; value: number }) {
  const formatTokens = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n.toString()
  }

  return (
    <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <p className="font-mono text-xs text-muted-foreground">{label}</p>
      <p className="font-mono text-xl font-bold text-foreground">{formatTokens(value)}</p>
    </div>
  )
}
