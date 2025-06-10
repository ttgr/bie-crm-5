
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, File, X } from "lucide-react"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
}

export function FileUpload({ onFileSelect, selectedFile }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      onFileSelect(file)
    } else if (file) {
      alert('Please select a PDF file only')
      event.target.value = ''
    }
  }

  const handleRemoveFile = () => {
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="pdf-upload">PDF Document</Label>
      <div className="flex items-center gap-2">
        <Input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1"
        >
          <Upload className="h-4 w-4 mr-2" />
          {selectedFile ? 'Change PDF' : 'Upload PDF'}
        </Button>
      </div>
      
      {selectedFile && (
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
          <File className="h-4 w-4 text-red-600" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{selectedFile.name}</div>
            <div className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
