import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatListItemProps {
  id: string
  uId:String
  avatar: string
  name: string
  message: string
  time: string
  active?: boolean
  onClick: () => void
}

export default function ChatListItem({ id, avatar, name, message, time, active = false, onClick }: ChatListItemProps) {
  // Check if this message appears to be from the user based on the time
  // const isLastMessageFromUser = time === "Just now" || lastMessage.startsWith("You: ");
  
  // Format the message to indicate if it was sent by the user
  // const displayMessage = isLastMessageFromUser && !lastMessage.startsWith("You: ") 
  //   ? `You: ${lastMessage}`
  //   : message;
  return (
    <div 
      className={`
        flex items-start gap-3 p-4 cursor-pointer
        hover:bg-gray-100 dark:hover:bg-gray-800 
        ${active 
          ? "bg-gray-100 dark:bg-gray-800" 
          : "bg-white dark:bg-gray-950"}
      `}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar> 
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className={`font-medium ${active ? "text-gray-900 dark:text-white" : "text-gray-800 dark:text-gray-100"}`}>
            {name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
        </div>
        <p className={`text-sm truncate text-gray-500 dark:text-gray-400`}>
          {message}
        </p>
      </div>
    </div>
  )
}

