"use client"

import ChatHeader from "./chat-header"
import ChatSidebar from "./chat-sidebar"
import ChatArea from "./chat-area"
import { ChatProvider } from "@/contexts/chat-context"

export default function ChatLayout() {
  return (
    <ChatProvider>
      <div className="flex flex-col h-screen bg-background text-gray-800 dark:text-white">
        <ChatHeader />
        <div className="flex flex-1 overflow-hidden">
          <ChatSidebar />
          <ChatArea />
        </div>
      </div>
    </ChatProvider>
  )
}

