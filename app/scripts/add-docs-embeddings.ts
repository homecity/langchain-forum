/**
 * Add Documentation Embeddings to Existing Embeddings
 *
 * Processes only documentation files and merges with existing forum embeddings.
 * Memory efficient - only processes docs (forum embeddings already exist).
 *
 * Usage: npm run embed:docs
 */

import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import OpenAI from 'openai'

// Load .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') })

// ============================================================================
// Configuration
// ============================================================================

const DOCS_DIR = path.join(__dirname, '../data/docs')
const EMBEDDINGS_FILE = path.join(__dirname, '../data/embeddings.json')
const CHUNK_SIZE = 512 // tokens
const CHUNK_OVERLAP = 50 // tokens
const BATCH_SIZE = 25 // Smaller batch for memory efficiency
const CHARS_PER_TOKEN = 4

// ============================================================================
// Types
// ============================================================================

interface DocPage {
  title: string
  url: string
  section: string
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

// ============================================================================
// Main Function
// ============================================================================

async function main() {
  console.log('🚀 Adding documentation embeddings...\n')

  // Check API key
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY environment variable not set')
    process.exit(1)
  }

  // Initialize OpenAI client
  const openai = new OpenAI({ apiKey })
  console.log('✅ OpenAI client initialized\n')

  // Load existing embeddings
  console.log('📂 Loading existing embeddings...')
  const existingData = JSON.parse(fs.readFileSync(EMBEDDINGS_FILE, 'utf-8'))
  const existingDocs = existingData.documents as EmbeddedDocument[]

  // Filter out any existing docs embeddings (keep only forum)
  const forumDocs = existingDocs.filter(d => d.metadata.source === 'forum')
  console.log(`✅ Found ${forumDocs.length} existing forum embeddings\n`)

  // Process documentation files
  console.log('📚 Processing documentation files...')
  const docsChunks = await processDocumentation()
  console.log(`✅ Generated ${docsChunks.length} chunks from documentation\n`)

  // Generate embeddings for docs
  console.log('🧠 Generating documentation embeddings...')
  const docsEmbeddings = await generateEmbeddings(openai, docsChunks)
  console.log(`✅ Generated ${docsEmbeddings.length} documentation embeddings\n`)

  // Merge embeddings
  const allDocuments = [...forumDocs, ...docsEmbeddings]

  // Create output data
  const outputData = {
    metadata: {
      total_documents: allDocuments.length,
      total_chunks: allDocuments.length,
      embedding_model: 'text-embedding-3-small',
      dimensions: 1536,
      sources: {
        forum: forumDocs.length,
        docs: docsEmbeddings.length,
      },
      chunk_size: CHUNK_SIZE,
      chunk_overlap: CHUNK_OVERLAP,
      generated_at: new Date().toISOString(),
    },
    documents: allDocuments,
  }

  // Save to file
  console.log('💾 Saving merged embeddings...')
  fs.writeFileSync(EMBEDDINGS_FILE, JSON.stringify(outputData, null, 2), 'utf-8')

  // Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Summary')
  console.log('='.repeat(60))
  console.log(`Forum embeddings:      ${forumDocs.length}`)
  console.log(`Documentation embeddings: ${docsEmbeddings.length}`)
  console.log(`Total embeddings:      ${allDocuments.length}`)
  console.log('='.repeat(60))
  console.log('\n🎉 Documentation embeddings added successfully!')
}

// ============================================================================
// Documentation Processing
// ============================================================================

async function processDocumentation(): Promise<Chunk[]> {
  const allChunks: Chunk[] = []

  if (!fs.existsSync(DOCS_DIR)) {
    console.log(`  ⚠️  Docs directory not found: ${DOCS_DIR}`)
    return allChunks
  }

  const markdownFiles = findMarkdownFiles(DOCS_DIR)
  console.log(`  Found ${markdownFiles.length} documentation files`)

  // Process files in batches to avoid memory issues
  const fileBatchSize = 50
  for (let i = 0; i < markdownFiles.length; i += fileBatchSize) {
    const batch = markdownFiles.slice(i, i + fileBatchSize)
    console.log(`  Processing files ${i + 1}-${Math.min(i + fileBatchSize, markdownFiles.length)}...`)

    for (const filePath of batch) {
      try {
        const doc = parseDocPage(filePath)
        const chunks = chunkDocPage(doc)
        allChunks.push(...chunks)
      } catch (error) {
        // Skip files with errors silently
      }
    }
  }

  return allChunks
}

