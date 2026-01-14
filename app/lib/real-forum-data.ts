/**
 * Real Forum Data
 * Generated from 363 actual LangChain forum posts
 * Source: /data/forum-stats.json
 * Last updated: 2026-01-14
 */

import forumStats from '../data/forum-stats.json'

// ============================================================================
// Interfaces
// ============================================================================

export interface IssueMetrics {
  total: number
  resolved: number
  avgResponseTime: number
  active: number
  resolutionRate: number
  trends: {
    total: number
    resolved: number
    avgResponseTime: number
    active: number
  }
}

export interface IssueVolumeData {
  month: string
  issues: number
  resolved: number
}

export interface CategoryData {
  name: string
  value: number
  color: string
}

export interface TagResolutionData {
  tag: string
  resolutionRate: number
  total: number
}

export interface ForumPost {
  id: string
  title: string
  tags: string[]
  status: 'OPEN' | 'SOLVED' | 'IN_PROGRESS'
  createdAt: string
  preview: string
}

export interface ActivityItem {
  id: string
  type: 'issue_opened' | 'issue_resolved' | 'comment_added'
  title: string
  timestamp: string
  user: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: ChatSource[]
  trace?: ChatTrace
}

export interface ChatSource {
  id: string
  title: string
  url: string
  relevanceScore: number
  snippet: string
}

export interface ChatTrace {
  embeddingDuration: number
  retrievalDuration: number
  rerankingDuration?: number
  generationDuration: number
  totalDuration: number
}

// ============================================================================
// Color Mapping
// ============================================================================

const CATEGORY_COLORS: Record<string, string> = {
  'General': '#94a3b8',           // slate (neutral)
  'Python Help': '#BFB4FD',       // purple
  'Cloud': '#2D7A78',             // green
  'Js Help': '#A78BFA',           // light purple
  'Self Hosted': '#7C6ED7',       // medium purple
  'Langsmith Studio': '#D4A5F7',  // lighter purple
  'Intro To Langgraph': '#3D8B88', // darker green
  'Product Feedback': '#9F94DD',  // purple variant
  'Ambient Agents With ': '#8B7FD9', // purple shade
  'Intro To Langsmith': '#47A09D', // green variant
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// ============================================================================
// Data Transformation
// ============================================================================

function formatMonth(monthStr: string): string {
  // Convert "2025-07" to "Jul"
  const [_, month] = monthStr.split('-')
  return MONTH_NAMES[parseInt(month) - 1]
}

// Metrics
export const issueMetrics: IssueMetrics = {
  total: forumStats.metrics.total,
  resolved: forumStats.metrics.resolved,
  avgResponseTime: forumStats.metrics.avgResponseTime,
  active: forumStats.metrics.active,
  resolutionRate: forumStats.metrics.resolutionRate,
  trends: {
    total: forumStats.metrics.trends.total,
    resolved: forumStats.metrics.trends.resolved,
    avgResponseTime: 0, // Not available in forum stats
    active: forumStats.metrics.trends.active,
  },
}

// Issue Volume (with resolved estimates)
export const issueVolumeData: IssueVolumeData[] = forumStats.monthlyVolume.map((item) => {
  // Estimate resolved as ~43% of total (based on overall resolution rate)
  const resolved = Math.round(item.issues * 0.43)
  return {
    month: formatMonth(item.month),
    issues: item.issues,
    resolved,
  }
})

// Category Distribution (with colors)
export const categoryData: CategoryData[] = forumStats.categoryDistribution.map((item) => ({
  name: item.name,
  value: item.value,
  color: CATEGORY_COLORS[item.name] || '#64748b', // default slate
}))

// Tag Resolution Rates
export const tagResolutionData: TagResolutionData[] = forumStats.tagResolution.map((item) => ({
  tag: item.tag,
  resolutionRate: item.rate,
  total: item.total,
}))

// Recent Forum Posts
export const recentForumPosts: ForumPost[] = forumStats.recentActivity.map((item) => ({
  id: item.url.split('/').pop() || 'unknown',
  title: item.title,
  tags: [item.status === 'OPEN' ? 'open' : 'solved'], // Simplified tags
  status: item.status as 'OPEN' | 'SOLVED',
  createdAt: item.date,
  preview: item.title.substring(0, 100), // Use title as preview
}))

// Recent Activity
export const recentActivity: ActivityItem[] = forumStats.recentActivity.map((item, index) => ({
  id: (index + 1).toString(),
  type: item.status === 'SOLVED' ? 'issue_resolved' : 'issue_opened',
  title: item.title,
  timestamp: item.date,
  user: 'forum-user', // Generic user since we don't have this data
}))

// Chat Messages (welcome message only - actual chat will use API)
export const chatMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: `👋 Welcome to the LangChain Forum RAG Assistant!

I can help you with:
• **LangSmith issues** - Authentication, tracing, deployments
• **LangGraph questions** - Agent workflows, state management
• **Deployment problems** - Cloud, self-hosted, configuration
• **General LangChain** - Python/JS SDK, best practices

**Recent Statistics:**
• ${forumStats.metrics.total} total forum posts analyzed
• ${forumStats.metrics.resolutionRate}% resolution rate
• ${forumStats.metrics.active} currently active issues

Try asking: "What are the most common LangSmith authentication errors?"`,
    timestamp: new Date(),
  },
]

// ============================================================================
// Export all data
// ============================================================================

export const forumData = {
  metrics: issueMetrics,
  volume: issueVolumeData,
  categories: categoryData,
  tagResolution: tagResolutionData,
  recentPosts: recentForumPosts,
  generatedAt: forumStats.generatedAt,
}

// Legacy exports for backward compatibility
export const mockMetrics = issueMetrics
export const mockIssueVolume = issueVolumeData
export const mockCategoryData = categoryData
export const mockTagResolution = tagResolutionData
export const mockForumPosts = recentForumPosts
export const mockRecentActivity = recentActivity
export const mockChatMessages = chatMessages
