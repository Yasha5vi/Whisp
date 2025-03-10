import { useNavigate } from "react-router-dom"
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

  return (
    <div>
      {chats.map((item) => (
        <ChatListItem
          key={item.id}
          id={item.id}
          avatar={item.avatar}
          name={item.name}
          message={item.message}
          time={item.time}
          active={item.id === selectedChatId}
          onClick={() => handleChatSelect(item.id)}
        />
      ))}
    </div>
  )
}

