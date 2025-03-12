import ChatArea from "@/components/chat/chat-area"
import ChatHeader from "./chat-header"
import ChatSidebar from "./chat-sidebar"
import { ChatProvider } from "@/contexts/chat-context"
import { useChat } from "@/contexts/chat-context"
import { useSocket } from "@/contexts/socketContext"
import { useAuth } from "@/contexts/authContext"
import { useEffect } from "react"

function ChatLayoutContent() {
  const { isSidebarOpen, isMobileView, selectedChatId, closeSidebar } = useChat()
  const socket = useSocket();
  const { user } = useAuth();

  // Join the personal room as soon as the user is available
  useEffect(() => {
    if (socket && user) {
      socket.emit("joinRoom", user._id);
      // console.log(`User ${user._id} joined their personal room.`);
    }
  }, [socket, user]);


  return (
    <div className="flex flex-col h-screen bg-background text-gray-800 dark:text-white">
      <ChatHeader />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - conditionally shown based on isSidebarOpen state */}
        <div 
          className={`
            ${isMobileView ? 'absolute inset-y-0 left-0 z-20' : 'relative'}
            ${isMobileView && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
            transition-transform duration-300 ease-in-out 
            w-full md:w-auto md:max-w-md
            bg-white dark:bg-gray-950 shadow-lg
          `}
        >
          <ChatSidebar />
        </div>
        
        {/* Mobile overlay when sidebar is open */}
        {isMobileView && isSidebarOpen && selectedChatId && (
          <div 
            className="fixed inset-0  z-10"
            onClick={closeSidebar}
          />
        )}
        
        {/* Chat area */}
        <ChatArea />
      </div>
    </div>
  )
}

export default function ChatLayout() {
  return (
    <ChatProvider>
      <ChatLayoutContent />
    </ChatProvider>
  )
}

