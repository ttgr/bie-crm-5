
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Download, Calendar, Users } from "lucide-react"
import { DelegateDocument } from "@/types/delegate"

interface DocumentsTabProps {
  documents: DelegateDocument[]
  delegateId: string
}

export function DocumentsTab({ documents, delegateId }: DocumentsTabProps) {
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const isRecentDocument = (dateString: string) => {
    const docDate = new Date(dateString)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return docDate > sevenDaysAgo
  }

  const getTypeColor = (type: DelegateDocument['type']) => {
    switch (type) {
      case 'Meeting (In presence)':
        return 'bg-blue-100 text-blue-800'
      case 'Meeting (Online)':
        return 'bg-purple-100 text-purple-800'
      case 'Report':
        return 'bg-green-100 text-green-800'
      case 'Contract':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDownload = (document: DelegateDocument) => {
    // In a real implementation, this would download the file from the URL
    console.log('Downloading document:', document.fileName, 'for delegate:', delegateId)
    // window.open(document.fileUrl, '_blank')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Documents
          <Badge variant="secondary">{documents.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">All Documents</h4>
          {documents.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No documents attached yet</p>
          ) : (
            <ScrollArea className="h-[400px] w-full">
              <div className="space-y-3">
                {documents
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((document) => (
                    <div key={document.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium truncate">{document.subject}</h4>
                            {isRecentDocument(document.createdAt) && (
                              <Badge variant="default" className="text-xs">
                                Recent
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                            <Badge className={getTypeColor(document.type)} variant="secondary">
                              {document.type}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDateTime(document.dateTime)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{document.attachedDelegates.length} delegate(s)</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-red-600" />
                            <span className="font-medium truncate">{document.fileName}</span>
                          </div>

                          <div className="text-xs text-gray-500">
                            Attached on {formatDateTime(document.createdAt)}
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(document)}
                          className="ml-2 shrink-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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
