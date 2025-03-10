"use client"

import { useEffect, useRef, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import ChatAreaHeader from "@/components/chat/chat-area-header"
import MessageList from "@/components/chat/message-list"
import MessageInput from "@/components/chat/message-input"
import { useChat } from "@/contexts/chat-context"

export default function Chat() {
  const { id } = useParams<{ id: string }>()
  const { 
    chats, 
    selectedChatId, 
    selectChat, 
    chatMessages, 
    setChatMessages, 
    isMobileView, 
    isSidebarOpen 
  } = useChat()
  
  const [shouldRedirect, setShouldRedirect] = useState(!id)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Select chat based on URL parameter
  useEffect(() => {
    if (id && id !== selectedChatId) {
      selectChat(id)
      setShouldRedirect(false)
    }
  }, [id, selectedChatId, selectChat])
  
  // Determine if redirection is needed (when on /chat route with no ID)
  useEffect(() => {
    if (!id) {
      // Small delay to ensure context is fully initialized
      const timer = setTimeout(() => {
        setShouldRedirect(true)
      }, 50)
      
      return () => clearTimeout(timer)
    }
  }, [id, chats, selectedChatId])
  
  const selectedChat = chats.find(chat => chat.id === selectedChatId || chat.id === id)
  
  // Initialize default messages only when necessary
  useEffect(() => {
    const effectiveId = id || selectedChatId
    if (effectiveId && selectedChat && !chatMessages[effectiveId]) {
      setChatMessages(effectiveId, [{
        id: "1",
        type: "received" as const,
        sender: selectedChat.name,
        avatar: selectedChat.avatar,
        content: "Hi there! How can I help you today?",
        time: "5 minutes ago",
      }])
    }
  }, [id, selectedChatId, selectedChat, chatMessages, setChatMessages])
  
  // Handle scrolling to bottom
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [chatMessages, selectedChatId, id])

  // Handle redirection when on base /chat route
  if (shouldRedirect && !id) {
    if (selectedChatId) {
      return <Navigate to={`/chat/${selectedChatId}`} replace />
    }
    
    if (chats.length > 0) {
      return <Navigate to={`/chat/${chats[0].id}`} replace />
    }
    
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <p className="text-gray-500">No chats available</p>
      </div>
    )
  }

  // On mobile, if sidebar is open, hide chat area content
  if (isMobileView && isSidebarOpen) {
    return <div className="hidden md:block flex-1 bg-background"></div>
  }

  if (!selectedChatId && !id || !selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    )
  }

  const effectiveId = id || selectedChatId;
  
  return (
    <div className="flex-1 flex flex-col bg-background">
      <ChatAreaHeader selectedChat={selectedChat} />
      <div ref={scrollContainerRef} className="flex-1 p-4 overflow-y-auto">
        <MessageList messages={chatMessages[effectiveId] || []} />
      </div>
      <MessageInput />
    </div>
  )
}
