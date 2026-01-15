"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ExternalLink,
  Copy,
  MessageSquare,
  Loader2,
  Lightbulb,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { useRouter } from "next/navigation"

// ============================================================================
// Types
// ============================================================================

export interface ExtendedActivityItem {
  id: string
  type: "issue_opened" | "issue_resolved" | "comment_added"
  title: string
  timestamp: string
  user: string
  url: string
  content?: string
  tags?: string[]
}

interface RecommendedSolution {
  id: string
  title: string
  snippet: string
  relevanceScore: number
  url?: string
}

interface ActivityDetailModalProps {
  activity: ExtendedActivityItem | null
  isOpen: boolean
  onClose: () => void
}

// ============================================================================
// Component
// ============================================================================

export function ActivityDetailModal({
  activity,
  isOpen,
  onClose,
}: ActivityDetailModalProps) {
  const router = useRouter()
  const [isLoadingRecommendations, setIsLoadingRecommendations] = React.useState(false)
  const [recommendations, setRecommendations] = React.useState<RecommendedSolution[]>([])
  const [showRecommendations, setShowRecommendations] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [feedback, setFeedback] = React.useState<Record<string, "up" | "down">>({})

  // Reset state when modal closes or activity changes
  React.useEffect(() => {
    if (!isOpen) {
      setShowRecommendations(false)
      setRecommendations([])
    }
  }, [isOpen])

  const fetchRecommendations = async (query: string) => {
    setIsLoadingRecommendations(true)
    setRecommendations([])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `Find similar issues and solutions for: ${query}`,
          returnSourcesOnly: true,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Transform sources to recommendations
        const recs: RecommendedSolution[] = (data.sources || []).slice(0, 5).map(
          (source: { id: string; title: string; snippet: string; relevanceScore: number; url?: string }) => ({
            id: source.id,
            title: source.title,
            snippet: source.snippet,
            relevanceScore: source.relevanceScore,
            url: source.url,
          })
        )
        setRecommendations(recs)
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error)
    } finally {
      setIsLoadingRecommendations(false)
    }
  }

  const handleCopyContent = async () => {
    if (!activity) return
    const text = `${activity.title}\n\n${activity.content || ""}\n\nSource: ${activity.url}`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenForum = () => {
    if (activity?.url) {
      window.open(activity.url, "_blank", "noopener,noreferrer")
    }
  }

  const handleAskInChat = () => {
    if (!activity) return
    // Navigate to chat with pre-filled query
    const query = encodeURIComponent(`Help me understand this issue: ${activity.title}`)
    router.push(`/chat?q=${query}`)
    onClose()
  }

  const handleFeedback = (recId: string, type: "up" | "down") => {
    setFeedback((prev) => ({ ...prev, [recId]: type }))
    // Could send feedback to backend for learning
  }

  const handleFindSimilarIssues = () => {
    if (!activity) return
    setShowRecommendations(true)
    fetchRecommendations(activity.title)
  }

  if (!activity) return null

  const statusConfig = {
    issue_opened: {
      icon: <AlertCircle className="h-5 w-5" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      label: "Open Issue",
    },
    issue_resolved: {
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      label: "Resolved",
    },
    comment_added: {
      icon: <MessageSquare className="h-5 w-5" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      label: "Comment",
    },
  }

  const status = statusConfig[activity.type]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${status.bgColor} ${status.color}`}>
              {status.icon}
            </div>
            <div className="flex-1">
              <DialogTitle className="font-mono text-xl leading-tight">
                {activity.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground font-mono">
                <Clock className="h-4 w-4" />
                <span>{activity.timestamp}</span>
                <span>•</span>
                <span>{activity.user}</span>
                <Badge
                  variant="outline"
                  className={`ml-2 ${status.color} border-current`}
                >
                  {status.label}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Post Content */}
        <div className="mt-6 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-mono">
                <FileText className="h-4 w-4" />
                Issue Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Issue Summary */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`ml-2 font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Posted:</span>
                    <span className="ml-2 font-medium">{activity.timestamp}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Author:</span>
                    <span className="ml-2 font-medium">{activity.user}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Source:</span>
                    <a
                      href={activity.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-purple-500 hover:underline inline-flex items-center gap-1"
                    >
                      Forum Post
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Content Preview */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Content Preview</h4>
                <div className="prose prose-sm dark:prose-invert max-w-none font-mono bg-muted/30 rounded-lg p-4">
                  {activity.content ? (
                    <p className="whitespace-pre-wrap text-foreground/80 text-sm leading-relaxed">
                      {activity.content}
                    </p>
                  ) : (
                    <p className="text-muted-foreground italic text-sm">
                      Content preview not available. Click &quot;Open in Forum&quot; to view the full discussion.
                    </p>
                  )}
                </div>
              </div>

              {/* Forum Link Notice */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-mono">
                  <span className="font-semibold">Tip:</span> For the complete discussion including all replies and solutions,
                  click &quot;Open in Forum&quot; below to view the original thread.
                </p>
              </div>

              {/* Tags */}
              {activity.tags && activity.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <span className="text-sm text-muted-foreground mr-2">Tags:</span>
                  {activity.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-mono">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyContent}
              className="font-mono"
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenForum}
              className="font-mono"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open in Forum
            </Button>
            <Button
              size="sm"
              onClick={handleAskInChat}
              className="font-mono bg-purple-500 hover:bg-purple-600 text-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask in Chat
            </Button>
          </div>

          {/* RAG Recommendations */}
          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-transparent">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base font-mono">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>Recommended Solutions</span>
                    <Badge variant="outline" className="ml-2 text-purple-500 border-purple-500/30">
                      RAG-Powered
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground font-mono mt-1">
                    Find similar issues and solutions from our knowledge base
                  </p>
                </div>
                {!showRecommendations && (
                  <Button
                    onClick={handleFindSimilarIssues}
                    className="font-mono bg-purple-500 hover:bg-purple-600 text-white"
                    size="sm"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Find Similar Issues
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!showRecommendations ? (
                <div className="text-center py-8 text-muted-foreground font-mono">
                  <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Click &quot;Find Similar Issues&quot; to search our knowledge base</p>
                  <p className="text-sm mt-1">Uses RAG to find related forum posts and documentation</p>
                </div>
              ) : isLoadingRecommendations ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
                  <span className="ml-2 font-mono text-muted-foreground">
                    Searching knowledge base...
                  </span>
                </div>
              ) : recommendations.length > 0 ? (
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div
                      key={rec.id}
                      className="group p-4 rounded-lg border border-border/50 bg-card hover:border-purple-500/30 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/10 text-purple-500 text-xs font-bold">
                              {index + 1}
                            </span>
                            <h4 className="font-mono font-semibold text-sm group-hover:text-purple-500 transition-colors">
                              {rec.title}
                            </h4>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground font-mono line-clamp-2">
                            {rec.snippet}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                rec.relevanceScore >= 0.8
                                  ? "text-green-500 border-green-500/30"
                                  : rec.relevanceScore >= 0.6
                                  ? "text-yellow-500 border-yellow-500/30"
                                  : "text-gray-500 border-gray-500/30"
                              }`}
                            >
                              {(rec.relevanceScore * 100).toFixed(0)}% match
                            </Badge>
                            {rec.url && (
                              <a
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-purple-500 hover:underline font-mono flex items-center gap-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                                View Source
                              </a>
                            )}
                          </div>
                        </div>
                        {/* Feedback buttons */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleFeedback(rec.id, "up")}
                            className={`p-1.5 rounded hover:bg-green-500/10 transition-colors ${
                              feedback[rec.id] === "up"
                                ? "text-green-500 bg-green-500/10"
                                : "text-muted-foreground"
                            }`}
                            title="Helpful"
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleFeedback(rec.id, "down")}
                            className={`p-1.5 rounded hover:bg-red-500/10 transition-colors ${
                              feedback[rec.id] === "down"
                                ? "text-red-500 bg-red-500/10"
                                : "text-muted-foreground"
                            }`}
                            title="Not helpful"
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground font-mono">
                  <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No similar issues found in the knowledge base.</p>
                  <p className="text-sm mt-1">Try asking in Chat for more help.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
