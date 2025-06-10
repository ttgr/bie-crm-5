
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { StickyNote, Plus } from "lucide-react"
import { DelegateNote } from "@/types/delegate"

interface NotesTabProps {
  initialNotes: DelegateNote[]
  delegateId: string
}

export function NotesTab({ initialNotes, delegateId }: NotesTabProps) {
  const [notes, setNotes] = useState<DelegateNote[]>(initialNotes)
  const [newNoteText, setNewNoteText] = useState("")

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const isRecentNote = (dateString: string) => {
    const noteDate = new Date(dateString)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return noteDate > sevenDaysAgo
  }

  const handleAddNote = () => {
    if (newNoteText.trim()) {
      const newNote: DelegateNote = {
        id: Date.now().toString(),
        text: newNoteText.trim(),
        createdAt: new Date().toISOString()
      }
      setNotes(prev => [newNote, ...prev])
      setNewNoteText("")
      console.log('Added note:', newNote, 'for delegate:', delegateId)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StickyNote className="h-4 w-4" />
          Notes
          <Badge variant="secondary">{notes.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Add New Note</h4>
          <Textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Add a note about this delegate..."
            className="min-h-[80px]"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Date: {new Date().toLocaleString()}
            </span>
            <Button 
              onClick={handleAddNote} 
              disabled={!newNoteText.trim()}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-medium">All Notes</h4>
          {notes.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No notes yet</p>
          ) : (
            <ScrollArea className="h-[400px] w-full">
              <div className="space-y-3">
                {notes
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((note) => (
                    <div key={note.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {formatDateTime(note.createdAt)}
                        </span>
                        {isRecentNote(note.createdAt) && (
                          <Badge variant="default" className="text-xs">
                            Recent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{note.text}</p>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
