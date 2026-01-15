/**
 * Evaluation API Route
 * Proxies to Python LangServe backend for LangSmith data
 * Falls back to TypeScript client if Python backend unavailable
 */

import { NextRequest, NextResponse } from 'next/server'
import { getLangSmithClient } from '@/lib/evaluation/langsmith-client'

// Python backend URL (LangServe)
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000'
const USE_TYPESCRIPT_BACKEND = process.env.USE_TYPESCRIPT_BACKEND === 'true'

/**
 * Proxy evaluation request to Python backend
 */
async function proxyToPythonBackend(type: string, limit: number): Promise<Response> {
  const url = `${PYTHON_BACKEND_URL}/api/evaluation?type=${type}&limit=${limit}`

  // Setup timeout controller
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Python backend error: ${response.status}`)
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'summary'
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    // Try Python backend first (default)
    if (!USE_TYPESCRIPT_BACKEND) {
      try {
        const pythonResponse = await proxyToPythonBackend(type, limit)
        const data = await pythonResponse.json()
        return NextResponse.json(data)
      } catch (error) {
        console.error('Python backend error, falling back to TypeScript client:', error)
      }
    }

    // Fallback to TypeScript LangSmith client
    const client = getLangSmithClient()

    switch (type) {
      case 'summary': {
        const summary = await client.getSummary()
        return NextResponse.json(summary)
      }

      case 'runs': {
        const runs = await client.getEvaluationRuns(limit)
        return NextResponse.json({ runs })
      }

      case 'traces': {
        const traces = await client.getRecentTraces(limit)
        return NextResponse.json({ traces })
      }

      case 'all': {
        const [summary, runs, traces] = await Promise.all([
          client.getSummary(),
          client.getEvaluationRuns(limit),
          client.getRecentTraces(limit),
        ])
        return NextResponse.json({ summary, runs, traces })
      }

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('Evaluation API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch evaluation data', details: (error as Error).message },
      { status: 500 }
    )
  }
}
