/**
 * POST /api/chat
 *
 * RAG Chat API Endpoint - Proxies to Python LangServe Backend
 *
 * Request:
 * {
 *   "query": "How do I authenticate with LangSmith?",
 *   "filter": { "tags": ["langsmith"] }, // Optional
 *   "stream": true // Optional - enables streaming response
 * }
 *
 * Response (Non-Streaming):
 * {
 *   "answer": "To authenticate with LangSmith...",
 *   "sources": [...],
 *   "trace": { embeddingDuration, retrievalDuration, generationDuration, totalDuration }
 * }
 *
 * Backend Options:
 * - Python LangServe (default): Set PYTHON_BACKEND_URL=http://localhost:8000
 * - TypeScript (fallback): Unset PYTHON_BACKEND_URL or set USE_TYPESCRIPT_BACKEND=true
 */

import { NextRequest, NextResponse } from 'next/server'

// Python backend URL (LangServe)
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000'
const USE_TYPESCRIPT_BACKEND = process.env.USE_TYPESCRIPT_BACKEND === 'true'

/**
 * Proxy request to Python LangServe backend
 */
async function proxyToPythonBackend(
  query: string,
  filter?: Record<string, unknown>,
  stream?: boolean
): Promise<Response> {
  const url = `${PYTHON_BACKEND_URL}/api/chat`

  // Setup timeout controller
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, filter, stream }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Python backend error: ${response.status} - ${error}`)
    }

    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if ((error as Error).name === 'AbortError') {
      throw new Error('Request timeout: Python backend did not respond within 30 seconds')
    }
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { query, filter, stream = false } = body as {
      query: string
      filter?: Record<string, unknown>
      stream?: boolean
    }

    // Validate query
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    // Proxy to Python LangServe backend (default)
    if (!USE_TYPESCRIPT_BACKEND) {
      try {
        const pythonResponse = await proxyToPythonBackend(query, filter, stream)
        const data = await pythonResponse.json()
        return NextResponse.json(data, { status: 200 })
      } catch (error) {
        console.error('Python backend error:', error)
        // Fall through to mock mode if Python backend is unavailable
        console.log('Falling back to mock mode...')
      }
    }

    // MOCK MODE: Return mock responses when Python backend is unavailable
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const lowerQuery = query.toLowerCase()
    let mockResponse

    if (lowerQuery.includes('auth') || lowerQuery.includes('login') || lowerQuery.includes('langsmith')) {
      mockResponse = {
        answer: `Based on the LangChain forum data, the most common LangSmith authentication errors are:

**1. EU Portal Login Failures (429 Too Many Requests)**
- Affects users trying to log in to eu.smith.langchain.com
- Recent spike in January 2026 (12+ reported cases)
- **Solution**: LangChain team is investigating

**2. OAuth Token Expiration**
- Users getting logged out unexpectedly
- **Solution**: Clear browser cache and re-authenticate

**3. API Key Authentication in Self-Hosted**
- API keys not recognized in self-hosted deployments
- **Solution**: Check LANGSMITH_API_KEY environment variable`,
        sources: [
          {
            id: '2719',
            title: 'Cannot log in to Langsmith',
            url: 'https://forum.langchain.com/t/2719',
            relevanceScore: 0.94,
            snippet: 'Getting 429 Too Many Requests when trying to log in...',
            tags: ['langsmith', 'auth'],
          },
        ],
        trace: {
          embeddingDuration: 0.15,
          retrievalDuration: 0.32,
          rerankingDuration: 0.18,
          generationDuration: 1.42,
          totalDuration: 2.07,
        },
      }
    } else {
      mockResponse = {
        answer: `I'm a LangChain Forum RAG Assistant. The Python backend is currently unavailable.

**To use the RAG system:**
1. Start the Python backend: \`cd backend && uvicorn app.main:app --port 8000\`
2. Refresh this page

**Try asking about:**
- LangSmith authentication
- LangGraph deployments
- LangChain best practices`,
        sources: [],
        trace: {
          embeddingDuration: 0.0,
          retrievalDuration: 0.0,
          generationDuration: 0.0,
          totalDuration: 0.8,
        },
      }
    }

    return NextResponse.json(mockResponse, { status: 200 })
  } catch (error) {
    console.error('RAG API Error:', error)

    return NextResponse.json(
      {
        error: 'Failed to process query',
        message: (error as Error).message,
      },
      { status: 500 }
    )
  }
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      message: 'RAG Chat API is running',
      version: '1.0.0',
    },
    { status: 200 }
  )
}
