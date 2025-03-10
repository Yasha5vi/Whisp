import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "@/contexts/chat-context"
import { useParams } from "react-router-dom"
import SearchBar from "@/components/chat/search-bar"
import ChatList from "@/components/chat/chat-list"



export default function ChatSidebar() {
  const { id } = useParams<{ id: string }>()
  const { setChats, selectChat, isMobileView, selectedChatId } = useChat()
  const initializedRef = useRef(false)
  
  const chatItems = [
    {
      id: "1",
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Jane Smith",
      message: "Hi there! How are you doing? I'll be around...",
      time: "2 hours ago",
      active: true,
    },
    {
      id: "2",
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Bob Johnson",
      message: "What's for dinner tonight? I'm craving some",
      time: "Yesterday",
    },
    {
      id: "3",
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Emily Davis",
      message: "Can you help me with this coding problem?",
      time: "2 days ago",
    },
    {
      id: "4",
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Michael Wilson",
      message: "See you tomorrow at the park. Don't forget t",
      time: "2 weeks ago",
    },
    {
      id: "5",
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Sophia Anderson",
      message: "I miss you so much! It's been ages since we l",
      time: "2 weeks ago",
    },
    {
      id: "6",
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Liam Brown",
      message: "Let's meet up for coffee. I have some excitin",
      time: "3 weeks ago",
    },
    {
      id: "7",
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Olivia Lee",
      message: "I have some big news! Guess what? I'm getti",
      time: "4 weeks ago",
    },
    {
      id: "8",
      avatar: "/placeholder.svg?height=40&width=40",
      name: "Yashasvi Rajput",
      message: "Bhai mere se thoda gyan lele",
      time: "4 weeks ago",
    },
  ]

  useEffect(() => {
    if (!initializedRef.current) {
      setChats(chatItems)
      
      // If URL has an ID, select that chat, otherwise select the first chat
      if (id) {
        selectChat(id)
      } else if (!selectedChatId) {
        selectChat("1") 
      }
      
      initializedRef.current = true
    }
  }, [setChats, selectChat, id, selectedChatId])

  return (
    <div className={`
      h-full border-r border-gray-300 dark:border-gray-800 
      flex flex-col bg-white dark:bg-gray-950
      ${isMobileView ? 'w-full' : 'w-full max-w-md'}
    `}>
      <SearchBar />
      <ScrollArea className="flex-1 bg-white dark:bg-gray-950">
        <ChatList />
      </ScrollArea>
    </div>
  )
}

