import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TypingIndicatorProps {
  sender: string
  avatar: string
}

export default function TypingIndicator({ sender, avatar }: TypingIndicatorProps) {
  return (
    <div className="flex items-start gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar} alt={sender} />
        <AvatarFallback>{sender.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium">{sender}</span>
        <div className="bg-background rounded-lg p-2 mt-1 inline-block">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

