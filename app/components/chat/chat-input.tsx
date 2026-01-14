"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send, Paperclip, Mic } from "lucide-react"

export interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = React.useState("")

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-end gap-4">
          {/* Textarea */}
          <div className="relative flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about LangChain forum issues..."
              disabled={disabled}
              className="min-h-[60px] resize-none bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground font-mono text-sm focus:border-[#BFB4FD]/50 focus:ring-[#BFB4FD]/30"
              rows={2}
            />
            <div className="absolute right-3 top-3 flex gap-2">
              <Button
                variant="ghost-light"
                size="icon"
                className="h-6 w-6"
                disabled={disabled}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost-light"
                size="icon"
                className="h-6 w-6"
                disabled={disabled}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            variant="purple-glow"
            size="lg"
            className="font-mono"
          >
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>

        {/* Hint */}
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Press <kbd className="rounded border border-border bg-muted px-1 text-foreground">Enter</kbd> to
          send, <kbd className="rounded border border-border bg-muted px-1 text-foreground">Shift</kbd> +{" "}
          <kbd className="rounded border border-border bg-muted px-1 text-foreground">Enter</kbd> for new
          line
        </p>
      </div>
    </div>
  )
}
