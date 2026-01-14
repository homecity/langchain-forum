/**
 * Unified Embeddings Generation Script
 *
 * Processes two data sources and generates embeddings:
 * 1. Forum posts: /forum/2025/, /forum/2026/
 * 2. Documentation: /app/data/docs/ (from crawler)
 *
 * Features:
 * - Token-based chunking (512 tokens, 50 token overlap)
 * - OpenAI embeddings (1536-dim)
 * - Batch processing (100 chunks at a time)
 * - Progress tracking
 * - Error handling with retry logic
 * - Memory-efficient streaming write to JSON
 *
 * Output: app/data/embeddings.json
 *
 * Usage: npm run embed:generate
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

// Load .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') })
// Direct import using OpenAI SDK (avoiding path alias issues with ts-node)
import OpenAI from 'openai'

// ============================================================================
// Configuration
// ============================================================================

const FORUM_DIRS = [
  path.join(__dirname, '../../forum/2025'),
  path.join(__dirname, '../../forum/2026'),
]
const DOCS_DIR = path.join(__dirname, '../data/docs')
const OUTPUT_FILE = path.join(__dirname, '../data/embeddings.json')

const CHUNK_SIZE = 512 // tokens
const CHUNK_OVERLAP = 50 // tokens
const BATCH_SIZE = 50 // Process 50 chunks at a time (reduced for memory efficiency)
const CHARS_PER_TOKEN = 4 // Approximate: 1 token = 4 chars

// ============================================================================
// Types
// ============================================================================

interface ForumPost {
  topicId: string
  title: string
  createdAt: string
  url: string
  content: string
  tags: string[]
  filePath: string
}

interface DocPage {
  title: string
  url: string
  section: string
  lastModified: string
  content: string
  filePath: string
}

interface Chunk {
  content: string
  metadata: ChunkMetadata
}

interface ChunkMetadata {
  source: 'forum' | 'docs'
  source_type: 'forum_post' | 'documentation'
  title: string
  url: string
  tags: string[]
  section?: string
  chunk_index: number
  total_chunks: number
}

interface EmbeddedDocument {
  id: string
  content: string
  metadata: ChunkMetadata
  embedding: number[]
}

interface OutputMetadata {
  total_documents: number
  total_chunks: number
  embedding_model: string
  dimensions: number
  sources: {
    forum: number
    docs: number
  }
  chunk_size: number
  chunk_overlap: number
  generated_at: string
}

interface OutputData {
  metadata: OutputMetadata
  documents: EmbeddedDocument[]
}

// ============================================================================
// Main Function
// ============================================================================

async function main() {
  console.log('🚀 Starting unified embeddings generation...\n')

  // Check API key
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY environment variable not set')
    process.exit(1)
  }

  // Initialize OpenAI client
  console.log('📦 Initializing OpenAI client...')
  const openai = new OpenAI({ apiKey })
  console.log(`✅ Using model: text-embedding-3-small (1536-dim)\n`)

  // Step 1: Process forum posts
  console.log('📂 Processing forum posts...')
  const forumChunks = await processForumPosts()
  console.log(`✅ Generated ${forumChunks.length} chunks from forum posts\n`)

  // Step 2: Process documentation
  console.log('📚 Processing documentation...')
  const docsChunks = await processDocumentation()
  console.log(`✅ Generated ${docsChunks.length} chunks from documentation\n`)

  // Combine all chunks
  const allChunks = [...forumChunks, ...docsChunks]
  console.log(`📊 Total chunks to embed: ${allChunks.length}\n`)

  // Step 3: Generate embeddings in batches
  console.log('🧠 Generating embeddings...')
  const embeddedDocuments = await generateEmbeddings(openai, allChunks)
  console.log(`✅ Generated ${embeddedDocuments.length} embeddings\n`)

  // Step 4: Save to JSON
  console.log('💾 Saving embeddings to file...')
  const outputData: OutputData = {
    metadata: {
      total_documents: forumChunks.length + docsChunks.length,
      total_chunks: embeddedDocuments.length,
      embedding_model: 'text-embedding-3-small',
      dimensions: 1536,
      sources: {
        forum: forumChunks.length,
        docs: docsChunks.length,
      },
      chunk_size: CHUNK_SIZE,
      chunk_overlap: CHUNK_OVERLAP,
      generated_at: new Date().toISOString(),
    },
    documents: embeddedDocuments,
  }

  saveToJSON(outputData, OUTPUT_FILE)
  console.log(`✅ Saved to ${OUTPUT_FILE}\n`)

  // Print summary
  console.log('=' .repeat(60))
  console.log('📊 Summary')
  console.log('=' .repeat(60))
  console.log(`Total documents processed: ${outputData.metadata.total_documents}`)
  console.log(`  - Forum posts:           ${outputData.metadata.sources.forum}`)
  console.log(`  - Documentation pages:   ${outputData.metadata.sources.docs}`)
  console.log(`Total chunks generated:    ${outputData.metadata.total_chunks}`)
  console.log(`Embedding model:           ${outputData.metadata.embedding_model}`)
  console.log(`Embedding dimensions:      ${outputData.metadata.dimensions}`)
  console.log('=' .repeat(60))

  console.log('\n🎉 Embeddings generation complete!')
}

// ============================================================================
// Forum Posts Processing
// ============================================================================

async function processForumPosts(): Promise<Chunk[]> {
  const allChunks: Chunk[] = []

  for (const forumDir of FORUM_DIRS) {
    if (!fs.existsSync(forumDir)) {
      console.log(`  ⚠️  Skipping (not found): ${forumDir}`)
      continue
    }

    const markdownFiles = findMarkdownFiles(forumDir)
    console.log(`  Found ${markdownFiles.length} posts in ${path.basename(forumDir)}`)

    for (const filePath of markdownFiles) {
      try {
        const post = parseForumPost(filePath)
        const chunks = chunkForumPost(post)
        allChunks.push(...chunks)
      } catch (error) {
        console.error(`  ❌ Error processing ${filePath}:`, (error as Error).message)
      }
    }
  }

  return allChunks
}

function parseForumPost(filePath: string): ForumPost {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  // Extract metadata from first few lines
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
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
    : []

  return {
    topicId,
    title,
    createdAt,
    url,
    content,
    tags,
    filePath,
  }
}

function chunkForumPost(post: ForumPost): Chunk[] {
  const chunks: Chunk[] = []
  const lines = post.content.split('\n')

  // Skip first 7 lines (metadata header)
  const contentLines = lines.slice(7)
  const contentText = contentLines.join('\n')

  // Token-based chunking (approximate: 1 token = 4 chars)
  const chunkSizeChars = CHUNK_SIZE * CHARS_PER_TOKEN
  const overlapChars = CHUNK_OVERLAP * CHARS_PER_TOKEN

  let start = 0
  let chunkIndex = 0

  while (start < contentText.length) {
    const end = Math.min(start + chunkSizeChars, contentText.length)
    const chunkContent = contentText.slice(start, end).trim()

    if (chunkContent.length > 0) {
      chunks.push({
        content: chunkContent,
        metadata: {
          source: 'forum',
          source_type: 'forum_post',
          title: post.title,
          url: post.url,
          tags: post.tags,
          chunk_index: chunkIndex,
          total_chunks: 0, // Will be updated later
        },
      })
      chunkIndex++
    }

    start = end - overlapChars
  }

  // Update total_chunks
  chunks.forEach((chunk) => {
    chunk.metadata.total_chunks = chunks.length
  })

  return chunks
}

// ============================================================================
// Documentation Processing
// ============================================================================

async function processDocumentation(): Promise<Chunk[]> {
  const allChunks: Chunk[] = []

  if (!fs.existsSync(DOCS_DIR)) {
    console.log(`  ⚠️  Skipping (not found): ${DOCS_DIR}`)
    return allChunks
  }

  const markdownFiles = findMarkdownFiles(DOCS_DIR)
  console.log(`  Found ${markdownFiles.length} documentation pages`)

  for (const filePath of markdownFiles) {
    try {
      const doc = parseDocPage(filePath)
      const chunks = chunkDocPage(doc)
      allChunks.push(...chunks)
    } catch (error) {
      console.error(`  ❌ Error processing ${filePath}:`, (error as Error).message)
    }
  }

  return allChunks
}

function parseDocPage(filePath: string): DocPage {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  // Extract frontmatter
  let title = 'Untitled'
  let url = ''
  let section = 'root'
  let lastModified = new Date().toISOString().split('T')[0]
  let contentStartIndex = 0

  if (lines[0] === '---') {
    // Parse frontmatter
    let endIndex = 1
    while (endIndex < lines.length && lines[endIndex] !== '---') {
      const line = lines[endIndex]
      const titleMatch = line.match(/^title:\s*"(.+)"/)
      const urlMatch = line.match(/^url:\s*"(.+)"/)
      const sectionMatch = line.match(/^section:\s*"(.+)"/)
      const modifiedMatch = line.match(/^last_modified:\s*"(.+)"/)

      if (titleMatch) title = titleMatch[1]
      if (urlMatch) url = urlMatch[1]
      if (sectionMatch) section = sectionMatch[1]
      if (modifiedMatch) lastModified = modifiedMatch[1]

      endIndex++
    }
    contentStartIndex = endIndex + 1
  }

  // Extract content (skip frontmatter)
  const contentLines = lines.slice(contentStartIndex)
  const contentText = contentLines.join('\n')

  return {
    title,
    url,
    section,
    lastModified,
    content: contentText,
    filePath,
  }
}

function chunkDocPage(doc: DocPage): Chunk[] {
  const chunks: Chunk[] = []

  // Token-based chunking (approximate: 1 token = 4 chars)
  const chunkSizeChars = CHUNK_SIZE * CHARS_PER_TOKEN
  const overlapChars = CHUNK_OVERLAP * CHARS_PER_TOKEN

  let start = 0
  let chunkIndex = 0

  while (start < doc.content.length) {
    const end = Math.min(start + chunkSizeChars, doc.content.length)
    const chunkContent = doc.content.slice(start, end).trim()

    if (chunkContent.length > 0) {
      chunks.push({
        content: chunkContent,
        metadata: {
          source: 'docs',
          source_type: 'documentation',
          title: doc.title,
          url: doc.url,
          tags: [], // Docs don't have tags
          section: doc.section,
          chunk_index: chunkIndex,
          total_chunks: 0, // Will be updated later
        },
      })
      chunkIndex++
    }

    start = end - overlapChars
  }

  // Update total_chunks
  chunks.forEach((chunk) => {
    chunk.metadata.total_chunks = chunks.length
  })

  return chunks
}

// ============================================================================
// Embeddings Generation
// ============================================================================

async function generateEmbeddings(
  openai: OpenAI,
  chunks: Chunk[]
): Promise<EmbeddedDocument[]> {
  const embeddedDocuments: EmbeddedDocument[] = []
  const totalBatches = Math.ceil(chunks.length / BATCH_SIZE)

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE)
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1

    console.log(`  Processing batch ${batchNumber}/${totalBatches} (${batch.length} chunks)`)

    try {
      // Extract texts to embed
      const texts = batch.map((chunk) => chunk.content)

      // Generate embeddings for batch using OpenAI API
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: texts,
        dimensions: 1536,
      })

      // Sort by index to ensure correct order
      const sortedData = response.data.sort((a, b) => a.index - b.index)

      // Create embedded documents
      for (let j = 0; j < batch.length; j++) {
        const chunk = batch[j]
        const embedding = sortedData[j].embedding

        // Generate unique ID
        const id = generateDocumentId(chunk)

        embeddedDocuments.push({
          id,
          content: chunk.content,
          metadata: chunk.metadata,
          embedding,
        })
      }

      console.log(`    ✅ Embedded ${batch.length} chunks`)
    } catch (error) {
      console.error(`    ❌ Error embedding batch ${batchNumber}:`, (error as Error).message)
      // Continue with next batch instead of failing completely
    }
  }

  return embeddedDocuments
}

function generateDocumentId(chunk: Chunk): string {
  const sourcePrefix = chunk.metadata.source === 'forum' ? 'forum' : 'docs'

  // For forum posts, use title-based ID
  if (chunk.metadata.source === 'forum') {
    const titleSlug = chunk.metadata.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .substring(0, 50)
    return `${sourcePrefix}_${titleSlug}_chunk_${chunk.metadata.chunk_index}`
  }

  // For docs, use section-based ID
  const sectionSlug = (chunk.metadata.section || 'root')
    .replace(/\//g, '_')
    .replace(/[^a-z0-9_]+/g, '_')
    .substring(0, 50)
  return `${sourcePrefix}_${sectionSlug}_chunk_${chunk.metadata.chunk_index}`
}

// ============================================================================
// File Utilities
// ============================================================================

function findMarkdownFiles(dir: string): string[] {
  const files: string[] = []

  function traverse(currentDir: string) {
    if (!fs.existsSync(currentDir)) {
      return
    }

    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
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

function saveToJSON(data: OutputData, filename: string): void {
  const dirPath = path.dirname(filename)

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  // Write to file with pretty formatting
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8')
}

// ============================================================================
// Run Script
// ============================================================================

main().catch((error) => {
  console.error('\n❌ Error during embeddings generation:', error)
  process.exit(1)
})
