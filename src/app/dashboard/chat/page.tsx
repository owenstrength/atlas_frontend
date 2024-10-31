"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Loader2, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

const API_BASE_URL = "/api"

interface Message {
    id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: Date
    references?: {
      documents: Array<{
        title: string
        text: string
        score: number
      }>
      entities?: Array<{
        name: string
        description: string
      }>
    }
  }

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`${API_BASE_URL}/rag`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userMessage.content,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      console.log(data)
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.results.completion.choices[0].message.content || "I couldn't process your request.",
        role: 'assistant',
        timestamp: new Date(),
        references: {
          documents: data.results.search_results.vector_search_results.map((result: any) => ({
            title: result.metadata.title,
            text: result.text,
            score: result.score
          })),
          entities: data.results.search_results.kg_search_results.map((result: any) => ({
            name: result.content.name,
            description: result.content.description
          }))
        }
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I encountered an error processing your request.",
        role: 'assistant',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40">
        <h2 className="text-lg font-semibold">Chat with your Documents</h2>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <Bot size={40} className="mb-4" />
            <p className="text-lg font-medium">Start a conversation</p>
            <p className="text-sm">Ask questions about your documents</p>
          </div>
        ) : (
            messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col gap-2 rounded-lg px-4 py-3",
                    message.role === 'user' 
                      ? "bg-blue-500/10 dark:bg-blue-500/20" 
                      : "bg-gray-100 dark:bg-gray-800"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {message.role === 'user' ? (
                      <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Bot className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                    )}
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-medium">
                        {message.role === 'user' ? 'You' : 'Assistant'}
                      </p>
                      <div className="prose dark:prose-invert">
                        {message.content}
                      </div>
                    </div>
                  </div>
              
                  {message.role === 'assistant' && message.references && (
                    <div className="ml-9 mt-2 text-sm">
                      <details className="text-gray-500 dark:text-gray-400">
                        <summary className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                          Referenced sources ({message.references.documents.length})
                        </summary>
                        <div className="mt-2 space-y-2">
                          {message.references.documents.map((doc, index) => (
                            <div key={index} className="rounded border border-border/40 p-2">
                              <p className="font-medium text-xs text-blue-600 dark:text-blue-400">
                                {doc.title}
                              </p>
                              <p className="mt-1 text-xs">
                                {doc.text}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                Relevance: {(doc.score * 100).toFixed(1)}%
                              </p>
                            </div>
                          ))}
                        </div>
                      </details>
              
                      {message.references.entities && message.references.entities.length > 0 && (
                        <details className="mt-2 text-gray-500 dark:text-gray-400">
                          <summary className="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                            Knowledge Graph References ({message.references.entities.length})
                          </summary>
                          <div className="mt-2 space-y-2">
                            {message.references.entities.map((entity, index) => (
                              <div key={index} className="rounded border border-border/40 p-2">
                                <p className="font-medium text-xs text-violet-600 dark:text-violet-400">
                                  {entity.name}
                                </p>
                                <p className="mt-1 text-xs">
                                  {entity.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  )}
                </div>
              )))}
        {isLoading && (
          <div className="flex items-center gap-3 rounded-lg px-4 py-3 bg-gray-100 dark:bg-gray-800">
            <Bot className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            <div className="flex items-center">
              <Loader2 className="h-4 w-4 animate-spin text-gray-500 dark:text-gray-400" />
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                Thinking...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

    {/* Input form */}
    <form onSubmit={handleSubmit} className="p-4 border-t border-border/40">
      <div className="flex gap-2">
        <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
        disabled={isLoading}
        className="flex-1"
        />
        <Button 
        type="submit" 
        disabled={isLoading || !input.trim()}
        className="bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white"
        >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        </Button>
      </div>
    </form>
    </div>
  )
}