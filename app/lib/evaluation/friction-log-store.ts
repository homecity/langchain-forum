/**
 * Friction Log Store
 * Client-side state management for friction log entries
 * Uses localStorage for persistence
 */

import type { FrictionLogEntry, FrictionSeverity, FrictionCategory, FrictionStatus, ImpactLevel } from './types'

const STORAGE_KEY = 'langchain-friction-log-v3'

// ============================================================================
// Initial Friction Log Entries (Pre-populated from development)
// Enhanced with LangSmith trace links, impact scores, and suggested fixes
// ============================================================================

const initialEntries: FrictionLogEntry[] = [
  {
    id: '1',
    title: 'Low relevance queries return unhelpful message',
    description: 'When RAG retrieval returns documents with low relevance scores (<50%), the system responds with "I don\'t have enough information" without suggesting alternatives.',
    category: 'ux',
    severity: 'medium',
    status: 'fixed',
    component: 'Chat / RAG Pipeline',
    stepsToReproduce: '1. Go to Chat\n2. Ask "How to install LangChain on Python?"\n3. Observe response',
    expectedBehavior: 'Provide helpful guidance about what topics the forum data covers',
    actualBehavior: 'Returns generic "I don\'t have enough information" message',
    traceUrl: 'https://smith.langchain.com/public/abc123/r/run-456',
    impactLevel: 'significant',
    impactDescription: 'Users confused for 5+ min trying to rephrase queries',
    suggestedFix: 'Add fallback response that lists available topics when relevance < 0.5. Example: "I found some related content about [topics]. Try asking about..."',
    relatedDocs: 'https://python.langchain.com/docs/modules/chains/how_to/retrieval_qa',
    createdAt: '2026-01-14T10:30:00Z',
    updatedAt: '2026-01-15T09:00:00Z',
  },
  {
    id: '2',
    title: 'Source URLs contain "** " prefix causing broken links',
    description: 'Forum post URLs in embeddings.json contain "** " prefix that breaks external links when clicking sources.',
    category: 'api',
    severity: 'high',
    status: 'fixed',
    component: 'Chat / Source Display',
    stepsToReproduce: '1. Ask a question in Chat\n2. Click on a source link\n3. Observe URL',
    expectedBehavior: 'Opens https://forum.langchain.com/t/123',
    actualBehavior: 'Opens http://localhost:3000/**%20https://forum.langchain.com/t/123',
    impactLevel: 'blocking',
    impactDescription: 'Cannot verify sources, critical for trust',
    suggestedFix: 'Sanitize URLs during embedding ingestion: url.replace(/^\\*\\*\\s*/, "")',
    createdAt: '2026-01-14T11:00:00Z',
    updatedAt: '2026-01-15T09:30:00Z',
  },
  {
    id: '3',
    title: 'Light theme has poor text contrast in chat messages',
    description: 'Assistant message text uses gray-200 color which is nearly invisible on white background in light theme.',
    category: 'ux',
    severity: 'high',
    status: 'fixed',
    component: 'Chat / ChatMessage',
    stepsToReproduce: '1. Switch to light theme\n2. Go to Chat\n3. View assistant responses',
    expectedBehavior: 'Text should be readable in both themes',
    actualBehavior: 'Text is barely visible in light theme',
    impactLevel: 'significant',
    impactDescription: 'Light theme unusable, forced to use dark',
    suggestedFix: 'Use text-gray-800 dark:text-gray-200 instead of fixed gray-200',
    createdAt: '2026-01-14T12:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '4',
    title: 'Dashboard Category Distribution shows NaN%',
    description: 'The pie chart legend in Dashboard shows "NaN%" for all categories instead of actual percentages.',
    category: 'ux',
    severity: 'medium',
    status: 'open',
    component: 'Dashboard / CategoryChart',
    stepsToReproduce: '1. Go to Dashboard\n2. Look at Category Distribution chart\n3. Check legend percentages',
    expectedBehavior: 'Should show "General (62.3%)" etc.',
    actualBehavior: 'Shows "General (NaN%)" for all items',
    impactLevel: 'moderate',
    impactDescription: 'Dashboard looks broken, reduces confidence',
    suggestedFix: 'Add null check in percentage calculation: `((value / total) * 100 || 0).toFixed(1)`',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-01-15T08:00:00Z',
  },
  {
    id: '5',
    title: 'RAG Performance metrics are mock data, not real',
    description: 'The RAG Performance tab in Dashboard shows hardcoded mock data instead of actual query metrics from the RAG system.',
    category: 'api',
    severity: 'low',
    status: 'acknowledged',
    component: 'Dashboard / RAG Performance',
    stepsToReproduce: '1. Go to Dashboard\n2. Click RAG Performance tab\n3. Notice all metrics are static',
    expectedBehavior: 'Metrics should reflect actual RAG query history',
    actualBehavior: 'Shows hardcoded values that never change',
    impactLevel: 'minimal',
    impactDescription: 'Demo still works, just not realistic',
    suggestedFix: 'Connect to backend /api/evaluation endpoint to fetch real LangSmith run data',
    relatedDocs: 'https://docs.smith.langchain.com/reference/api',
    createdAt: '2026-01-15T08:30:00Z',
    updatedAt: '2026-01-15T08:30:00Z',
  },
  {
    id: '6',
    title: 'LangSmith run filtering returns stale data',
    description: 'When fetching recent runs from LangSmith API, the SDK returns cached data even after new queries are executed.',
    category: 'api',
    severity: 'medium',
    status: 'open',
    component: 'Evaluation / LangSmith Client',
    stepsToReproduce: '1. Run a RAG query\n2. Immediately check Evaluation page\n3. New run not visible for 30-60 seconds',
    expectedBehavior: 'New runs should appear within 5 seconds',
    actualBehavior: 'Runs appear after 30-60 second delay',
    traceUrl: 'https://smith.langchain.com/public/langchain-forum-rag',
    impactLevel: 'moderate',
    impactDescription: 'Hard to verify evaluation during demo',
    suggestedFix: 'Add cache-busting timestamp parameter or use polling with shorter interval',
    relatedDocs: 'https://docs.smith.langchain.com/reference/typescript-sdk',
    createdAt: '2026-01-15T11:00:00Z',
    updatedAt: '2026-01-15T11:00:00Z',
  },
  {
    id: '7',
    title: 'Evaluation metric interpretation unclear',
    description: 'LangSmith evaluation shows faithfulness: 0.85 but documentation does not explain if this is good, acceptable, or needs improvement.',
    category: 'documentation',
    severity: 'medium',
    status: 'open',
    component: 'Evaluation / LangSmith Results',
    stepsToReproduce: '1. Go to Evaluation page\n2. View LangSmith Results tab\n3. See metric scores without context',
    expectedBehavior: 'Should show benchmarks or color coding (green/yellow/red)',
    actualBehavior: 'Raw numbers without interpretation guidance',
    impactLevel: 'significant',
    impactDescription: 'Cannot assess if RAG is performing well',
    suggestedFix: 'Add threshold indicators: <0.7 red, 0.7-0.9 yellow, >0.9 green. Include tooltip explaining metric.',
    relatedDocs: 'https://docs.smith.langchain.com/evaluation/concepts#evaluators',
    createdAt: '2026-01-15T12:00:00Z',
    updatedAt: '2026-01-15T12:00:00Z',
  },
  // ============================================================================
  // Real LangChain GitHub Issues (for interview demonstration)
  // ============================================================================
  {
    id: '8',
    title: 'LCEL with_fallbacks breaks streaming completely',
    description: 'When using .with_fallbacks() on an LCEL chain, streaming functionality stops working entirely. Instead of token-by-token responses, the entire response arrives at once.',
    category: 'api',
    severity: 'high',
    status: 'open',
    component: 'LCEL / RunnableWithFallbacks',
    stepsToReproduce: '1. Create LCEL chain: chain = prompt | llm | StrOutputParser()\n2. Add fallback: chain.with_fallbacks([fallback_chain])\n3. Call chain.stream({...})\n4. Observe response arrives all at once',
    expectedBehavior: 'Streaming should work with fallbacks configured',
    actualBehavior: 'All tokens arrive at once, no streaming',
    impactLevel: 'significant',
    impactDescription: 'Must choose between error handling and streaming UX',
    suggestedFix: 'Use application-level try-except instead of LCEL fallbacks, or implement custom RunnableWithFallbacks that preserves streaming',
    relatedDocs: 'https://github.com/langchain-ai/langchain/issues/15191',
    createdAt: '2026-01-15T14:00:00Z',
    updatedAt: '2026-01-15T14:00:00Z',
  },
  {
    id: '9',
    title: 'RunnableLambda routing breaks streaming',
    description: 'When using RunnableLambda for dynamic routing between Runnables, streaming breaks even though individual Runnables stream correctly in isolation.',
    category: 'api',
    severity: 'high',
    status: 'open',
    component: 'LCEL / RunnableLambda',
    stepsToReproduce: '1. Create two streaming Runnables\n2. Build router: def route(info): return r1 if condition else r2\n3. Compose: chain = router | RunnableLambda(route)\n4. Call chain.stream() - no streaming',
    expectedBehavior: 'Router should preserve streaming from underlying Runnables',
    actualBehavior: 'Complete response arrives at once',
    impactLevel: 'blocking',
    impactDescription: 'Agent routing patterns unusable with streaming',
    suggestedFix: 'Use StreamingRunnableLambda from PR #14794 or manually implement _stream() method',
    relatedDocs: 'https://github.com/langchain-ai/langchain/issues/11998',
    createdAt: '2026-01-15T14:30:00Z',
    updatedAt: '2026-01-15T14:30:00Z',
  },
  {
    id: '10',
    title: 'LangSmith tracing fails on AWS Lambda with "Message too long"',
    description: 'When deploying LangChain to AWS Lambda with LangSmith tracing enabled, traces fail to export with UDP message size errors. Complex chain traces exceed the 65KB UDP limit.',
    category: 'api',
    severity: 'critical',
    status: 'open',
    component: 'LangSmith / OpenTelemetry',
    stepsToReproduce: '1. Deploy LangChain app to AWS Lambda\n2. Enable LANGSMITH_TRACING_V2=true\n3. Execute complex RAG chain\n4. Error: [Errno 90] Message too long',
    expectedBehavior: 'Traces should export cleanly in serverless environments',
    actualBehavior: 'Traces fail with UDP size limit errors',
    impactLevel: 'blocking',
    impactDescription: 'Cannot use LangSmith observability in serverless',
    suggestedFix: 'Use wrapt module to manually patch Runnable methods, or disable LangSmith in Lambda and use AWS X-Ray instead',
    relatedDocs: 'https://github.com/langchain-ai/langsmith-sdk/issues/1755',
    createdAt: '2026-01-15T15:00:00Z',
    updatedAt: '2026-01-15T15:00:00Z',
  },
  {
    id: '11',
    title: 'SelfQueryRetriever not supported with new PineconeVectorStore',
    description: 'Official docs show SelfQueryRetriever with langchain_pinecone.PineconeVectorStore, but it throws ValueError stating the vector store type is not supported.',
    category: 'documentation',
    severity: 'medium',
    status: 'acknowledged',
    component: 'Retrievers / SelfQueryRetriever',
    stepsToReproduce: '1. from langchain_pinecone import PineconeVectorStore\n2. Create vectorstore from documents\n3. SelfQueryRetriever.from_llm(llm, vectorstore, ...)\n4. ValueError: not supported',
    expectedBehavior: 'Should work with new modular package imports',
    actualBehavior: 'Only works with legacy import: from langchain.vectorstores import Pinecone',
    impactLevel: 'significant',
    impactDescription: 'Documentation-code mismatch causes confusion, blocks package migration',
    suggestedFix: 'Use legacy import: from langchain.vectorstores import Pinecone. Issue closed as "not planned"',
    relatedDocs: 'https://github.com/langchain-ai/langchain/issues/19418',
    createdAt: '2026-01-15T15:30:00Z',
    updatedAt: '2026-01-15T15:30:00Z',
  },
  {
    id: '12',
    title: 'LangGraph nodes with multiple edges execute multiple times',
    description: 'In LangGraph StateGraph, nodes with multiple incoming edges execute once per edge instead of once when any edge completes. This differs from traditional OR-join workflow semantics.',
    category: 'api',
    severity: 'medium',
    status: 'open',
    component: 'LangGraph / StateGraph',
    stepsToReproduce: '1. Create StateGraph with node5 receiving edges from node3 and node6\n2. graph.add_edge("node3", "node5")\n3. graph.add_edge("node6", "node5")\n4. Execute graph - node5 runs twice',
    expectedBehavior: 'Node should execute once when first incoming edge completes (OR-join)',
    actualBehavior: 'Node executes in separate super-steps for each incoming edge',
    impactLevel: 'moderate',
    impactDescription: 'Causes duplicate API calls, wasted LLM tokens, counter-intuitive behavior',
    suggestedFix: 'Use defer=True parameter: graph.add_node("node5", node5, defer=True) to wait for all incoming edges',
    relatedDocs: 'https://github.com/langchain-ai/langgraph/issues/6406',
    createdAt: '2026-01-15T16:00:00Z',
    updatedAt: '2026-01-15T16:00:00Z',
  },
]

