
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

interface BulletinIndicatorProps {
  isSubscribed: boolean
}

export function BulletinIndicator({ isSubscribed }: BulletinIndicatorProps) {
  if (!isSubscribed) return null

  return (
    <div className="relative">
      <Badge 
        variant="default" 
        className="bg-green-100 text-green-800 border-green-200 text-xs px-2 py-0.5"
      >
        <FileText className="h-3 w-3 mr-1" />
        Bulletin
      </Badge>
    </div>
  )
}
