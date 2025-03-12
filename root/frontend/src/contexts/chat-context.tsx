"use client"

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import axios from 'axios'

export interface ChatItem {
  _id: string
  uId:String
  avatar: string
  name: string
  lastMessage: string
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
  setChats: React.Dispatch<React.SetStateAction<ChatItem[]>>//(chats: ChatItem[]) => void
  selectedChatId: string | null
  selectedChat: ChatItem | null
  selectChat: (id: string) => void
  chatMessages: Record<string, Message[]>
  setChatMessages: (id: string, messages: Message[]) => void
  currentMessage: string
  setCurrentMessage: (message: string) => void
  sendMessage: (content: string) => void
  isSidebarOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
  openSidebar: () => void
  isMobileView: boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<ChatItem[]>([])
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null)
  const [chatMessages, setChatMessages] = useState<Record<string, Message[]>>({})
  const [currentMessage, setCurrentMessage] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileView, setIsMobileView] = useState(false)

  // Detect mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const selectChat = useCallback((id: string) => {
    if (id !== selectedChatId) {
      setSelectedChatId(id)

      const chat = chats.find(chat => chat._id === id) || null
      setSelectedChat(chat)

      setChats(prev => prev.map(chat => ({
        ...chat,
        active: chat._id === id
      })))
      
      // Close sidebar automatically on mobile when selecting a chat
      if (isMobileView) {
        setIsSidebarOpen(false)
      }
    }
  }, [selectedChatId, chats, isMobileView])

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
    // console.log(newMessage); 
    // const receiverId = selectedChat?.uId
    // console.log("Receiver ID:", receiverId)
    // Update chat messages
    updateChatMessages(selectedChatId, [...(chatMessages[selectedChatId] || []), newMessage])
    
    // Update the chat list item to show the last message
    setChats(prev => prev.map(chat => {
      if (chat._id === selectedChatId) {
        return {
          ...chat,
          message: content.length > 30 ? content.substring(0, 30) + "..." : content,
          time: "Just now"
        }
      }
      return chat
    }))
    
    setCurrentMessage('')
  }
  
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
  const closeSidebar = () => setIsSidebarOpen(false)
  const openSidebar = () => setIsSidebarOpen(true)

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        selectedChatId,
        selectedChat,
        selectChat,
        chatMessages,
        setChatMessages: updateChatMessages,
        currentMessage,
        setCurrentMessage,
        sendMessage,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        openSidebar,
        isMobileView
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
