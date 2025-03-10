"use client"

import ChatListItem from "./chat-list-item"
import { useChat } from "@/contexts/chat-context"

export default function ChatList() {
  const { chats, selectChat } = useChat()

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
          active={item.active}
          onClick={() => selectChat(item.id)}
        />
      ))}
    </div>
  )
}

