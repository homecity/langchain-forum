/**
 * Test Forum Data Parsing (No API Key Required)
 *
 * Tests the parsing and chunking logic without calling Gemini API
 */

import * as fs from 'fs'
import * as path from 'path'

const FORUM_DIR = '/Users/jihyunjeong/Documents/Github/langchain/forum'

interface ForumPost {
  topicId: string
  title: string
  createdAt: string
  url: string
  contentLength: number
  tags: string[]
  filePath: string
}

function findMarkdownFiles(dir: string, limit = 10): string[] {
  const files: string[] = []

  function traverse(currentDir: string) {
    if (files.length >= limit) return

    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      if (files.length >= limit) break

      const fullPath = path.join(currentDir, entry.name)

      if (entry.isDirectory()) {
        traverse(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
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

  const title = lines[0].replace(/^#\s*/, '').trim()
  const topicIdMatch = content.match(/\*\*Topic ID:\*\*\s*(\d+)/)
  const createdMatch = content.match(/\*\*Created:\*\*\s*([\d-]+\s[\d:]+)/)
  const urlMatch = content.match(/\*\*URL:\*\*\s*(https?:\/\/[^\s]+)/)

  const topicId = topicIdMatch ? topicIdMatch[1] : 'unknown'
  const createdAt = createdMatch ? createdMatch[1] : new Date().toISOString()
  const url = urlMatch ? urlMatch[1] : ''

  const tags = extractTags(title)

  return {
    topicId,
    title,
    createdAt,
    url,
    contentLength: content.length,
    tags,
    filePath: path.basename(filePath),
  }
}

function extractTags(title: string): string[] {
  const tags: string[] = []
  const lowerTitle = title.toLowerCase()

  if (lowerTitle.includes('langsmith')) tags.push('langsmith')
  if (lowerTitle.includes('langgraph')) tags.push('langgraph')
  if (lowerTitle.includes('langchain')) tags.push('langchain')
  if (lowerTitle.includes('deployment') || lowerTitle.includes('deploy'))
    tags.push('deployment')
  if (lowerTitle.includes('auth') || lowerTitle.includes('login')) tags.push('auth')
  if (lowerTitle.includes('tracing') || lowerTitle.includes('trace')) tags.push('trace')
  if (lowerTitle.includes('cloud')) tags.push('cloud')
  if (lowerTitle.includes('api')) tags.push('api')

  if (tags.length === 0) tags.push('general')

  return tags
}

function calculateChunks(contentLength: number, chunkSize = 512, overlap = 50): number {
  const chunkSizeChars = chunkSize * 4
  const overlapChars = overlap * 4
  let chunks = 0
  let start = 0

  while (start < contentLength) {
    chunks++
    const end = Math.min(start + chunkSizeChars, contentLength)
    start = end - overlapChars
    if (start >= contentLength) break
  }

  return chunks
}

async function main() {
  console.log('🧪 Testing Forum Data Parsing\n')

  console.log(`📂 Scanning ${FORUM_DIR}...`)
  const markdownFiles = findMarkdownFiles(FORUM_DIR, 10) // Sample 10 files
  console.log(`✅ Found ${markdownFiles.length} sample files\n`)

  console.log('📖 Parsing sample posts...\n')
  const posts = markdownFiles.map(parseForumPost)

  let totalChunks = 0

  posts.forEach((post, index) => {
    const chunks = calculateChunks(post.contentLength)
    totalChunks += chunks

    console.log(`${index + 1}. ${post.title}`)
    console.log(`   Topic ID: ${post.topicId}`)
    console.log(`   Created: ${post.createdAt}`)
    console.log(`   Tags: ${post.tags.join(', ')}`)
    console.log(`   Content: ${post.contentLength} chars → ${chunks} chunks`)
    console.log(`   File: ${post.filePath}`)
    console.log()
  })

  console.log('📊 Summary:')
  console.log(`   - Total posts: ${posts.length}`)
  console.log(`   - Total chunks: ${totalChunks}`)
  console.log(`   - Avg chunks per post: ${(totalChunks / posts.length).toFixed(1)}`)

  // Estimate for full dataset (364 files)
  const avgChunksPerPost = totalChunks / posts.length
  const estimatedTotalChunks = Math.round(avgChunksPerPost * 364)

  console.log(`\n🔮 Full Dataset Estimate:`)
  console.log(`   - Total posts: 364`)
  console.log(`   - Estimated chunks: ~${estimatedTotalChunks}`)
  console.log(`   - Estimated embeddings: ${estimatedTotalChunks} × 768 dims`)
  console.log(`   - Estimated API calls: ${estimatedTotalChunks} (Gemini API)`)

  console.log('\n✅ Test complete!')
}

main().catch((error) => {
  console.error('❌ Error:', error)
  process.exit(1)
})
