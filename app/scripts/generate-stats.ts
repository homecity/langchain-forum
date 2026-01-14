/**
 * Forum Statistics Generation Script
 *
 * Processes forum markdown files to generate comprehensive statistics:
 * - Issue metrics (total, resolved, active, resolution rate)
 * - Category distribution by tags
 * - Monthly volume trends
 * - Tag-specific resolution rates
 * - Recent activity feed
 *
 * Output: data/forum-stats.json
 * Usage: ts-node scripts/generate-stats.ts
 */

import * as fs from 'fs'
import * as path from 'path'

// ============================================================================
// Configuration
// ============================================================================

const FORUM_DIR = '/Users/jihyunjeong/Documents/Github/langchain/forum'
const OUTPUT_FILE = path.join(process.cwd(), 'data', 'forum-stats.json')

// ============================================================================
// Types
// ============================================================================

interface ForumPost {
  topicId: string
  title: string
  createdAt: string
  url: string
  tags: string[]
  status: 'SOLVED' | 'OPEN'
  lastActivity: string
  responseCount: number
}

interface IssueMetrics {
  total: number
  resolved: number
  active: number
  resolutionRate: number
  avgResponseTime: number
  trends: {
    total: number
    resolved: number
    active: number
    resolutionRate: number
  }
}

interface CategoryData {
  name: string
  value: number
  percentage: number
}

interface MonthlyData {
  month: string
  issues: number
}

interface TagResolution {
  tag: string
  total: number
  resolved: number
  rate: number
}

interface RecentActivity {
  title: string
  status: 'SOLVED' | 'OPEN'
  date: string
  url: string
}

interface ForumStats {
  metrics: IssueMetrics
  categoryDistribution: CategoryData[]
  monthlyVolume: MonthlyData[]
  tagResolution: TagResolution[]
  recentActivity: RecentActivity[]
  generatedAt: string
}

// ============================================================================
// Main Function
// ============================================================================

async function main() {
  console.log('📊 Starting forum statistics generation...\n')

  // Step 1: Find and parse all markdown files
  console.log(`📂 Scanning ${FORUM_DIR}...`)
  const markdownFiles = findMarkdownFiles(FORUM_DIR)
  console.log(`✅ Found ${markdownFiles.length} forum posts`)

  // Step 2: Parse posts
  console.log('\n📖 Parsing forum posts...')
  const posts = markdownFiles.map((filePath) => parseForumPost(filePath))
  console.log(`✅ Parsed ${posts.length} posts`)

  // Step 3: Generate statistics
  console.log('\n📈 Generating statistics...')

  const stats: ForumStats = {
    metrics: calculateMetrics(posts),
    categoryDistribution: calculateCategoryDistribution(posts),
    monthlyVolume: calculateMonthlyVolume(posts),
    tagResolution: calculateTagResolution(posts),
    recentActivity: getRecentActivity(posts),
    generatedAt: new Date().toISOString(),
  }

  // Step 4: Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
    console.log(`✅ Created directory: ${outputDir}`)
  }

  // Step 5: Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(stats, null, 2))
  console.log(`\n💾 Statistics saved to ${OUTPUT_FILE}`)

  // Step 6: Display summary
  console.log('\n📊 Statistics Summary:')
  console.log(`   Total Issues: ${stats.metrics.total}`)
  console.log(`   Resolved: ${stats.metrics.resolved}`)
  console.log(`   Active: ${stats.metrics.active}`)
  console.log(`   Resolution Rate: ${stats.metrics.resolutionRate}%`)
  console.log(`   Top Category: ${stats.categoryDistribution[0]?.name} (${stats.categoryDistribution[0]?.value} posts)`)
  console.log(`   Most Recent: ${stats.recentActivity[0]?.title}`)

  console.log('\n✅ Statistics generation complete!')
}

// ============================================================================
// Parsing Functions
// ============================================================================

function findMarkdownFiles(dir: string): string[] {
  const files: string[] = []

  function traverse(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)

      if (entry.isDirectory()) {
        traverse(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md') {
        files.push(fullPath)
      }
    }
  }

  traverse(dir)
  return files
}

