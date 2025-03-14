import { useNavigate } from "react-router-dom"
import { UserPlus } from "lucide-react"
import ChatListItem from "./chat-list-item"
import { useChat } from "@/contexts/chat-context"

export default function ChatList() {
  const { chats, selectedChatId, selectChat } = useChat()
  const navigate = useNavigate()

  const handleChatSelect = (chatId: string) => {
    navigate(`/chat/${chatId}`)
    
    // Also directly select the chat to ensure state is updated
    if (chatId !== selectedChatId) {
      selectChat(chatId)
    }
  }
  // console.log(chats);
  return (
    <div>
      {chats.length > 0 && chats.map((item) => (
        <ChatListItem
          key={item._id}
          uId={item.uId}
          id={item._id}
          avatar={item.avatar}
          name={item.name}
          message={item.lastMessage}
          time={item.time}
          active={item._id === selectedChatId}
          onClick={() => handleChatSelect(item._id)}
        />
      ))}
      {chats.length == 0 && (
        <div className="flex items-center text-xl justify-center mx-auto mt-8">
          <UserPlus className="mr-2" />
          Please add a friend
        </div>
      )}
    </div>
  )
}

