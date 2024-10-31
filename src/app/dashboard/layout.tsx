"use client"
import { Button } from "@/app/components/ui/button"
import { ThemeToggle } from "@/app/components/common/ThemeToggle"
import Link from "next/link"
import { LogOut, Upload, Search, MessageSquare, Files, Brain, BookOpen } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border/40 bg-background">
        <div className="flex h-16 items-center px-4 border-b border-border/40">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              Atlas
            </span>
          </Link>
        </div>
        <nav className="space-y-2 p-4">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/dashboard/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/dashboard/search">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/dashboard/chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/dashboard/documents">
              <Files className="mr-2 h-4 w-4" />
              Documents
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => console.log("Generate Flashcards")}>
            <Brain className="mr-2 h-4 w-4" />
            Flashcards
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => {
            console.log("Generate Quiz with options:", {
              openEnded: true,
              multipleChoice: true,
              trueFalse: true
            })
          }}>
            <BookOpen className="mr-2 h-4 w-4" />
            Quiz
          </Button>
        </nav>
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <ThemeToggle />
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="h-16 border-b border-border/40 flex items-center justify-between px-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}