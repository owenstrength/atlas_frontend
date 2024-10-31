"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import { Upload } from "lucide-react"
import { useToast } from "@/app/components/ui/use-toast"

const API_BASE_URL = "/api"

export function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files?.length) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }

      const token = localStorage.getItem("accessToken")
      
      // Fire and forget - don't await the response
      fetch(`${API_BASE_URL}/ingest_files`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      })

      // Show success toast and close modal
      toast({
        title: "Processing Started",
        description: `${files.length} ${files.length === 1 ? 'file' : 'files'} sent for processing. They will appear in your documents manager when ready.`,
        duration: 5000,
      })
      
      onClose()
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your files. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Documents</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12">
            <Upload className="h-8 w-8 mb-4 text-gray-500 dark:text-gray-400" />
            <label className="cursor-pointer">
              <span className={`bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white px-4 py-2 rounded-md ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isUploading ? 'Uploading...' : 'Select Files'}
              </span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={onFileUpload}
                accept=".pdf,.doc,.docx,.txt"
                disabled={isUploading}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              or drag and drop your files here
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}