/**
 * LangChain Documentation Crawler
 *
 * Crawls and downloads LangChain documentation from docs.langchain.com:
 * 1. Fetch sitemap.xml
 * 2. Extract all documentation URLs
 * 3. Download each page and convert HTML to Markdown
 * 4. Extract metadata (title, URL, section path, last_modified)
 * 5. Save as markdown files with frontmatter
 *
 * Features:
 * - Rate limiting (2-3 requests/second)
 * - Progress tracking
 * - Error handling with retry logic (3 attempts)
 * - Skip already downloaded files
 * - Organized directory structure based on URL paths
 *
 * Usage: npm run crawl:docs
 */

import * as fs from 'fs'
import * as path from 'path'
import * as cheerio from 'cheerio'
import TurndownService from 'turndown'

// ============================================================================
// Configuration
// ============================================================================

const SITEMAP_URL = 'https://docs.langchain.com/sitemap.xml'
const OUTPUT_DIR = path.join(__dirname, '../data/docs')
const RATE_LIMIT_MS = 400 // 2.5 requests/second (400ms between requests)
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000
const REQUEST_TIMEOUT_MS = 30000 // 30 seconds

// ============================================================================
// Types
// ============================================================================

interface SitemapEntry {
  url: string
  lastModified?: string
  priority?: string
}

interface PageData {
  title: string
  url: string
  section: string
  lastModified: string
  markdown: string
}

interface CrawlStats {
  total: number
  successful: number
  failed: number
  skipped: number
}

// ============================================================================
// Main Function
// ============================================================================

async function main() {
  console.log('🚀 Starting LangChain documentation crawler...\n')

  // Step 1: Fetch and parse sitemap
  console.log('📡 Fetching sitemap from', SITEMAP_URL)
  const sitemapEntries = await fetchSitemap(SITEMAP_URL)
  console.log(`✅ Found ${sitemapEntries.length} URLs in sitemap\n`)

  // Filter to only docs.langchain.com URLs
  const docsEntries = sitemapEntries.filter((entry) =>
    entry.url.startsWith('https://docs.langchain.com/')
  )
  console.log(`📚 Filtered to ${docsEntries.length} documentation URLs\n`)

  // Step 2: Crawl each page
  const stats: CrawlStats = {
    total: docsEntries.length,
    successful: 0,
    failed: 0,
    skipped: 0,
  }

  console.log('🕷️  Starting crawl...\n')

  for (let i = 0; i < docsEntries.length; i++) {
    const entry = docsEntries[i]
    const progress = `[${i + 1}/${docsEntries.length}]`

    try {
      // Check if file already exists
      const filePath = getFilePathFromUrl(entry.url)
      if (fs.existsSync(filePath)) {
        console.log(`${progress} ⏭️  Skipping (already exists): ${entry.url}`)
        stats.skipped++
        continue
      }

      // Crawl page
      const pageData = await crawlPage(entry.url, entry.lastModified)

      // Save to file
      saveMarkdownFile(pageData)

      stats.successful++
      console.log(`${progress} ✅ ${pageData.title}`)

      // Rate limiting
      if (i < docsEntries.length - 1) {
        await sleep(RATE_LIMIT_MS)
      }
    } catch (error) {
      stats.failed++
      console.error(`${progress} ❌ Failed to crawl ${entry.url}:`, (error as Error).message)
    }
  }

  // Step 3: Print summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 Crawl Summary')
  console.log('='.repeat(60))
  console.log(`Total URLs:       ${stats.total}`)
  console.log(`Successful:       ${stats.successful}`)
  console.log(`Skipped:          ${stats.skipped}`)
  console.log(`Failed:           ${stats.failed}`)
  console.log('='.repeat(60))
  console.log(`\n✅ Documentation saved to: ${OUTPUT_DIR}\n`)
}

// ============================================================================
// Sitemap Parsing
// ============================================================================

