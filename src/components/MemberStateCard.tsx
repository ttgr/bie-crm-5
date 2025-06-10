
import { Card } from "@/components/ui/card"
import { Delegate } from "@/types/delegate"
import { MemberStateCardHeader } from "./delegate-card/MemberStateCardHeader"
import { DelegateCardContent } from "./delegate-card/DelegateCardContent"
import { MemberStateCardActions } from "./delegate-card/MemberStateCardActions"
import { useState } from "react"

interface MemberStateCardProps {
  delegate: Delegate
  onViewContact: (delegate: Delegate) => void
  onToggleVotingRights?: (delegate: Delegate) => void
}

export function MemberStateCard({ delegate, onViewContact, onToggleVotingRights }: MemberStateCardProps) {
  const [showNotes, setShowNotes] = useState(false)
  const [showDocuments, setShowDocuments] = useState(false)

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <MemberStateCardHeader
        delegate={delegate}
        onNotesClick={() => setShowNotes(true)}
        onDocumentsClick={() => setShowDocuments(true)}
      />
      <DelegateCardContent
        delegate={delegate}
        onNotesClick={() => setShowNotes(true)}
      />
      <MemberStateCardActions
        delegate={delegate}
        onViewContact={() => onViewContact(delegate)}
        onToggleVotingRights={onToggleVotingRights}
      />
    </Card>
  )
}
