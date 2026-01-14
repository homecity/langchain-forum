// Mock data for dashboard and analytics

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

// Metrics
export const mockMetrics: IssueMetrics = {
  total: 364,
  resolved: 289,
  avgResponseTime: 1.2,
  active: 75,
  resolutionRate: 79,
  trends: {
    total: 23,
    resolved: 18,
    avgResponseTime: -0.3,
    active: 12,
  },
}

// Issue Volume Trend (Last 12 months)
export const mockIssueVolume: IssueVolumeData[] = [
  { month: 'Jan', issues: 45, resolved: 38 },
  { month: 'Feb', issues: 52, resolved: 44 },
  { month: 'Mar', issues: 48, resolved: 41 },
  { month: 'Apr', issues: 61, resolved: 53 },
  { month: 'May', issues: 55, resolved: 47 },
  { month: 'Jun', issues: 49, resolved: 43 },
  { month: 'Jul', issues: 38, resolved: 32 },
  { month: 'Aug', issues: 42, resolved: 36 },
  { month: 'Sep', issues: 47, resolved: 39 },
  { month: 'Oct', issues: 53, resolved: 45 },
  { month: 'Nov', issues: 58, resolved: 48 },
  { month: 'Dec', issues: 62, resolved: 51 },
]

// Category Distribution
export const mockCategoryData: CategoryData[] = [
  { name: 'LangSmith', value: 165, color: '#4d65ff' },
  { name: 'Deployment', value: 102, color: '#7e22ce' },
  { name: 'Self-Hosted', value: 67, color: '#14b8a6' },
  { name: 'Cloud', value: 30, color: '#0d9488' },
]

// Tag Resolution Rates
export const mockTagResolution: TagResolutionData[] = [
  { tag: 'langsmith', resolutionRate: 95, total: 89 },
  { tag: 'deployment', resolutionRate: 87, total: 67 },
  { tag: 'self-hosted', resolutionRate: 73, total: 45 },
  { tag: 'cloud', resolutionRate: 68, total: 34 },
  { tag: 'langgraph', resolutionRate: 91, total: 28 },
]

// Forum Posts
export const mockForumPosts: ForumPost[] = [
  {
    id: '2719',
    title: 'Cannot log in to Langsmith',
    tags: ['cloud', 'authentication'],
    status: 'OPEN',
    createdAt: '2026-01-13T10:30:00Z',
    preview: 'Users unable to authenticate in the EU region. Getting 429 Too Many Requests errors.',
  },
  {
    id: '2717',
    title: 'EU tracing runs dropped',
    tags: ['langsmith', 'tracing'],
    status: 'OPEN',
    createdAt: '2026-01-12T15:45:00Z',
    preview: 'Traces are being dropped in the EU portal. Missing critical debugging information.',
  },
  {
    id: '2705',
    title: 'Runtime Context Not Working',
    tags: ['deployment', 'context'],
    status: 'OPEN',
    createdAt: '2026-01-11T09:15:00Z',
    preview: 'Runtime context is not being passed correctly in production deployments.',
  },
  {
    id: '2689',
    title: 'Alert notifications not working',
    tags: ['langsmith', 'alerts'],
    status: 'SOLVED',
    createdAt: '2026-01-08T14:20:00Z',
    preview: 'Email alerts for failed runs are not being sent. Fixed by updating webhook config.',
  },
  {
    id: '2677',
    title: 'DeepAgent middleware integration',
    tags: ['langgraph', 'middleware'],
    status: 'SOLVED',
    createdAt: '2026-01-07T11:00:00Z',
    preview: 'How to integrate custom middleware with DeepAgent. Solution: Use beforeEach hook.',
  },
  {
    id: '2665',
    title: 'Streaming responses timeout',
    tags: ['deployment', 'streaming'],
    status: 'IN_PROGRESS',
    createdAt: '2026-01-05T16:30:00Z',
    preview: 'Streaming responses timeout after 30 seconds in serverless environments.',
  },
]

// Recent Activity
export interface ActivityItem {
  id: string
  type: 'issue_opened' | 'issue_resolved' | 'comment_added'
  title: string
  timestamp: string
  user: string
}

export const mockRecentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'issue_opened',
    title: 'Cannot log in to Langsmith',
    timestamp: '2 hours ago',
    user: 'john.doe@company.com',
  },
  {
    id: '2',
    type: 'issue_resolved',
    title: 'Alert notifications not working',
    timestamp: '5 hours ago',
    user: 'jane.smith@company.com',
  },
  {
    id: '3',
    type: 'comment_added',
    title: 'EU tracing runs dropped',
    timestamp: '1 day ago',
    user: 'support@langchain.com',
  },
  {
    id: '4',
    type: 'issue_opened',
    title: 'Runtime Context Not Working',
    timestamp: '2 days ago',
    user: 'dev.team@company.com',
  },
]

// Chat Messages
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
  tags?: string[]
}

export interface ChatTrace {
  embeddingDuration: number
  retrievalDuration: number
  rerankingDuration?: number
  generationDuration: number
  totalDuration: number
}

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hi! I can help you analyze LangChain forum issues. Try asking:\n\n• "What are the most common LangSmith authentication errors?"\n• "Show me deployment issues from December"\n• "How do I fix EU login failures?"',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    role: 'user',
    content: 'What are the most common authentication issues?',
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: '3',
    role: 'assistant',
    content: 'Based on the forum data, the top authentication issues are:\n\n**1. EU login failures (429 Too Many Requests)**\n- 12 occurrences in January 2026\n- Affects EU portal users\n- Example: Issue #2719, #2703\n\n**2. OAuth token expiration**\n- 8 occurrences\n- Users need to refresh tokens manually\n- Workaround: Implement token refresh logic\n\n**3. API key rotation issues**\n- 5 occurrences\n- Keys not updating in environment variables',
    timestamp: new Date(Date.now() - 1795000),
    sources: [
      {
        id: '2719',
        title: 'Cannot log in to Langsmith',
        url: '/forum/2026/01/13/2719_cannot-log-in',
        relevanceScore: 0.95,
        snippet: 'Users unable to authenticate in the EU region. Getting 429 Too Many Requests errors.',
        tags: ['cloud', 'authentication', 'eu-region'],
      },
      {
        id: '2703',
        title: 'EU authentication errors',
        url: '/forum/2026/01/12/2703_eu-auth-errors',
        relevanceScore: 0.92,
        snippet: 'EU portal login failing with rate limit errors. Temporary workaround: use US portal.',
        tags: ['authentication', 'rate-limit', 'eu-region'],
      },
      {
        id: 'docs-auth',
        title: 'LangChain Authentication Guide',
        url: 'https://python.langchain.com/docs/authentication',
        relevanceScore: 0.88,
        snippet: 'Official authentication documentation covering OAuth, API keys, and token management.',
        tags: ['documentation', 'oauth', 'api-keys'],
      },
    ],
    trace: {
      embeddingDuration: 0.3,
      retrievalDuration: 0.5,
      rerankingDuration: 0.2,
      generationDuration: 0.4,
      totalDuration: 1.4,
    },
  },
]
