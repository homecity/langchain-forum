"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatInput } from "@/components/chat/chat-input"
import { TypingIndicator } from "@/components/chat/typing-indicator"
import { mockChatMessages, ChatMessage as ChatMessageType } from "@/lib/real-forum-data"
import { Trash2, Settings } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = React.useState<ChatMessageType[]>(mockChatMessages)
  const [isTyping, setIsTyping] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Add empty assistant message for streaming
    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: ChatMessageType = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMessage])

    // Call RAG API with streaming
    setIsTyping(true)

    // Setup timeout controller
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: content, stream: true }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Failed to get response from API')
      }

      // Check if streaming response
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('text/event-stream')) {
        // Handle streaming response
        const reader = response.body?.getReader()
        if (!reader) throw new Error('No reader available')

        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          // Buffer overflow protection
          if (buffer.length > 100000) {
            throw new Error('Response buffer overflow')
          }

          const lines = buffer.split('\n')
          buffer = lines.pop() || '' // Keep incomplete line in buffer

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') {
                setIsTyping(false)
                break
              }

              try {
                const parsed = JSON.parse(data)

                if (parsed.type === 'sources') {
                  // Update sources
                  setMessages((prev) => {
                    const updated = [...prev]
                    const msgIndex = updated.findIndex((m) => m.id === assistantMessageId)
                    if (msgIndex !== -1) {
                      updated[msgIndex] = {
                        ...updated[msgIndex],
                        sources: parsed.sources,
                      }
                    }
                    return updated
                  })
                } else if (parsed.type === 'chunk') {
                  // Append content chunk
                  setMessages((prev) => {
                    const updated = [...prev]
                    const msgIndex = updated.findIndex((m) => m.id === assistantMessageId)
                    if (msgIndex !== -1) {
                      updated[msgIndex] = {
                        ...updated[msgIndex],
                        content: updated[msgIndex].content + parsed.content,
                      }
                    }
                    return updated
                  })
                } else if (parsed.type === 'error') {
                  throw new Error(parsed.message)
                }
              } catch (parseError) {
                console.error('Parse error:', parseError)
              }
            }
          }
        }
      } else {
        // Handle non-streaming response (fallback)
        const data = await response.json()
        setMessages((prev) => {
          const updated = [...prev]
          const msgIndex = updated.findIndex((m) => m.id === assistantMessageId)
          if (msgIndex !== -1) {
            updated[msgIndex] = {
              ...updated[msgIndex],
              content: data.answer,
              sources: data.sources,
              trace: data.trace,
            }
          }
          return updated
        })
        setIsTyping(false)
      }
    } catch (error) {
      clearTimeout(timeoutId)
      console.error('Chat API Error:', error)

      // Determine error message
      let errorMessage = "Sorry, I encountered an error processing your question. Please try again."
      if ((error as Error).name === 'AbortError') {
        errorMessage = "Request timed out after 30 seconds. Please try again with a shorter query."
      } else if ((error as Error).message === 'Response buffer overflow') {
        errorMessage = "Response too large. Please try a more specific query."
      }

      // Show error message to user
      setMessages((prev) => {
        const updated = [...prev]
        const msgIndex = updated.findIndex((m) => m.id === assistantMessageId)
        if (msgIndex !== -1) {
          updated[msgIndex] = {
            ...updated[msgIndex],
            content: errorMessage,
          }
        }
        return updated
      })
      setIsTyping(false)
    }
  }

  const handleClearChat = () => {
    setMessages([mockChatMessages[0]]) // Keep welcome message
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-mono text-2xl font-bold">
                <span className="text-gradient-purple-green">RAG Assistant</span>
              </h1>
              <p className="mt-1 font-mono text-sm text-muted-foreground">
                Powered by GPT-4o-mini (Streaming) + 1536-dim OpenAI Embeddings
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost-light"
                size="icon"
                onClick={handleClearChat}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost-light"
                size="icon"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-secondary/30">
        <div className="container mx-auto px-4 py-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </div>
  )
}
