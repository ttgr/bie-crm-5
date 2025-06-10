
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Vote } from "lucide-react"

interface VotingRightsSelectProps {
  selectedVotingRights: string
  setSelectedVotingRights: (value: string) => void
}

export function VotingRightsSelect({ 
  selectedVotingRights, 
  setSelectedVotingRights 
}: VotingRightsSelectProps) {
  return (
    <Select value={selectedVotingRights} onValueChange={setSelectedVotingRights}>
      <SelectTrigger className="w-full sm:w-[300px]">
        <Vote className="h-4 w-4 mr-2 shrink-0" />
        <SelectValue placeholder="Voting Rights" className="text-left" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all_voting">All Voting Status</SelectItem>
        <SelectItem value="has_voting_rights">Has Voting Rights</SelectItem>
        <SelectItem value="no_voting_rights">No Voting Rights</SelectItem>
      </SelectContent>
    </Select>
  )
}