function parseForumPost(filePath: string): ForumPost {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  // Extract metadata
  const title = lines[0].replace(/^#\s*/, '').trim()
  const topicIdMatch = content.match(/\*\*Topic ID:\*\*\s*(\d+)/)
  const createdMatch = content.match(/\*\*Created:\*\*\s*([\d-]+\s[\d:]+)/)
  const urlMatch = content.match(/\*\*URL:\*\*\s*(https?:\/\/[^\s]+)/)
  const tagsMatch = content.match(/\*\*Tags:\*\*\s*(.+)/)

  const topicId = topicIdMatch ? topicIdMatch[1] : 'unknown'
  const createdAt = createdMatch ? createdMatch[1] : new Date().toISOString()
  const url = urlMatch ? urlMatch[1] : ''
  const tags = tagsMatch
    ? tagsMatch[1]
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    : ['general']

  // Determine status based on content
  const status = inferStatus(content)

  // Count responses (number of "## Post #" occurrences)
  const responseCount = (content.match(/## Post #\d+/g) || []).length

  // Find last activity date
  const postDates = content.match(/\*Posted on ([\d-]+\s[\d:]+)\*/g) || []
  const lastActivity =
    postDates.length > 0
      ? postDates[postDates.length - 1].match(/[\d-]+\s[\d:]+/)?.[0] || createdAt
      : createdAt

  return {
    topicId,
    title,
    createdAt,
    url,
    tags,
    status,
    lastActivity,
    responseCount,
  }
}

function inferStatus(content: string): 'SOLVED' | 'OPEN' {
  const lowerContent = content.toLowerCase()

  // Check for solved indicators
  const solvedIndicators = [
    'solved',
    'thank you',
    'thanks!',
    'worked',
    'fixed',
    'resolved',
    'got it working',
    'issue is resolved',
    'this worked',
  ]

  // Check for open indicators (questions without answers)
  const hasQuestion = lowerContent.includes('?') || lowerContent.includes('how to')
  const hasMultiplePosts = (content.match(/## Post #\d+/g) || []).length > 2

  // If multiple posts and contains solved indicators, mark as SOLVED
  for (const indicator of solvedIndicators) {
    if (lowerContent.includes(indicator) && hasMultiplePosts) {
      return 'SOLVED'
    }
  }

  // If only one post and has question, likely OPEN
  if (hasQuestion && !hasMultiplePosts) {
    return 'OPEN'
  }

  // Default: if multiple responses, assume SOLVED; otherwise OPEN
  return hasMultiplePosts ? 'SOLVED' : 'OPEN'
}

// ============================================================================
// Statistics Calculation Functions
// ============================================================================

function calculateMetrics(posts: ForumPost[]): IssueMetrics {
  const total = posts.length
  const resolved = posts.filter((p) => p.status === 'SOLVED').length
  const active = posts.filter((p) => p.status === 'OPEN').length
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 1000) / 10 : 0

  // Mock previous month data (assume 10% growth in total, 5% in resolved)
  const previousTotal = Math.round(total / 1.12)
  const previousResolved = Math.round(resolved / 1.08)
  const previousActive = previousTotal - previousResolved
  const previousResolutionRate =
    previousTotal > 0 ? Math.round((previousResolved / previousTotal) * 1000) / 10 : 0

  return {
    total,
    resolved,
    active,
    resolutionRate,
    avgResponseTime: 1.2, // Mock value in days
    trends: {
      total: total - previousTotal,
      resolved: resolved - previousResolved,
      active: active - previousActive,
      resolutionRate: Math.round((resolutionRate - previousResolutionRate) * 10) / 10,
    },
  }
}

function calculateCategoryDistribution(posts: ForumPost[]): CategoryData[] {
  const tagCounts = new Map<string, number>()

  // Count primary tag (first tag) for each post
  posts.forEach((post) => {
    const primaryTag = post.tags[0] || 'general'
    tagCounts.set(primaryTag, (tagCounts.get(primaryTag) || 0) + 1)
  })

  const total = posts.length
  const distribution: CategoryData[] = Array.from(tagCounts.entries())
    .map(([name, value]) => ({
      name: formatTagName(name),
      value,
      percentage: Math.round((value / total) * 1000) / 10,
    }))
    .sort((a, b) => b.value - a.value)

  return distribution
}

function calculateMonthlyVolume(posts: ForumPost[]): MonthlyData[] {
  const monthCounts = new Map<string, number>()

  posts.forEach((post) => {
    // Extract year-month from createdAt (format: 2025-04-24 19:06:20)
    const dateMatch = post.createdAt.match(/^(\d{4}-\d{2})/)
    if (dateMatch) {
      const month = dateMatch[1]
      monthCounts.set(month, (monthCounts.get(month) || 0) + 1)
    }
  })

  // Sort by month (most recent first) and take last 12 months
  const monthlyData: MonthlyData[] = Array.from(monthCounts.entries())
    .map(([month, issues]) => ({ month, issues }))
    .sort((a, b) => b.month.localeCompare(a.month))
    .slice(0, 12)
    .reverse() // Oldest to newest

  return monthlyData
}

function calculateTagResolution(posts: ForumPost[]): TagResolution[] {
  const tagStats = new Map<string, { total: number; resolved: number }>()

  // Count all tags (not just primary)
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const stats = tagStats.get(tag) || { total: 0, resolved: 0 }
      stats.total++
      if (post.status === 'SOLVED') {
        stats.resolved++
      }
      tagStats.set(tag, stats)
    })
  })

  // Calculate resolution rates and sort by frequency
  const resolutionData: TagResolution[] = Array.from(tagStats.entries())
    .map(([tag, stats]) => ({
      tag: formatTagName(tag),
      total: stats.total,
      resolved: stats.resolved,
      rate: Math.round((stats.resolved / stats.total) * 1000) / 10,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10) // Top 10 tags

  return resolutionData
}

function getRecentActivity(posts: ForumPost[]): RecentActivity[] {
  return posts
    .sort((a, b) => b.lastActivity.localeCompare(a.lastActivity))
    .slice(0, 10)
    .map((post) => ({
      title: post.title,
      status: post.status,
      date: post.lastActivity,
      url: post.url,
    }))
}

// ============================================================================
// Utility Functions
// ============================================================================

function formatTagName(tag: string): string {
  // Convert kebab-case or snake_case to Title Case
  return tag
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// ============================================================================
// Run Script
// ============================================================================

main().catch((error) => {
  console.error('\n❌ Error during statistics generation:', error)
  process.exit(1)
})
