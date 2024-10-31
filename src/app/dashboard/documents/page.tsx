// app/dashboard/documents/page.tsx
"use client"
import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import { Button } from "@/app/components/ui/button"
import { Trash2, Loader2, Upload } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog"
import { UploadModal } from "@/app/components/dashboard/UploadModal"

const API_BASE_URL = "/api"

interface Document {
  id: string
  title: string
  created_at: string
  document_type: string
  ingestion_status: string
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`${API_BASE_URL}/documents_overview`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Failed to fetch documents")

      const data = await response.json()
      setDocuments(data.results)
    } catch (error) {
      console.error("Error fetching documents:", error)
      setError("Failed to load documents")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (documentId: string) => {
    setDocumentToDelete(documentId)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!documentToDelete) return

    setIsDeleting(true)
    try {
      const token = localStorage.getItem("accessToken")
      console.log("Deleting document with ID:", documentToDelete)
      const filters = JSON.stringify({ document_id: {'$eq': documentToDelete }})
      
      const response = await fetch(`${API_BASE_URL}/delete?filters=${encodeURIComponent(filters)}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("Failed to delete document")

      setDocuments(docs => docs.filter(doc => doc.id !== documentToDelete))
    } catch (error) {
      console.error("Error deleting document:", error)
      setError("Failed to delete document")
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setDocumentToDelete(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Documents</h2>
        <Button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {error && (
        <div className="text-center text-red-500 dark:text-red-400 py-4">
          {error}
        </div>
      )}
      
      {documents.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No documents found. Upload some documents to get started!
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.title}</TableCell>
                  <TableCell>{doc.document_type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      doc.ingestion_status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {doc.ingestion_status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(doc.created_at)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(doc.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this document. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => {
          setIsUploadModalOpen(false)
          fetchDocuments() // Refresh the documents list after upload
        }} 
      />
    </div>
  )
}