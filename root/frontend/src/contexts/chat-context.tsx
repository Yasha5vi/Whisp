"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export interface ChatItem {
  id: string
  avatar: string
  name: string
  message: string
  time: string
  active?: boolean
}

export interface Message {
  id: string
  type: "sent" | "received" | "typing"
  sender?: string
  avatar?: string
  content?: string
  time?: string
  images?: string[]
}

interface ChatData {
  chatItem: ChatItem
  messages: Message[]
}

interface ChatContextType {
  chats: ChatItem[]
  setChats: (chats: ChatItem[]) => void
  selectedChatId: string | null
  selectChat: (id: string) => void
  chatMessages: Record<string, Message[]>
  setChatMessages: (id: string, messages: Message[]) => void
  currentMessage: string
  setCurrentMessage: (message: string) => void
  sendMessage: (content: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<ChatItem[]>([])
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>({})
  const [currentMessage, setCurrentMessage] = useState('')

  const selectChat = (id: string) => {
    setSelectedChatId(id)
    setChats(prev => prev.map(chat => ({
      ...chat,
      active: chat.id === id
    })))
  }

  const updateChatMessages = (id: string, messages: Message[]) => {
    setChatMessages(prev => ({
      ...prev,
      [id]: messages
    }))
  }

  const sendMessage = (content: string) => {
    if (!selectedChatId || !content.trim()) return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "sent",
      content,
      time: "Just now"
    }
    
    updateChatMessages(selectedChatId, [...(chatMessages[selectedChatId] || []), newMessage])
    setCurrentMessage('')
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        selectedChatId,
        selectChat,
        chatMessages,
        setChatMessages: updateChatMessages,
        currentMessage,
        setCurrentMessage,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
