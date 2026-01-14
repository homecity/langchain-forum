import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChatMessage as ChatMessageType, ChatSource, ChatTrace } from "@/lib/mock-data"
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Circle,
  AlertCircle,
  XCircle
} from "lucide-react"

// Helper function to clean URL (remove "** " prefix from forum data)
function cleanUrl(url: string): string {
  return url.replace(/^\*\*\s*/, '').trim()
}

export interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`max-w-[80%] ${isUser ? "max-w-[70%]" : ""}`}>
        {/* Message Bubble */}
        {isUser ? (
          // User Message - Dark green in light mode, purple in dark mode
          <div className="rounded-2xl bg-[#1D3D3C] px-6 py-4 text-white dark:bg-[#BFB4FD] dark:text-[#1D3D3C]">
            <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        ) : (
          // Assistant Message - Dark Card
          <Card variant="dark-gradient" className="px-6 py-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-200">
                {message.content}
              </p>
            </div>

            {/* Sources */}
            {message.sources && message.sources.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="font-mono text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Sources:
                </p>
                <div className="flex flex-wrap gap-2">
                  {message.sources.map((source, index) => (
                    <SourceBadge key={`${source.id}-${index}`} source={source} />
                  ))}
                </div>
              </div>
            )}

            {/* Trace Timeline */}
            {message.trace && (
              <div className="mt-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="trace" className="border-none">
                    <AccordionTrigger className="py-2 font-mono text-xs text-[#4d65ff] hover:no-underline">
                      🔍 View Trace Details ({message.trace.totalDuration}s)
                    </AccordionTrigger>
                    <AccordionContent>
                      <TraceTimeline trace={message.trace} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </Card>
        )}

        {/* Timestamp */}
        <p className={`mt-2 font-mono text-xs text-gray-500 ${isUser ? "text-right" : "text-left"}`}>
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

// Relevance level configuration
type RelevanceLevel = {
  level: number
  label: string
  description: string
  icon: React.ReactNode
  bg: string
  text: string
  border: string
  barColor: string
}

function getRelevanceLevel(score: number): RelevanceLevel {
  if (score >= 0.6) {
    return {
      level: 5,
      label: "Highly Relevant",
      description: "Strong match",
      icon: <Sparkles className="h-3.5 w-3.5" />,
      bg: "bg-emerald-500/20",
      text: "text-emerald-400",
      border: "border-emerald-500/50",
      barColor: "bg-emerald-500",
    }
  }
  if (score >= 0.5) {
    return {
      level: 4,
      label: "Relevant",
      description: "Good match",
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      bg: "bg-green-500/20",
      text: "text-green-400",
      border: "border-green-500/50",
      barColor: "bg-green-500",
    }
  }
  if (score >= 0.4) {
    return {
      level: 3,
      label: "Partial",
      description: "Some relevance",
      icon: <Circle className="h-3.5 w-3.5" />,
      bg: "bg-yellow-500/20",
      text: "text-yellow-400",
      border: "border-yellow-500/50",
      barColor: "bg-yellow-500",
    }
  }
  if (score >= 0.3) {
    return {
      level: 2,
      label: "Low",
      description: "Weak match",
      icon: <AlertCircle className="h-3.5 w-3.5" />,
      bg: "bg-orange-500/20",
      text: "text-orange-400",
      border: "border-orange-500/50",
      barColor: "bg-orange-500",
    }
  }
  return {
    level: 1,
    label: "Minimal",
    description: "Poor match",
    icon: <XCircle className="h-3.5 w-3.5" />,
    bg: "bg-red-500/20",
    text: "text-red-400",
    border: "border-red-500/50",
    barColor: "bg-red-500",
  }
}

function SourceBadge({ source }: { source: ChatSource }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [showTooltip, setShowTooltip] = React.useState(false)
  const [showRelevanceTooltip, setShowRelevanceTooltip] = React.useState(false)

  const relevance = getRelevanceLevel(source.relevanceScore)

  return (
    <div className="group relative">
      {/* Main Badge Container */}
      <div className="flex flex-col gap-2">
        {/* Badge Header */}
        <div className="flex items-center gap-2">
          {/* Source Title Badge */}
          <button
            onClick={() => window.open(cleanUrl(source.url), '_blank')}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative inline-flex items-center gap-2 rounded-lg border border-[#BFB4FD]/30 bg-[#BFB4FD]/5 px-3 py-1.5 text-[#BFB4FD] transition-all hover:border-[#BFB4FD] hover:bg-[#BFB4FD]/10 hover:shadow-lg hover:shadow-[#BFB4FD]/20 dark:text-[#BFB4FD] text-purple-600"
          >
            <span className="font-mono text-xs">🔗 {source.title}</span>
            <ExternalLink className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100" />

            {/* URL Tooltip */}
            {showTooltip && (
              <div className="absolute bottom-full left-0 mb-2 z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg border border-gray-700 max-w-xs">
                  <p className="font-mono break-all">{cleanUrl(source.url)}</p>
                  <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}
          </button>

          {/* Relevance Level Badge */}
          <div
            className="relative"
            onMouseEnter={() => setShowRelevanceTooltip(true)}
            onMouseLeave={() => setShowRelevanceTooltip(false)}
          >
            <div
              className={`inline-flex items-center gap-1.5 rounded-lg border ${relevance.border} ${relevance.bg} px-2.5 py-1 transition-all animate-in fade-in slide-in-from-left duration-300 delay-100 cursor-help`}
            >
              <span className={relevance.text}>{relevance.icon}</span>
              <span className={`font-mono text-xs font-semibold ${relevance.text}`}>
                {relevance.label}
              </span>
              {/* Mini bar indicator */}
              <div className="flex gap-0.5 ml-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-1 h-3 rounded-sm transition-all ${
                      i <= relevance.level ? relevance.barColor : "bg-gray-600/30"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Relevance Tooltip */}
            {showRelevanceTooltip && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="rounded-lg bg-gray-900 px-4 py-3 text-xs text-white shadow-xl border border-gray-700 min-w-[200px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-semibold">{relevance.description}</span>
                    <span className={`font-mono font-bold ${relevance.text}`}>
                      {Math.round(source.relevanceScore * 100)}%
                    </span>
                  </div>
                  <div className="space-y-1 text-[10px] text-gray-400">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3 w-3 text-emerald-400" />
                      <span>60%+ Highly Relevant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-400" />
                      <span>50-60% Relevant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Circle className="h-3 w-3 text-yellow-400" />
                      <span>40-50% Partial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-3 w-3 text-orange-400" />
                      <span>30-40% Low</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-3 w-3 text-red-400" />
                      <span>&lt;30% Minimal</span>
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            )}
          </div>

          {/* Expand Button */}
          {source.snippet && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center justify-center h-7 w-7 rounded-lg border border-gray-600/30 bg-gray-800/30 text-gray-400 transition-all hover:border-gray-500 hover:bg-gray-800/50 hover:text-gray-300"
            >
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && source.snippet && (
          <div className="animate-in slide-in-from-top duration-300">
            <Card variant="dark-gradient" className="p-4 space-y-3">
              {/* Snippet */}
              <div>
                <p className="font-mono text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Preview:
                </p>
                <p className="font-mono text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                  {source.snippet}
                </p>
              </div>

              {/* Tags (if available) */}
              {source.tags && source.tags.length > 0 && (
                <div>
                  <p className="font-mono text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                    Tags:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {source.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-[#BFB4FD]/20 bg-[#BFB4FD]/5 text-[#BFB4FD] font-mono text-[10px] px-2 py-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* View Original Button */}
              <button
                onClick={() => window.open(cleanUrl(source.url), '_blank')}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#BFB4FD]/30 bg-[#BFB4FD]/10 px-4 py-2 text-[#BFB4FD] font-mono text-xs font-semibold transition-all hover:border-[#BFB4FD] hover:bg-[#BFB4FD] hover:text-white hover:shadow-lg hover:shadow-[#BFB4FD]/20"
              >
                <span>View Original</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

function TraceTimeline({ trace }: { trace: ChatTrace }) {
  const allSteps = [
    { name: "Embedding", duration: trace.embeddingDuration, color: "#BFB4FD" },
    { name: "Retrieval", duration: trace.retrievalDuration, color: "#2D7A78" },
    ...(trace.rerankingDuration !== undefined
      ? [{ name: "Reranking", duration: trace.rerankingDuration, color: "#BFB4FD" }]
      : []),
    { name: "Generation", duration: trace.generationDuration, color: "#2D7A78" },
  ]

  const maxDuration = Math.max(...allSteps.map((s) => s.duration))

  return (
    <div className="space-y-3 rounded-lg bg-gray-100 dark:bg-secondary/50 p-4">
      {allSteps.map((step, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-medium text-gray-700 dark:text-gray-300">{step.name}</span>
            <span className="font-mono text-xs text-gray-500">
              {step.duration}s
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-[#0a1628]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(step.duration / maxDuration) * 100}%`,
                backgroundColor: step.color,
              }}
            />
          </div>
        </div>
      ))}
      <div className="mt-4 flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-3">
        <span className="font-mono text-xs font-semibold text-gray-700 dark:text-gray-300">Total Duration</span>
        <span className="font-mono text-sm font-bold text-purple-600 dark:text-[#BFB4FD]">
          {trace.totalDuration}s
        </span>
      </div>
    </div>
  )
}
