"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  getFrictionLogs,
  addFrictionLog,
  updateFrictionLog,
  deleteFrictionLog,
  getSeverityColor,
  getStatusColor,
  getCategoryLabel,
  getImpactColor,
  exportToMarkdown,
} from "@/lib/evaluation/friction-log-store"
import {
  FrictionLogEntry,
  FrictionSeverity,
  FrictionCategory,
  FrictionStatus,
  ImpactLevel,
} from "@/lib/evaluation/types"
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Download,
  ExternalLink,
  Lightbulb,
  Zap,
  BookOpen,
} from "lucide-react"

export function FrictionLog() {
  const [entries, setEntries] = React.useState<FrictionLogEntry[]>([])
  const [expandedId, setExpandedId] = React.useState<string | null>(null)
  const [isAddingNew, setIsAddingNew] = React.useState(false)
  const [filter, setFilter] = React.useState<FrictionStatus | 'all'>('all')

  // Load entries on mount
  React.useEffect(() => {
    setEntries(getFrictionLogs())
  }, [])

  const filteredEntries = filter === 'all'
    ? entries
    : entries.filter((e) => e.status === filter)

  const statusCounts = {
    all: entries.length,
    open: entries.filter((e) => e.status === 'open').length,
    acknowledged: entries.filter((e) => e.status === 'acknowledged').length,
    fixed: entries.filter((e) => e.status === 'fixed').length,
  }

  const handleAdd = (entry: Omit<FrictionLogEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntry = addFrictionLog(entry)
    setEntries([newEntry, ...entries])
    setIsAddingNew(false)
  }

  const handleStatusChange = (id: string, status: FrictionStatus) => {
    const updated = updateFrictionLog(id, { status })
    if (updated) {
      setEntries(entries.map((e) => (e.id === id ? updated : e)))
    }
  }

  const handleDelete = (id: string) => {
    if (deleteFrictionLog(id)) {
      setEntries(entries.filter((e) => e.id !== id))
    }
  }

  const handleExport = () => {
    const markdown = exportToMarkdown(entries)
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `friction-log-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header with Filter */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <FilterButton
            label="All"
            count={statusCounts.all}
            isActive={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterButton
            label="Open"
            count={statusCounts.open}
            isActive={filter === 'open'}
            onClick={() => setFilter('open')}
          />
          <FilterButton
            label="Acknowledged"
            count={statusCounts.acknowledged}
            isActive={filter === 'acknowledged'}
            onClick={() => setFilter('acknowledged')}
          />
          <FilterButton
            label="Fixed"
            count={statusCounts.fixed}
            isActive={filter === 'fixed'}
            onClick={() => setFilter('fixed')}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleExport}
            variant="outline"
            className="font-mono"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() => setIsAddingNew(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Add New Form */}
      {isAddingNew && (
        <AddFrictionForm
          onSubmit={handleAdd}
          onCancel={() => setIsAddingNew(false)}
        />
      )}

      {/* Entries List */}
      <div className="space-y-3">
        {filteredEntries.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="font-mono text-muted-foreground">
                {filter === 'all'
                  ? 'No friction log entries yet'
                  : `No ${filter} entries`}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <FrictionEntryCard
              key={entry.id}
              entry={entry}
              isExpanded={expandedId === entry.id}
              onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              onStatusChange={(status) => handleStatusChange(entry.id, status)}
              onDelete={() => handleDelete(entry.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Sub-components
// ============================================================================

function FilterButton({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string
  count: number
  isActive: boolean
  onClick: () => void
}) {
  const baseClass = "px-3 py-1.5 rounded-lg font-mono text-sm transition-colors"
  const activeClass = isActive
    ? "bg-purple-500 text-white"
    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"

  return (
    <button onClick={onClick} className={`${baseClass} ${activeClass}`}>
      {label} ({count})
    </button>
  )
}

function FrictionEntryCard({
  entry,
  isExpanded,
  onToggle,
  onStatusChange,
  onDelete,
}: {
  entry: FrictionLogEntry
  isExpanded: boolean
  onToggle: () => void
  onStatusChange: (status: FrictionStatus) => void
  onDelete: () => void
}) {
  const severityIcon = {
    critical: <XCircle className="h-4 w-4" />,
    high: <AlertTriangle className="h-4 w-4" />,
    medium: <Clock className="h-4 w-4" />,
    low: <CheckCircle2 className="h-4 w-4" />,
  }

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded ${getSeverityColor(entry.severity)}`}>
            {severityIcon[entry.severity]}
          </div>
          <div>
            <h3 className="font-mono font-semibold text-foreground">{entry.title}</h3>
            <p className="font-mono text-xs text-muted-foreground">
              {entry.component} • {getCategoryLabel(entry.category)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {entry.impactLevel && (
            <Badge variant="outline" className={`font-mono ${getImpactColor(entry.impactLevel)}`}>
              <Zap className="h-3 w-3 mr-1" />
              {entry.impactLevel}
            </Badge>
          )}
          <Badge variant="outline" className={`font-mono ${getStatusColor(entry.status)}`}>
            {entry.status}
          </Badge>
          <Badge variant="outline" className={`font-mono ${getSeverityColor(entry.severity)}`}>
            {entry.severity}
          </Badge>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/30 space-y-4">
          <div>
            <h4 className="font-mono text-xs font-semibold text-muted-foreground mb-1">
              Description
            </h4>
            <p className="font-mono text-sm text-foreground">{entry.description}</p>
          </div>

          {entry.stepsToReproduce && (
            <div>
              <h4 className="font-mono text-xs font-semibold text-muted-foreground mb-1">
                Steps to Reproduce
              </h4>
              <pre className="font-mono text-sm text-foreground whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-2 rounded">
                {entry.stepsToReproduce}
              </pre>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {entry.expectedBehavior && (
              <div>
                <h4 className="font-mono text-xs font-semibold text-green-500 mb-1">
                  Expected Behavior
                </h4>
                <p className="font-mono text-sm text-foreground">{entry.expectedBehavior}</p>
              </div>
            )}
            {entry.actualBehavior && (
              <div>
                <h4 className="font-mono text-xs font-semibold text-red-500 mb-1">
                  Actual Behavior
                </h4>
                <p className="font-mono text-sm text-foreground">{entry.actualBehavior}</p>
              </div>
            )}
          </div>

          {/* Impact Description */}
          {entry.impactDescription && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <Zap className="h-4 w-4 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-mono text-xs font-semibold text-orange-500 mb-1">
                  Developer Impact
                </h4>
                <p className="font-mono text-sm text-foreground">{entry.impactDescription}</p>
              </div>
            </div>
          )}

          {/* Suggested Fix */}
          {entry.suggestedFix && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
              <Lightbulb className="h-4 w-4 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-mono text-xs font-semibold text-green-500 mb-1">
                  Suggested Fix
                </h4>
                <p className="font-mono text-sm text-foreground">{entry.suggestedFix}</p>
              </div>
            </div>
          )}

          {/* Links (LangSmith Trace & Related Docs) */}
          {(entry.traceUrl || entry.relatedDocs) && (
            <div className="flex flex-wrap gap-3">
              {entry.traceUrl && (
                <a
                  href={entry.traceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-500 hover:bg-purple-500/20 transition-colors font-mono text-sm"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  LangSmith Trace
                </a>
              )}
              {entry.relatedDocs && (
                <a
                  href={entry.relatedDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-500 hover:bg-blue-500/20 transition-colors font-mono text-sm"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Related Docs
                </a>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">Status:</span>
              {(['open', 'acknowledged', 'fixed', 'wont-fix'] as FrictionStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(status)}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                    entry.status === status
                      ? getStatusColor(status)
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <button
              onClick={onDelete}
              className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            Created: {new Date(entry.createdAt).toLocaleString()} •
            Updated: {new Date(entry.updatedAt).toLocaleString()}
          </p>
        </div>
      )}
    </Card>
  )
}

function AddFrictionForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (entry: Omit<FrictionLogEntry, 'id' | 'createdAt' | 'updatedAt'>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    category: 'ux' as FrictionCategory,
    severity: 'medium' as FrictionSeverity,
    status: 'open' as FrictionStatus,
    component: '',
    stepsToReproduce: '',
    expectedBehavior: '',
    actualBehavior: '',
    // New fields for interview demo
    traceUrl: '',
    impactLevel: undefined as ImpactLevel | undefined,
    impactDescription: '',
    suggestedFix: '',
    relatedDocs: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.component) return
    onSubmit(formData)
  }

  return (
    <Card className="border-purple-500/50">
      <CardHeader>
        <CardTitle className="font-mono text-lg">New Friction Log Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
                placeholder="Brief issue title"
                required
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground">Component *</label>
              <input
                type="text"
                value={formData.component}
                onChange={(e) => setFormData({ ...formData, component: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
                placeholder="e.g., Chat / RAG Pipeline"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-xs text-muted-foreground">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
              rows={3}
              placeholder="Detailed description of the issue"
              required
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as FrictionCategory })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
              >
                <option value="ux">UX/UI</option>
                <option value="documentation">Documentation</option>
                <option value="api">API/Data</option>
                <option value="performance">Performance</option>
                <option value="error-handling">Error Handling</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground">Severity</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value as FrictionSeverity })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as FrictionStatus })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
              >
                <option value="open">Open</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="fixed">Fixed</option>
                <option value="wont-fix">Won&apos;t Fix</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-mono text-xs text-muted-foreground">Steps to Reproduce</label>
            <textarea
              value={formData.stepsToReproduce}
              onChange={(e) => setFormData({ ...formData, stepsToReproduce: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
              rows={2}
              placeholder="1. Go to...\n2. Click on..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground">Expected Behavior</label>
              <textarea
                value={formData.expectedBehavior}
                onChange={(e) => setFormData({ ...formData, expectedBehavior: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
                rows={2}
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground">Actual Behavior</label>
              <textarea
                value={formData.actualBehavior}
                onChange={(e) => setFormData({ ...formData, actualBehavior: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
                rows={2}
              />
            </div>
          </div>

          {/* New Fields: Impact & Suggested Fix */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="font-mono text-sm font-semibold text-muted-foreground mb-3">
              Impact & Resolution (Optional)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs text-muted-foreground">Impact Level</label>
                <select
                  value={formData.impactLevel || ''}
                  onChange={(e) => setFormData({ ...formData, impactLevel: e.target.value as ImpactLevel || undefined })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
                >
                  <option value="">Select impact...</option>
                  <option value="minimal">Minimal - Minor inconvenience</option>
                  <option value="moderate">Moderate - Slowed down work</option>
                  <option value="significant">Significant - Major blocker</option>
                  <option value="blocking">Blocking - Cannot proceed</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-xs text-muted-foreground">Impact Description</label>
                <input
                  type="text"
                  value={formData.impactDescription}
                  onChange={(e) => setFormData({ ...formData, impactDescription: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
                  placeholder="e.g., Blocked for 20 min"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="font-mono text-xs text-muted-foreground">Suggested Fix</label>
            <textarea
              value={formData.suggestedFix}
              onChange={(e) => setFormData({ ...formData, suggestedFix: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
              rows={2}
              placeholder="Proposed solution or workaround..."
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground">LangSmith Trace URL</label>
              <input
                type="url"
                value={formData.traceUrl}
                onChange={(e) => setFormData({ ...formData, traceUrl: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
                placeholder="https://smith.langchain.com/..."
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground">Related Docs URL</label>
              <input
                type="url"
                value={formData.relatedDocs}
                onChange={(e) => setFormData({ ...formData, relatedDocs: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
                placeholder="https://docs.langchain.com/..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white">
              Add Entry
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
