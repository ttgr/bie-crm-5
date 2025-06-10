
import { Badge } from "@/components/ui/badge"
import { Vote } from "lucide-react"

interface VotingRightsIndicatorProps {
  hasVotingRights: boolean
}

export function VotingRightsIndicator({ hasVotingRights }: VotingRightsIndicatorProps) {
  return (
    <div className="relative">
      <Badge 
        variant={hasVotingRights ? "default" : "outline"} 
        className={hasVotingRights 
          ? "bg-purple-100 text-purple-800 border-purple-200 text-xs px-2 py-0.5"
          : "text-xs px-2 py-0.5"
        }
      >
        <Vote className="h-3 w-3 mr-1" />
        {hasVotingRights ? "Voting Rights" : "No Voting Rights"}
      </Badge>
    </div>
  )
}