// ============================================================================
// Store Functions
// ============================================================================

export function getFrictionLogs(): FrictionLogEntry[] {
  if (typeof window === 'undefined') {
    return initialEntries
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    // Initialize with default entries
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEntries))
    return initialEntries
  }

  try {
    return JSON.parse(stored) as FrictionLogEntry[]
  } catch {
    return initialEntries
  }
}

export function saveFrictionLogs(entries: FrictionLogEntry[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function addFrictionLog(
  entry: Omit<FrictionLogEntry, 'id' | 'createdAt' | 'updatedAt'>
): FrictionLogEntry {
  const entries = getFrictionLogs()
  const newEntry: FrictionLogEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  entries.unshift(newEntry)
  saveFrictionLogs(entries)
  return newEntry
}

export function updateFrictionLog(
  id: string,
  updates: Partial<Omit<FrictionLogEntry, 'id' | 'createdAt'>>
): FrictionLogEntry | null {
  const entries = getFrictionLogs()
  const index = entries.findIndex((e) => e.id === id)
  if (index === -1) return null

  entries[index] = {
    ...entries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  saveFrictionLogs(entries)
  return entries[index]
}

export function deleteFrictionLog(id: string): boolean {
  const entries = getFrictionLogs()
  const filtered = entries.filter((e) => e.id !== id)
  if (filtered.length === entries.length) return false
  saveFrictionLogs(filtered)
  return true
}

// ============================================================================
// Helper Functions
// ============================================================================

export function getSeverityColor(severity: FrictionSeverity): string {
  switch (severity) {
    case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/30'
    case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/30'
    case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
    case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/30'
  }
}

export function getStatusColor(status: FrictionStatus): string {
  switch (status) {
    case 'open': return 'text-red-500 bg-red-500/10 border-red-500/30'
    case 'acknowledged': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
    case 'fixed': return 'text-green-500 bg-green-500/10 border-green-500/30'
    case 'wont-fix': return 'text-gray-500 bg-gray-500/10 border-gray-500/30'
  }
}

export function getCategoryLabel(category: FrictionCategory): string {
  switch (category) {
    case 'ux': return 'UX/UI'
    case 'documentation': return 'Documentation'
    case 'api': return 'API/Data'
    case 'performance': return 'Performance'
    case 'error-handling': return 'Error Handling'
    case 'other': return 'Other'
  }
}

export function getImpactColor(impact: ImpactLevel): string {
  switch (impact) {
    case 'blocking': return 'text-red-600 bg-red-500/10 border-red-500/30'
    case 'significant': return 'text-orange-500 bg-orange-500/10 border-orange-500/30'
    case 'moderate': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
    case 'minimal': return 'text-green-500 bg-green-500/10 border-green-500/30'
  }
}

// ============================================================================
// Export Functions
// ============================================================================

export function exportToMarkdown(entries: FrictionLogEntry[]): string {
  const now = new Date().toISOString().split('T')[0]
  let md = `# Friction Log Report\n\n`
  md += `**Generated:** ${now}\n`
  md += `**Total Entries:** ${entries.length}\n\n`

  // Summary by status
  const statusCounts = {
    open: entries.filter(e => e.status === 'open').length,
    acknowledged: entries.filter(e => e.status === 'acknowledged').length,
    fixed: entries.filter(e => e.status === 'fixed').length,
    'wont-fix': entries.filter(e => e.status === 'wont-fix').length,
  }
  md += `## Summary\n\n`
  md += `| Status | Count |\n|--------|-------|\n`
  md += `| Open | ${statusCounts.open} |\n`
  md += `| Acknowledged | ${statusCounts.acknowledged} |\n`
  md += `| Fixed | ${statusCounts.fixed} |\n`
  md += `| Won't Fix | ${statusCounts['wont-fix']} |\n\n`

  // Entries by severity
  const severities: Array<'critical' | 'high' | 'medium' | 'low'> = ['critical', 'high', 'medium', 'low']

  for (const severity of severities) {
    const severityEntries = entries.filter(e => e.severity === severity)
    if (severityEntries.length === 0) continue

    md += `## ${severity.charAt(0).toUpperCase() + severity.slice(1)} Priority\n\n`

    for (const entry of severityEntries) {
      md += `### ${entry.title}\n\n`
      md += `- **Status:** ${entry.status}\n`
      md += `- **Category:** ${getCategoryLabel(entry.category)}\n`
      md += `- **Component:** ${entry.component}\n`
      if (entry.impactLevel) {
        md += `- **Impact:** ${entry.impactLevel}${entry.impactDescription ? ` - ${entry.impactDescription}` : ''}\n`
      }
      md += `\n${entry.description}\n\n`

      if (entry.stepsToReproduce) {
        md += `**Steps to Reproduce:**\n\`\`\`\n${entry.stepsToReproduce}\n\`\`\`\n\n`
      }

      if (entry.expectedBehavior) {
        md += `**Expected:** ${entry.expectedBehavior}\n\n`
      }

      if (entry.actualBehavior) {
        md += `**Actual:** ${entry.actualBehavior}\n\n`
      }

      if (entry.suggestedFix) {
        md += `**Suggested Fix:** ${entry.suggestedFix}\n\n`
      }

      if (entry.traceUrl) {
        md += `**LangSmith Trace:** [View Trace](${entry.traceUrl})\n\n`
      }

      if (entry.relatedDocs) {
        md += `**Related Docs:** [Documentation](${entry.relatedDocs})\n\n`
      }

      md += `---\n\n`
    }
  }

  return md
}