async function fetchSitemap(url: string): Promise<SitemapEntry[]> {
  const html = await fetchWithRetry(url)
  const $ = cheerio.load(html, { xmlMode: true })

  const entries: SitemapEntry[] = []

  $('url').each((_, element) => {
    const loc = $(element).find('loc').text().trim()
    const lastmod = $(element).find('lastmod').text().trim()
    const priority = $(element).find('priority').text().trim()

    if (loc) {
      entries.push({
        url: loc,
        lastModified: lastmod || undefined,
        priority: priority || undefined,
      })
    }
  })

  return entries
}

// ============================================================================
// Page Crawling
// ============================================================================

async function crawlPage(url: string, lastModified?: string): Promise<PageData> {
  // Fetch HTML
  const html = await fetchWithRetry(url)
  const $ = cheerio.load(html)

  // Extract title
  let title = $('h1').first().text().trim()
  if (!title) {
    title = $('title').text().trim()
  }
  if (!title) {
    title = 'Untitled'
  }

  // Extract main content
  // Try multiple selectors for content area
  let contentHtml = ''
  const contentSelectors = [
    'main',
    'article',
    '.markdown-body',
    '.content',
    '#content',
    '[role="main"]',
  ]

  for (const selector of contentSelectors) {
    const content = $(selector).html()
    if (content && content.length > contentHtml.length) {
      contentHtml = content
    }
  }

  // Fallback to body if no content found
  if (!contentHtml) {
    contentHtml = $('body').html() || ''
  }

  // Convert HTML to Markdown
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
  })

  // Add custom rules for better markdown conversion
  turndownService.addRule('removeScripts', {
    filter: ['script', 'style', 'noscript'],
    replacement: () => '',
  })

  const markdown = turndownService.turndown(contentHtml)

  // Extract section path from URL
  const section = getSectionFromUrl(url)

  return {
    title,
    url,
    section,
    lastModified: lastModified || new Date().toISOString().split('T')[0],
    markdown,
  }
}

// ============================================================================
// File Management
// ============================================================================

function getFilePathFromUrl(url: string): string {
  // Extract path from URL: https://docs.langchain.com/modules/agents -> modules/agents
  const urlObj = new URL(url)
  let urlPath = urlObj.pathname

  // Remove leading and trailing slashes
  urlPath = urlPath.replace(/^\/+|\/+$/g, '')

  // If path is empty, use 'index'
  if (!urlPath) {
    urlPath = 'index'
  }

  // Create file path
  const filePath = path.join(OUTPUT_DIR, urlPath + '.md')

  return filePath
}

function getSectionFromUrl(url: string): string {
  const urlObj = new URL(url)
  let urlPath = urlObj.pathname

  // Remove leading and trailing slashes
  urlPath = urlPath.replace(/^\/+|\/+$/g, '')

  if (!urlPath) {
    return 'root'
  }

  // Get the first part of the path as section
  const parts = urlPath.split('/')
  return parts.slice(0, -1).join('/') || 'root'
}

function saveMarkdownFile(pageData: PageData): void {
  const filePath = getFilePathFromUrl(pageData.url)
  const dirPath = path.dirname(filePath)

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }

  // Create frontmatter
  const frontmatter = [
    '---',
    `title: "${pageData.title.replace(/"/g, '\\"')}"`,
    `url: "${pageData.url}"`,
    `section: "${pageData.section}"`,
    `last_modified: "${pageData.lastModified}"`,
    '---',
    '',
  ].join('\n')

  // Combine frontmatter and content
  const fileContent = frontmatter + pageData.markdown

  // Write to file
  fs.writeFileSync(filePath, fileContent, 'utf-8')
}

// ============================================================================
// Network Utilities
// ============================================================================

async function fetchWithRetry(
  url: string,
  retries: number = MAX_RETRIES
): Promise<string> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'LangChain-Documentation-Crawler/1.0',
        },
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Page not found (404): ${url}`)
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.text()
    } catch (error) {
      lastError = error as Error

      if (attempt < retries) {
        console.log(`  Retry ${attempt}/${retries - 1} after error:`, lastError.message)
        await sleep(RETRY_DELAY_MS * attempt) // Exponential backoff
      }
    }
  }

  throw lastError || new Error('Failed to fetch after retries')
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ============================================================================
// Run Script
// ============================================================================

main().catch((error) => {
  console.error('\n❌ Error during crawling:', error)
  process.exit(1)
})
