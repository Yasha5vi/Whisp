import { Share2, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChatItem } from "@/contexts/chat-context"

interface ChatAreaHeaderProps {
  selectedChat: ChatItem
}

export default function ChatAreaHeader({ selectedChat }: ChatAreaHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-300 dark:border-gray-800 flex items-center justify-between bg-background">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
          <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="font-medium text-gray-800 dark:text-white">{selectedChat.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <Share2 className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>More options</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

