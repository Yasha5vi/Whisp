import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatAreaHeader from "./chat-area-header"
import MessageList from "./message-list"
import MessageInput from "./message-input"
import { useChat } from "@/contexts/chat-context"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from "@/contexts/authContext"
import useIncomingMessages from "@/hooks/useIncomingMessages";
import { API_URL } from "@/config/urlConfig"

const getMessages = async(conversationId:any)=>{
  try {
    const res = await axios.get(API_URL+"/api/message/getMessage",{
        params:{conversationId},
        withCredentials: true 
      }
    );
    // console.log(res.data.data);
    return res.data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("An unexpected error occurred");
    }
  }
}

export default function ChatArea() {
  const { id } = useParams<{ id: string }>()
  const { selectedChatId, selectChat, chats, chatMessages, setChatMessages, isMobileView, isSidebarOpen } = useChat()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth();

  useIncomingMessages();

  // Effect to handle URL parameter changes
  useEffect(() => {
    if (id && id !== selectedChatId) {
      selectChat(id)
    }
  }, [id, selectedChatId, selectChat])
  
  const selectedChat = chats.find(chat => chat._id === selectedChatId)
  
  // Effect to initialize default messages
  useEffect(() => {
    if (selectedChatId && selectedChat && !chatMessages[selectedChatId]) {
      (async ()=>{
        const fetchedMessages = await getMessages(selectedChatId);

        if(fetchedMessages){
          const mappedMessages = await Promise.all(
            fetchedMessages.map(async(msg:any)=>{
              // console.log(msg);
              let type = "";
              if(msg.senderId == user._id){
                type = "sent";
              }else{
                type = "received";
              }
              return {
                id:msg._id,
                type:type,
                sender: selectedChat?.name,
                avatar: selectedChat?.avatar,
                content:msg.content,
                time:new Date(msg.createdAt).toLocaleDateString(),
              }
            })
          )
          setChatMessages(selectedChatId, mappedMessages.reverse())
        }
      })()
      // const defaultMessages = [
      //   {
      //     id: "1",
      //     type: "received" as const,
      //     sender: selectedChat?.name,
      //     avatar: selectedChat?.avatar,
      //     content: "Hi there! How can I help you today?",
      //     time: "5 minutes ago",
      //   }
      // ]
      // setChatMessages(selectedChatId, defaultMessages)
    }
  }, [selectedChatId, selectedChat, chatMessages, setChatMessages])

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [chatMessages, selectedChatId])

  // On mobile, if sidebar is open and covering the whole screen, hide chat area content
  if (isMobileView && isSidebarOpen) {
    return <div className="hidden md:block flex-1 bg-background"></div>
  }

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
      <div ref={scrollContainerRef} className="flex-1 p-4 overflow-y-auto">
        <MessageList messages={chatMessages[selectedChatId] || []} />
      </div>
      <MessageInput />
    </div>
  )
}

