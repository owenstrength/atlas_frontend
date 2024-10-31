// app/dashboard/search/page.tsx
"use client"
import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Loader2, Search, FileText, Brain } from "lucide-react"

const API_BASE_URL = "/api"

interface SearchResult {
  vectorResults: Array<{
    text: string
    score: number
    metadata: {
      title: string
      associated_query: string
    }
  }>
  kgResults: Array<{
    content: {
      name: string
      description: string
    }
    metadata: {
      associated_query: string
    }
  }> | null
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult | null>(null)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || isLoading) return

    setIsLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      })

      if (!response.ok) throw new Error("Search failed")

      const data = await response.json()
      setResults({
        vectorResults: data.results.vector_search_results || [],
        kgResults: data.results.kg_search_results || [],
      })
    } catch (error) {
      console.error("Search error:", error)
      setError("Failed to perform search")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Search Documents</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Search through your documents using natural language
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What would you like to know?"
          className="flex-1"
          disabled={isLoading}
        />
        <Button 
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 dark:text-red-400 text-center">
          {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Document Results */}
          {results.vectorResults && results.vectorResults.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Document Matches
              </h3>
              <div className="grid gap-4">
                {results.vectorResults.map((result, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-white dark:bg-gray-800"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-blue-600 dark:text-blue-400">
                        {result.metadata.title}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {(result.score * 100).toFixed(1)}% match
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {result.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            !isLoading && query && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No document matches found
              </p>
            )
          )}

          {/* Knowledge Graph Results */}
          {results.kgResults && results.kgResults.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Knowledge Graph Matches
              </h3>
              <div className="grid gap-4">
                {results.kgResults.map((result, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-white dark:bg-gray-800"
                  >
                    <h4 className="font-medium text-violet-600 dark:text-violet-400 mb-2">
                      {result.content.name}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {result.content.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!results && !isLoading && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No results yet</p>
          <p className="text-sm">Try searching for something in your documents</p>
        </div>
      )}
    </div>
  )
}