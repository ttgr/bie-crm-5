
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { DelegateDocument } from "@/types/delegate"

interface DocumentsIndicatorProps {
  documents: DelegateDocument[]
  onDocumentsClick: () => void
}

export function DocumentsIndicator({ documents, onDocumentsClick }: DocumentsIndicatorProps) {
  const hasRecentDocuments = documents.some(doc => {
    const docDate = new Date(doc.createdAt)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return docDate > sevenDaysAgo
  })

  if (documents.length === 0) return null

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={onDocumentsClick}
        className="h-8 w-8 p-0"
        title={`${documents.length} documents`}
      >
        <FileText className={`h-4 w-4 ${hasRecentDocuments ? 'text-green-600' : 'text-gray-400'}`} />
      </Button>
      <Badge 
        variant={hasRecentDocuments ? "default" : "secondary"} 
        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
      >
        {documents.length}
      </Badge>
      {hasRecentDocuments && (
        <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-600 rounded-full animate-pulse"></div>
      )}
    </div>
  )
}
