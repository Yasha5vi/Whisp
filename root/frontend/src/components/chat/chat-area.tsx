"use client"

import { useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatAreaHeader from "./chat-area-header"
import MessageList from "./message-list"
import MessageInput from "./message-input"
import { useChat } from "@/contexts/chat-context"

export default function ChatArea() {
  const { selectedChatId, chats, chatMessages, setChatMessages } = useChat()
  
  const selectedChat = chats.find(chat => chat.id === selectedChatId)
  
  useEffect(() => {
    // Initialize default messages for chats that don't have any
    if (selectedChatId && !chatMessages[selectedChatId]) {
      const defaultMessages = [
        {
          id: "1",
          type: "received" as const,
          sender: selectedChat?.name,
          avatar: selectedChat?.avatar,
          content: "Hi there! How can I help you today?",
          time: "5 minutes ago",
        }
      ]
      setChatMessages(selectedChatId, defaultMessages)
    }
  }, [selectedChatId, selectedChat])

  if (!selectedChatId || !selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <ChatAreaHeader selectedChat={selectedChat} />
      <ScrollArea className="flex-1 p-4">
        <MessageList messages={chatMessages[selectedChatId] || []} />
      </ScrollArea>
      <MessageInput />
    </div>
  )
}

