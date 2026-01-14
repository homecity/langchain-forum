"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LangSmithResults } from "@/components/evaluation/langsmith-results"
import { FrictionLog } from "@/components/evaluation/friction-log"
import { RAGMetricsLive } from "@/components/evaluation/rag-metrics-live"
import { FlaskConical, AlertTriangle, Activity } from "lucide-react"

export default function EvaluationPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-mono text-4xl font-bold text-foreground">
            Evaluation
          </h1>
          <p className="font-mono text-foreground/70">
            LangSmith evaluations, friction log, and RAG performance metrics
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="langsmith" className="space-y-6">
          <TabsList className="bg-secondary/50 backdrop-blur-sm border border-border">
            <TabsTrigger value="langsmith" className="font-mono flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              <span className="hidden sm:inline">LangSmith</span> Results
            </TabsTrigger>
            <TabsTrigger value="friction" className="font-mono flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Friction Log
            </TabsTrigger>
            <TabsTrigger value="rag" className="font-mono flex items-center gap-2">
              <Activity className="h-4 w-4" />
              RAG Metrics
            </TabsTrigger>
          </TabsList>

          {/* LangSmith Results Tab */}
          <TabsContent value="langsmith" className="space-y-6">
            <LangSmithResults />
          </TabsContent>

          {/* Friction Log Tab */}
          <TabsContent value="friction" className="space-y-6">
            <FrictionLog />
          </TabsContent>

          {/* RAG Performance Tab */}
          <TabsContent value="rag" className="space-y-6">
            <RAGMetricsLive />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
