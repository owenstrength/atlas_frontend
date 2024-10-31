// app/dashboard/page.tsx
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Upload, Search, MessageSquare, Files, Brain, BookOpen } from "lucide-react"
import Link from "next/link"
import { UploadModal } from "@/app/components/dashboard/UploadModal"
import { QuizModal } from "@/app/components/dashboard/QuizModal"

export default function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card 
          className="hover:border-blue-600 dark:hover:border-violet-600 transition-colors cursor-pointer"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Upload Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            Upload new documents to your library
          </CardContent>
        </Card>

        <Link href="/dashboard/search">
          <Card className="hover:border-blue-600 dark:hover:border-violet-600 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              Search through your documents with natural language
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/chat">
          <Card className="hover:border-blue-600 dark:hover:border-violet-600 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              Ask questions and chat about your documents
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/documents">
          <Card className="hover:border-blue-600 dark:hover:border-violet-600 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Files className="mr-2 h-4 w-4" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              View and manage your documents
            </CardContent>
          </Card>
        </Link>

        <Card 
          className="hover:border-blue-600 dark:hover:border-violet-600 transition-colors cursor-pointer"
          onClick={() => console.log("Generate Flashcards")}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-4 w-4" />
              Flashcards
            </CardTitle>
          </CardHeader>
          <CardContent>
            Generate flashcards from your documents
          </CardContent>
        </Card>

        <Card 
          className="hover:border-blue-600 dark:hover:border-violet-600 transition-colors cursor-pointer"
          onClick={() => setIsQuizModalOpen(true)}
        >
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            Generate quizzes from your documents
          </CardContent>
        </Card>
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
      
      <QuizModal 
        isOpen={isQuizModalOpen} 
        onClose={() => setIsQuizModalOpen(false)} 
      />
    </>
  )
}