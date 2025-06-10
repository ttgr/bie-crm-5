
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StickyNote } from "lucide-react"
import { DelegateNote } from "@/types/delegate"

interface NotesIndicatorProps {
  notes: DelegateNote[]
  onNotesClick: () => void
}

export function NotesIndicator({ notes, onNotesClick }: NotesIndicatorProps) {
  const hasRecentNotes = notes.some(note => {
    const noteDate = new Date(note.createdAt)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return noteDate > sevenDaysAgo
  })

  if (notes.length === 0) return null

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={onNotesClick}
        className="h-8 w-8 p-0"
        title={`${notes.length} notes`}
      >
        <StickyNote className={`h-4 w-4 ${hasRecentNotes ? 'text-blue-600' : 'text-gray-400'}`} />
      </Button>
      <Badge 
        variant={hasRecentNotes ? "default" : "secondary"} 
        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
      >
        {notes.length}
      </Badge>
      {hasRecentNotes && (
        <div className="absolute -top-1 -right-1 h-2 w-2 bg-blue-600 rounded-full animate-pulse"></div>
      )}
    </div>
  )
}
