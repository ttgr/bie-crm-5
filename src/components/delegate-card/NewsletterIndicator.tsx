
import { Badge } from "@/components/ui/badge"
import { Mail } from "lucide-react"

interface NewsletterIndicatorProps {
  isSubscribed: boolean
}

export function NewsletterIndicator({ isSubscribed }: NewsletterIndicatorProps) {
  if (!isSubscribed) return null

  return (
    <div className="relative">
      <Badge 
        variant="default" 
        className="bg-blue-100 text-blue-800 border-blue-200 text-xs px-2 py-0.5"
      >
        <Mail className="h-3 w-3 mr-1" />
        Newsletter
      </Badge>
    </div>
  )
}