function parseDocPage(filePath: string): DocPage {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  let title = 'Untitled'
  let url = ''
  let section = 'root'
  let contentStartIndex = 0

  if (lines[0] === '---') {
    let endIndex = 1
    while (endIndex < lines.length && lines[endIndex] !== '---') {
      const line = lines[endIndex]
      const titleMatch = line.match(/^title:\s*"(.+)"/)
      const urlMatch = line.match(/^url:\s*"(.+)"/)
      const sectionMatch = line.match(/^section:\s*"(.+)"/)

      if (titleMatch) title = titleMatch[1]
      if (urlMatch) url = urlMatch[1]
      if (sectionMatch) section = sectionMatch[1]

      endIndex++
    }
    contentStartIndex = endIndex + 1
  }

  const contentLines = lines.slice(contentStartIndex)
  const contentText = contentLines.join('\n')

  return { title, url, section, content: contentText, filePath }
}

function chunkDocPage(doc: DocPage): Chunk[] {
  const chunks: Chunk[] = []
  const chunkSizeChars = CHUNK_SIZE * CHARS_PER_TOKEN
  const overlapChars = CHUNK_OVERLAP * CHARS_PER_TOKEN

  let start = 0
  let chunkIndex = 0

  while (start < doc.content.length) {
    const end = Math.min(start + chunkSizeChars, doc.content.length)
    const chunkContent = doc.content.slice(start, end).trim()

    if (chunkContent.length > 100) { // Skip very small chunks
      chunks.push({
        content: chunkContent,
        metadata: {
          source: 'docs',
          source_type: 'documentation',
          title: doc.title,
          url: doc.url,
          tags: [],
          section: doc.section,
          chunk_index: chunkIndex,
          total_chunks: 0,
        },
      })
      chunkIndex++
    }

    start = end - overlapChars
    if (start >= doc.content.length - overlapChars) break
  }

  chunks.forEach(chunk => { chunk.metadata.total_chunks = chunks.length })
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

    console.log(`  Batch ${batchNumber}/${totalBatches} (${batch.length} chunks)`)

    try {
      const texts = batch.map(chunk => chunk.content)

      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: texts,
        dimensions: 1536,
      })

      const sortedData = response.data.sort((a, b) => a.index - b.index)

      for (let j = 0; j < batch.length; j++) {
        const chunk = batch[j]
        const embedding = sortedData[j].embedding
        const id = generateDocumentId(chunk)

        embeddedDocuments.push({
          id,
          content: chunk.content,
          metadata: chunk.metadata,
          embedding,
        })
      }
    } catch (error) {
      console.error(`  ❌ Error in batch ${batchNumber}:`, (error as Error).message)
    }

    // Small delay between batches
    if (i + BATCH_SIZE < chunks.length) {
      await sleep(100)
    }
  }

  return embeddedDocuments
}

function generateDocumentId(chunk: Chunk): string {
  const sectionSlug = (chunk.metadata.section || 'root')
    .replace(/\//g, '_')
    .replace(/[^a-z0-9_]/gi, '_')
    .substring(0, 50)
  return `docs_${sectionSlug}_chunk_${chunk.metadata.chunk_index}`
}

// ============================================================================
// Utilities
// ============================================================================

function findMarkdownFiles(dir: string): string[] {
  const files: string[] = []
  function traverse(currentDir: string) {
    if (!fs.existsSync(currentDir)) return
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

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ============================================================================
// Run Script
// ============================================================================

main().catch(error => {
  console.error('\n❌ Error:', error)
  process.exit(1)
})
