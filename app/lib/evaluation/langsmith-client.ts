/**
 * LangSmith API Client
 * Fetches real evaluation data from LangSmith
 */

import { Client } from 'langsmith'

// ============================================================================
// Types
// ============================================================================

export interface LangSmithEvaluationRun {
  id: string
  name: string
  projectName: string
  createdAt: string
  status: 'completed' | 'running' | 'failed'
  metrics: {
    faithfulness: number
    relevance: number
    correctness: number
    helpfulness: number
  }
  totalExamples: number
  passedExamples: number
  avgLatency: number
}

export interface LangSmithExample {
  id: string
  input: string
  expectedOutput?: string
  actualOutput: string
  scores: {
    faithfulness?: number
    relevance?: number
    correctness?: number
  }
  passed: boolean
  latency: number
}

export interface LangSmithSummary {
  totalRuns: number
  avgFaithfulness: number
  avgRelevance: number
  avgCorrectness: number
  passRate: number
  totalExamples: number
  passedExamples: number
  avgLatency: number
}

// ============================================================================
// LangSmith Client
// ============================================================================

export class LangSmithClient {
  private client: Client

  constructor() {
    // Client automatically uses LANGSMITH_API_KEY from environment
    this.client = new Client()
  }

  /**
   * Fetch evaluation runs (experiments) from LangSmith
   */
  async getEvaluationRuns(limit: number = 10): Promise<LangSmithEvaluationRun[]> {
    const runs: LangSmithEvaluationRun[] = []

    try {
      // Get project name from environment
      const projectName = process.env.LANGSMITH_PROJECT || 'default'

      // Fetch recent runs with their feedback
      const runsIterator = this.client.listRuns({
        projectName,
        isRoot: true, // Only get root runs (not child spans)
        limit,
      })

      const runsList: any[] = []
      for await (const run of runsIterator) {
        runsList.push(run)
        if (runsList.length >= limit) break
      }

      // Group runs by session and calculate metrics
      const sessionRuns = new Map<string, any[]>()

      for (const run of runsList) {
        const sessionId = run.session_id || run.id
        if (!sessionRuns.has(sessionId)) {
          sessionRuns.set(sessionId, [])
        }
        sessionRuns.get(sessionId)!.push(run)
      }

      // Get feedback for runs
      for (const [sessionId, sessionRunList] of sessionRuns) {
        const feedbackScores = await this.getRunFeedback(sessionRunList)

        const totalLatency = sessionRunList.reduce((sum, r) => {
          const latency = r.end_time && r.start_time
            ? new Date(r.end_time).getTime() - new Date(r.start_time).getTime()
            : 0
          return sum + latency
        }, 0)

        const passed = sessionRunList.filter(r =>
          r.status === 'success' &&
          (feedbackScores.avgFaithfulness >= 0.7 || feedbackScores.totalFeedback === 0)
        ).length

        runs.push({
          id: sessionId,
          name: sessionRunList[0]?.name || 'RAG Query',
          projectName,
          createdAt: sessionRunList[0]?.start_time || new Date().toISOString(),
          status: this.getRunStatus(sessionRunList),
          metrics: {
            faithfulness: feedbackScores.avgFaithfulness,
            relevance: feedbackScores.avgRelevance,
            correctness: feedbackScores.avgCorrectness,
            helpfulness: feedbackScores.avgHelpfulness,
          },
          totalExamples: sessionRunList.length,
          passedExamples: passed,
          avgLatency: sessionRunList.length > 0 ? totalLatency / sessionRunList.length : 0,
        })
      }

      return runs
    } catch (error) {
      console.error('Error fetching LangSmith runs:', error)
      return []
    }
  }

  /**
   * Get feedback scores for a set of runs
   */
  private async getRunFeedback(runs: any[]): Promise<{
    avgFaithfulness: number
    avgRelevance: number
    avgCorrectness: number
    avgHelpfulness: number
    totalFeedback: number
  }> {
    const scores = {
      faithfulness: [] as number[],
      relevance: [] as number[],
      correctness: [] as number[],
      helpfulness: [] as number[],
    }

    try {
      for (const run of runs) {
        const feedbackIterator = this.client.listFeedback({
          runIds: [run.id],
        })

        for await (const feedback of feedbackIterator) {
          const key = feedback.key?.toLowerCase()
          const score = feedback.score

          if (score !== null && score !== undefined && typeof score === 'number') {
            if (key?.includes('faithful')) scores.faithfulness.push(score)
            else if (key?.includes('relevan')) scores.relevance.push(score)
            else if (key?.includes('correct')) scores.correctness.push(score)
            else if (key?.includes('helpful')) scores.helpfulness.push(score)
          }
        }
      }
    } catch (error) {
      // Feedback might not exist for all runs
    }

    const avg = (arr: number[]) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0

    return {
      avgFaithfulness: avg(scores.faithfulness),
      avgRelevance: avg(scores.relevance),
      avgCorrectness: avg(scores.correctness),
      avgHelpfulness: avg(scores.helpfulness),
      totalFeedback: scores.faithfulness.length + scores.relevance.length +
                     scores.correctness.length + scores.helpfulness.length,
    }
  }

