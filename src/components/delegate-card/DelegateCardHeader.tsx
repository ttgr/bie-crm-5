
import { CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Delegate } from "@/types/delegate"
import { LanguageIcon } from "./LanguageIcon"
import { NotesIndicator } from "./NotesIndicator"
import { DocumentsIndicator } from "./DocumentsIndicator"
import { NewsletterIndicator } from "./NewsletterIndicator"
import { BulletinIndicator } from "./BulletinIndicator"

interface DelegateCardHeaderProps {
  delegate: Delegate
  onNotesClick: () => void
  onDocumentsClick: () => void
}

export function DelegateCardHeader({ delegate, onNotesClick, onDocumentsClick }: DelegateCardHeaderProps) {
  const notes = delegate.notes || []
  const documents = delegate.documents || []

  return (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg leading-tight truncate">
            {delegate.contactName}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant={delegate.isActive ? "default" : "secondary"} className="text-xs">
              {delegate.isActive ? "Active" : "Inactive"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {delegate.membershipType === 'delegate' ? 'Delegate' : 'Member State'}
            </Badge>
            <LanguageIcon language={delegate.language} />
            <NewsletterIndicator isSubscribed={delegate.isNewsletterSubscribed} />
            <BulletinIndicator isSubscribed={delegate.isBulletinSubscribed} />
          </div>
        </div>
        <div className="flex items-center gap-1 ml-2">
          <NotesIndicator notes={notes} onNotesClick={onNotesClick} />
          <DocumentsIndicator documents={documents} onDocumentsClick={onDocumentsClick} />
        </div>
      </div>
    </CardHeader>
  )
}
