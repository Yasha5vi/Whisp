import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatListItemProps {
  id: string
  avatar: string
  name: string
  message: string
  time: string
  active?: boolean
  onClick: () => void
}

export default function ChatListItem({ id, avatar, name, message, time, active = false, onClick }: ChatListItemProps) {
  return (
    <div 
      className={`flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${active ? "bg-gray-50 dark:bg-gray-900" : ""}`}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-medium">{name}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-sm text-gray-400 truncate">{message}</p>
      </div>
    </div>
  )
}

