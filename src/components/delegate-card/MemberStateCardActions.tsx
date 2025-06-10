
import { Button } from "@/components/ui/button"
import { Delegate } from "@/types/delegate"

interface MemberStateCardActionsProps {
  delegate: Delegate
  onViewContact: () => void
  onToggleVotingRights?: (delegate: Delegate) => void
}

export function MemberStateCardActions({ delegate, onViewContact, onToggleVotingRights }: MemberStateCardActionsProps) {
  return (
    <div className="flex gap-2 pt-2 mt-auto px-4 pb-4">
      <Button variant="default" size="sm" onClick={onViewContact} className="flex-1">
        View Contact
      </Button>
      {delegate.isActive && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onToggleVotingRights?.(delegate)} 
          className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 hover:text-purple-700"
        >
          {delegate.hasVotingRights ? "Revoke Vote" : "Grant Vote"}
        </Button>
      )}
    </div>
  )
}