  /**
   * Get run status from a list of runs
   */
  private getRunStatus(runs: any[]): 'completed' | 'running' | 'failed' {
    const hasError = runs.some(r => r.error || r.status === 'error')
    const hasRunning = runs.some(r => !r.end_time)

    if (hasError) return 'failed'
    if (hasRunning) return 'running'
    return 'completed'
  }

  /**
   * Get summary statistics
   */
  async getSummary(): Promise<LangSmithSummary> {
    const runs = await this.getEvaluationRuns(50)

    if (runs.length === 0) {
      return {
        totalRuns: 0,
        avgFaithfulness: 0,
        avgRelevance: 0,
        avgCorrectness: 0,
        passRate: 0,
        totalExamples: 0,
        passedExamples: 0,
        avgLatency: 0,
      }
    }

    const totalExamples = runs.reduce((sum, r) => sum + r.totalExamples, 0)
    const passedExamples = runs.reduce((sum, r) => sum + r.passedExamples, 0)

    return {
      totalRuns: runs.length,
      avgFaithfulness: runs.reduce((sum, r) => sum + r.metrics.faithfulness, 0) / runs.length,
      avgRelevance: runs.reduce((sum, r) => sum + r.metrics.relevance, 0) / runs.length,
      avgCorrectness: runs.reduce((sum, r) => sum + r.metrics.correctness, 0) / runs.length,
      passRate: totalExamples > 0 ? passedExamples / totalExamples : 0,
      totalExamples,
      passedExamples,
      avgLatency: runs.reduce((sum, r) => sum + r.avgLatency, 0) / runs.length,
    }
  }

  /**
   * Get recent traces with details
   */
  async getRecentTraces(limit: number = 20): Promise<LangSmithExample[]> {
    const examples: LangSmithExample[] = []

    try {
      const projectName = process.env.LANGSMITH_PROJECT || 'default'

      const runsIterator = this.client.listRuns({
        projectName,
        isRoot: true,
        limit,
      })

      for await (const run of runsIterator) {
        // Get feedback for this run
        let scores: { faithfulness?: number; relevance?: number; correctness?: number } = {}

        try {
          const feedbackIterator = this.client.listFeedback({ runIds: [run.id] })
          for await (const feedback of feedbackIterator) {
            const key = feedback.key?.toLowerCase()
            const score = feedback.score
            if (score !== null && score !== undefined && typeof score === 'number') {
              if (key?.includes('faithful')) scores.faithfulness = score
              else if (key?.includes('relevan')) scores.relevance = score
              else if (key?.includes('correct')) scores.correctness = score
            }
          }
        } catch (e) {
          // Ignore feedback errors
        }

        const latency = run.end_time && run.start_time
          ? new Date(run.end_time).getTime() - new Date(run.start_time).getTime()
          : 0

        const passed = run.status === 'success' &&
          ((scores.faithfulness ?? 1) >= 0.7 || !scores.faithfulness)

        examples.push({
          id: run.id,
          input: this.extractInput(run.inputs),
          expectedOutput: undefined,
          actualOutput: this.extractOutput(run.outputs),
          scores,
          passed,
          latency,
        })

        if (examples.length >= limit) break
      }

      return examples
    } catch (error) {
      console.error('Error fetching traces:', error)
      return []
    }
  }

  private extractInput(inputs: any): string {
    if (!inputs) return ''
    if (typeof inputs === 'string') return inputs
    if (inputs.query) return inputs.query
    if (inputs.question) return inputs.question
    if (inputs.input) return inputs.input
    return JSON.stringify(inputs).substring(0, 200)
  }

  private extractOutput(outputs: any): string {
    if (!outputs) return ''
    if (typeof outputs === 'string') return outputs
    if (outputs.answer) return outputs.answer
    if (outputs.output) return outputs.output
    if (outputs.response) return outputs.response
    return JSON.stringify(outputs).substring(0, 500)
  }
}

// Export singleton instance
let clientInstance: LangSmithClient | null = null

export function getLangSmithClient(): LangSmithClient {
  if (!clientInstance) {
    clientInstance = new LangSmithClient()
  }
  return clientInstance
}
