
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Delegate, DelegateDocument } from "@/types/delegate"
import { DelegateSelector } from "./DelegateSelector"
import { FileUpload } from "./FileUpload"
import { Calendar, FileText } from "lucide-react"

interface DocumentAttachmentFormProps {
  isOpen: boolean
  onClose: () => void
  delegates: Delegate[]
  onAttachDocument: (document: Omit<DelegateDocument, 'id' | 'createdAt' | 'fileUrl'>, file: File) => void
}

export function DocumentAttachmentForm({ isOpen, onClose, delegates, onAttachDocument }: DocumentAttachmentFormProps) {
  const [selectedDelegates, setSelectedDelegates] = useState<Delegate[]>([])
  const [subject, setSubject] = useState("")
  const [type, setType] = useState<DelegateDocument['type']>()
  const [dateTime, setDateTime] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!subject.trim()) {
      alert('Please enter a subject')
      return
    }
    
    if (!type) {
      alert('Please select a document type')
      return
    }
    
    if (!dateTime) {
      alert('Please select a date and time')
      return
    }
    
    if (selectedDelegates.length === 0) {
      alert('Please select at least one delegate')
      return
    }
    
    if (!selectedFile) {
      alert('Please upload a PDF file')
      return
    }

    const documentData = {
      subject: subject.trim(),
      type,
      dateTime,
      fileName: selectedFile.name,
      attachedDelegates: selectedDelegates.map(d => d.id)
    }

    onAttachDocument(documentData, selectedFile)
    handleReset()
    onClose()
  }

  const handleReset = () => {
    setSelectedDelegates([])
    setSubject("")
    setType(undefined)
    setDateTime("")
    setSelectedFile(null)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  // Format datetime-local input value
  const getCurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Attach Document to Delegates
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="delegates">Select Delegates</Label>
            <DelegateSelector
              delegates={delegates}
              selectedDelegates={selectedDelegates}
              onDelegateSelect={setSelectedDelegates}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter document subject..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Document Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as DelegateDocument['type'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Meeting (In presence)">Meeting (In presence)</SelectItem>
                <SelectItem value="Meeting (Online)">Meeting (Online)</SelectItem>
                <SelectItem value="Report">Report</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="datetime">Date & Time</Label>
            <div className="relative">
              <Input
                id="datetime"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                max={getCurrentDateTime()}
                required
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <FileUpload
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Attach Document
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
