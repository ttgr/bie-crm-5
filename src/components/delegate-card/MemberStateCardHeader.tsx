
import { CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Delegate } from "@/types/delegate"
import { LanguageIcon } from "./LanguageIcon"
import { NotesIndicator } from "./NotesIndicator"
import { DocumentsIndicator } from "./DocumentsIndicator"
import { VotingRightsIndicator } from "./VotingRightsIndicator"

interface MemberStateCardHeaderProps {
  delegate: Delegate
  onNotesClick: () => void
  onDocumentsClick: () => void
}

export function MemberStateCardHeader({ delegate, onNotesClick, onDocumentsClick }: MemberStateCardHeaderProps) {
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
            <Badge variant="outline" className="text-xs">
              Member State
            </Badge>
            <LanguageIcon language={delegate.language} />
            <VotingRightsIndicator hasVotingRights={delegate.hasVotingRights || false} />
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
