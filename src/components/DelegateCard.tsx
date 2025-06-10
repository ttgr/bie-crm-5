
import { Card } from "@/components/ui/card"
import { Delegate, DelegateNote } from "@/types/delegate"
import { useState } from "react"
import { NotesModal } from "@/components/NotesModal"
import { DocumentsModal } from "@/components/documents/DocumentsModal"
import { DelegateProfile } from "@/components/DelegateProfile"
import { DelegateCardHeader } from "./delegate-card/DelegateCardHeader"
import { DelegateCardContent } from "./delegate-card/DelegateCardContent"
import { DelegateCardActions } from "./delegate-card/DelegateCardActions"

interface DelegateCardProps {
  delegate: Delegate
  onEndMembership?: (delegate: Delegate) => void
  onViewContact?: (delegate: Delegate) => void
}

export function DelegateCard({ delegate, onEndMembership, onViewContact }: DelegateCardProps) {
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false)
  const [isDocumentsModalOpen, setIsDocumentsModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const handleViewContact = () => {
    setIsProfileModalOpen(true)
  }

  const handleAddNote = (noteText: string) => {
    // In a real app, this would save to the backend
    const newNote: DelegateNote = {
      id: Date.now().toString(),
      text: noteText,
      createdAt: new Date().toISOString()
    }
    console.log('Adding note:', newNote, 'for delegate:', delegate.id)
    // This would update the delegate's notes in the backend
  }

  const handleNotesClick = () => {
    setIsNotesModalOpen(true)
  }

  const handleDocumentsClick = () => {
    setIsDocumentsModalOpen(true)
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col h-full w-full">
        <DelegateCardHeader 
          delegate={delegate} 
          onNotesClick={handleNotesClick}
          onDocumentsClick={handleDocumentsClick}
        />
        
        <DelegateCardContent 
          delegate={delegate} 
          onNotesClick={handleNotesClick}
        />
        
        <DelegateCardActions 
          delegate={delegate}
          onViewContact={handleViewContact}
          onEndMembership={onEndMembership}
        />
      </Card>

      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        delegateName={delegate.contactName}
        notes={delegate.notes || []}
        onAddNote={handleAddNote}
      />

      <DocumentsModal
        isOpen={isDocumentsModalOpen}
        onClose={() => setIsDocumentsModalOpen(false)}
        delegateName={delegate.contactName}
        documents={delegate.documents || []}
      />

      <DelegateProfile
        delegate={delegate}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  )
}
