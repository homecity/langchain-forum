/**
 * Friction Log Store
 * Client-side state management for friction log entries
 * Uses localStorage for persistence
 */

import { FrictionLogEntry, FrictionSeverity, FrictionCategory, FrictionStatus } from './types'

const STORAGE_KEY = 'langchain-friction-log'

// ============================================================================
// Initial Friction Log Entries (Pre-populated from development)
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
    createdAt: '2026-01-15T08:30:00Z',
    updatedAt: '2026-01-15T08:30:00Z',
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
