// app/dashboard/page.tsx
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Upload, Search, MessageSquare, Files } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Link href="/dashboard/upload">
        <Card className="hover:border-blue-600 dark:hover:border-violet-600 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            Upload new documents to your library
          </CardContent>
        </Card>
      </Link>

      <Link href="/dashboard/search">
        <Card className="hover:border-blue-600 dark:hover:border-violet-600 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-4 w-4" />
              Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            Search through your documents
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
    </div>
  )
}