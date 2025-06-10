
import { Button } from "@/components/ui/button"
import { Delegate } from "@/types/delegate"

interface DelegateCardActionsProps {
  delegate: Delegate
  onViewContact: () => void
  onEndMembership?: (delegate: Delegate) => void
}

export function DelegateCardActions({ delegate, onViewContact, onEndMembership }: DelegateCardActionsProps) {
  return (
    <div className="flex gap-2 pt-2 mt-auto">
      <Button variant="default" size="sm" onClick={onViewContact} className="flex-1">
        View Contact
      </Button>
      {delegate.isActive && (
        <Button variant="outline" size="sm" onClick={() => onEndMembership?.(delegate)} className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
          Denounce
        </Button>
      )}
    </div>
  )
}
