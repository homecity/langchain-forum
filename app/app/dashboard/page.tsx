"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/analytics/metric-card"
import { IssueVolumeChart } from "@/components/analytics/issue-volume-chart"
import { CategoryChart } from "@/components/analytics/category-chart"
import { TagResolutionChart } from "@/components/analytics/tag-resolution-chart"
import { LatencyChart } from "@/components/analytics/latency-chart"
import { RelevanceChart } from "@/components/analytics/relevance-chart"
import { TokenUsageChart } from "@/components/analytics/token-usage-chart"
import { SourceDistributionChart } from "@/components/analytics/source-distribution-chart"
import {
  mockMetrics,
  mockIssueVolume,
  mockCategoryData,
  mockTagResolution,
  mockRecentActivity,
} from "@/lib/real-forum-data"
import { mockRAGMetrics, formatLatency, formatRelevanceScore } from "@/lib/analytics/rag-metrics"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Clock, CheckCircle2, Zap, Target, Database, ChevronRight } from "lucide-react"
import { ActivityDetailModal, ExtendedActivityItem } from "@/components/dashboard/activity-detail-modal"

export default function DashboardPage() {
  // Activity modal state
  const [selectedActivity, setSelectedActivity] = React.useState<ExtendedActivityItem | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleActivityClick = (activity: ExtendedActivityItem) => {
    setSelectedActivity(activity)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-mono text-4xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="font-mono text-foreground/70">
            Real-time insights into LangChain forum support metrics
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-secondary/50 backdrop-blur-sm border border-border">
            <TabsTrigger value="overview" className="font-mono">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-mono">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="rag-performance" className="font-mono">
              RAG Performance
            </TabsTrigger>
            <TabsTrigger value="activity" className="font-mono">
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Total Issues"
                value={mockMetrics.total}
                trend={mockMetrics.trends.total}
                icon={<BarChart3 className="h-5 w-5" />}
              />
              <MetricCard
                title="Resolved"
                value={mockMetrics.resolved}
                trend={mockMetrics.trends.resolved}
                icon={<CheckCircle2 className="h-5 w-5" />}
              />
              <MetricCard
                title="Avg Response Time"
                value={mockMetrics.avgResponseTime}
                unit="days"
                trend={mockMetrics.trends.avgResponseTime}
                icon={<Clock className="h-5 w-5" />}
              />
              <MetricCard
                title="Active Issues"
                value={mockMetrics.active}
                trend={mockMetrics.trends.active}
                icon={<TrendingUp className="h-5 w-5" />}
              />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <IssueVolumeChart data={mockIssueVolume} />
              <CategoryChart data={mockCategoryData} />
            </div>

            {/* Charts Row 2 */}
            <TagResolutionChart data={mockTagResolution} />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Resolution Rate Card */}
              <Card className="border-langchain-purple/20">
                <CardHeader>
                  <CardTitle className="font-mono text-xl">
                    Overall Resolution Rate
                  </CardTitle>
                  <p className="font-mono text-sm text-muted-foreground">
                    Last 30 days performance
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-6xl font-bold text-langchain-purple">
                        {mockMetrics.resolutionRate}%
                      </span>
                      <Badge
                        variant="outline"
                        className="border-green-500 bg-green-50 text-green-700 dark:bg-green-950"
                      >
                        Excellent
                      </Badge>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-langchain-purple to-langchain-teal transition-all duration-1000"
                        style={{ width: `${mockMetrics.resolutionRate}%` }}
                      />
                    </div>
                    <p className="font-mono text-sm text-muted-foreground">
                      {mockMetrics.resolved} of {mockMetrics.total} issues resolved
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Deep Analytics Charts */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <IssueVolumeChart data={mockIssueVolume} />
                <TagResolutionChart data={mockTagResolution} />
              </div>
            </div>
          </TabsContent>

          {/* RAG Performance Tab */}
          <TabsContent value="rag-performance" className="space-y-6">
            {/* RAG Metric Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Total Queries"
                value={mockRAGMetrics.totalQueries.toLocaleString()}
                trend={mockRAGMetrics.trends.totalQueries}
                icon={<Database className="h-5 w-5" />}
              />
              <MetricCard
                title="Avg Latency (P50)"
                value={formatLatency(mockRAGMetrics.p50Latency)}
                trend={mockRAGMetrics.trends.avgLatency}
                icon={<Zap className="h-5 w-5" />}
              />
              <MetricCard
                title="Relevance Score"
                value={formatRelevanceScore(mockRAGMetrics.avgRelevanceScore)}
                trend={mockRAGMetrics.trends.avgRelevanceScore}
                icon={<Target className="h-5 w-5" />}
              />
              <MetricCard
                title="P99 Latency"
                value={formatLatency(mockRAGMetrics.p99Latency)}
                icon={<Clock className="h-5 w-5" />}
              />
            </div>

            {/* Performance Overview Card */}
            <Card className="border-langchain-purple/20">
              <CardHeader>
                <CardTitle className="font-mono text-xl">
                  Performance Summary
                </CardTitle>
                <p className="font-mono text-sm text-muted-foreground">
                  Last 7 days RAG system performance
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {/* Latency Breakdown */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-sm font-medium text-muted-foreground">
                      Latency Percentiles
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">P50 (Median)</span>
                        <span className="font-mono text-sm font-bold text-langchain-teal">
                          {formatLatency(mockRAGMetrics.p50Latency)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">P95</span>
                        <span className="font-mono text-sm font-bold text-langchain-purple">
                          {formatLatency(mockRAGMetrics.p95Latency)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">P99</span>
                        <span className="font-mono text-sm font-bold text-red-500">
                          {formatLatency(mockRAGMetrics.p99Latency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Source Distribution */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-sm font-medium text-muted-foreground">
                      Retrieval Sources
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">Forum Posts</span>
                        <span className="font-mono text-sm font-bold text-langchain-purple">
                          {mockRAGMetrics.sourceDistribution.forum}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">Documentation</span>
                        <span className="font-mono text-sm font-bold text-langchain-teal">
                          {mockRAGMetrics.sourceDistribution.docs}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <div className="flex h-full">
                        <div
                          className="h-full bg-langchain-purple"
                          style={{ width: `${mockRAGMetrics.sourceDistribution.forum}%` }}
                        />
                        <div
                          className="h-full bg-langchain-teal"
                          style={{ width: `${mockRAGMetrics.sourceDistribution.docs}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quality Metrics */}
                  <div className="space-y-3">
                    <h4 className="font-mono text-sm font-medium text-muted-foreground">
                      Quality Metrics
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">Avg Relevance</span>
                        <Badge
                          variant="outline"
                          className="border-green-500 bg-green-50 text-green-700 dark:bg-green-950"
                        >
                          {formatRelevanceScore(mockRAGMetrics.avgRelevanceScore)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">Total Queries</span>
                        <span className="font-mono text-sm font-bold">
                          {mockRAGMetrics.totalQueries.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts Row 1: Latency and Relevance */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <LatencyChart data={mockRAGMetrics.latencyOverTime} />
              <RelevanceChart data={mockRAGMetrics.relevanceOverTime} />
            </div>

            {/* Charts Row 2: Token Usage and Source Distribution */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <TokenUsageChart data={mockRAGMetrics.tokenUsage} />
              <SourceDistributionChart data={mockRAGMetrics.sourceDistribution} />
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-langchain-purple/20">
              <CardHeader>
                <CardTitle className="font-mono text-xl">Recent Activity</CardTitle>
                <p className="font-mono text-sm text-muted-foreground">
                  Latest forum updates and resolutions - Click to view details & RAG recommendations
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity, index) => (
                    <button
                      key={activity.id}
                      onClick={() => handleActivityClick(activity as ExtendedActivityItem)}
                      className="w-full text-left group flex items-start gap-4 rounded-lg border border-langchain-purple/10 bg-gradient-to-r from-white to-langchain-purple/5 p-4 transition-all hover:border-langchain-purple/30 hover:shadow-md dark:from-gray-900 dark:to-langchain-purple/10 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Icon */}
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          activity.type === "issue_opened"
                            ? "bg-langchain-purple/10 text-langchain-purple"
                            : activity.type === "issue_resolved"
                            ? "bg-langchain-teal/10 text-langchain-teal"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {activity.type === "issue_opened" && "🆕"}
                        {activity.type === "issue_resolved" && "✅"}
                        {activity.type === "comment_added" && "💬"}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-mono font-semibold text-foreground group-hover:text-langchain-purple truncate">
                          {activity.title}
                        </h4>
                        <p className="mt-1 font-mono text-sm text-muted-foreground">
                          {activity.user} • {activity.timestamp}
                        </p>
                      </div>

                      {/* Badge and Arrow */}
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            activity.type === "issue_resolved" ? "default" : "secondary"
                          }
                          className={
                            activity.type === "issue_resolved"
                              ? "bg-langchain-teal text-white"
                              : ""
                          }
                        >
                          {activity.type.replace("_", " ")}
                        </Badge>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-langchain-purple transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Activity Detail Modal */}
        <ActivityDetailModal
          activity={selectedActivity}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedActivity(null)
          }}
        />
      </div>
    </div>
  )
}
