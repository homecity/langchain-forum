import * as React from "react"
import { Card } from "@/components/ui/card"

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6">
      <Card className="border-l-4 border-langchain-purple bg-white px-6 py-4 shadow-sm dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-muted-foreground">Thinking</span>
          <div className="flex gap-1">
            <div
              className="h-2 w-2 rounded-full bg-langchain-purple animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "1s" }}
            />
            <div
              className="h-2 w-2 rounded-full bg-langchain-purple animate-bounce"
              style={{ animationDelay: "150ms", animationDuration: "1s" }}
            />
            <div
              className="h-2 w-2 rounded-full bg-langchain-purple animate-bounce"
              style={{ animationDelay: "300ms", animationDuration: "1s" }}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
