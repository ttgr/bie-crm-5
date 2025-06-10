
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Delegate } from "@/types/delegate"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { ContactDetailsTab } from "@/components/profile/ContactDetailsTab"
import { MembershipTab } from "@/components/profile/MembershipTab"
import { EventsTab } from "@/components/profile/EventsTab"
import { RelationshipsTab } from "@/components/profile/RelationshipsTab"
import { NotesTab } from "@/components/profile/NotesTab"
import { DocumentsTab } from "@/components/profile/DocumentsTab"
import { ActivityLogTab } from "@/components/profile/ActivityLogTab"

interface DelegateProfileProps {
  delegate: Delegate | null
  isOpen: boolean
  onClose: () => void
}

export function DelegateProfile({ delegate, isOpen, onClose }: DelegateProfileProps) {
  if (!delegate) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Delegate Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <ProfileHeader delegate={delegate} />

          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="membership">Membership</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="relationships">Relationships</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="space-y-4">
              <ContactDetailsTab delegate={delegate} />
            </TabsContent>

            <TabsContent value="membership" className="space-y-4">
              <MembershipTab delegate={delegate} />
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <EventsTab />
            </TabsContent>

            <TabsContent value="relationships" className="space-y-4">
              <RelationshipsTab />
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <NotesTab initialNotes={delegate.notes || []} delegateId={delegate.id} />
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <DocumentsTab documents={delegate.documents || []} delegateId={delegate.id} />
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <ActivityLogTab />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
