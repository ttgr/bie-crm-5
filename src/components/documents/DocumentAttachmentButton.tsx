
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"
import { DocumentAttachmentForm } from "./DocumentAttachmentForm"
import { Delegate, DelegateDocument } from "@/types/delegate"

interface DocumentAttachmentButtonProps {
  delegates: Delegate[]
  onAttachDocument: (document: Omit<DelegateDocument, 'id' | 'createdAt' | 'fileUrl'>, file: File) => void
}

export function DocumentAttachmentButton({ delegates, onAttachDocument }: DocumentAttachmentButtonProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <Button 
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
        size="icon"
        title="Attach Document to Delegates"
      >
        <div className="relative">
          <FileText className="h-6 w-6" />
          <Plus className="h-3 w-3 absolute -top-1 -right-1" />
        </div>
      </Button>

      <DocumentAttachmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        delegates={delegates}
        onAttachDocument={onAttachDocument}
      />
    </>
  )
}
