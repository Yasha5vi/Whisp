import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "@/contexts/chat-context"
import { useParams } from "react-router-dom"
import SearchBar from "@/components/chat/search-bar"
import ChatList from "@/components/chat/chat-list"
import axios from "axios"
import { useAuth } from "@/contexts/authContext"
import { useSocket } from "@/contexts/socketContext";
import { API_URL } from "@/config/urlConfig"

const getChats = async()=>{
  try {
    const res = await axios.get(API_URL+"/api/message/getChats",{
      withCredentials:true
    });
    if(res){
      return res.data.data;
    }else{
      throw new Error("Error fetching chats");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Now TypeScript knows error is an instance of Error
      console.error("Error message:", error.message);
    } else {
      console.error("An unexpected error occurred");
    }
  }
}

export default function ChatSidebar() {
  const { id } = useParams<{ id: string }>()
  const { setChats, selectChat, isMobileView, selectedChatId } = useChat()
  const initializedRef = useRef(false)
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    if (!initializedRef.current) {

      (async () => {
        const fetchedChats = await getChats();
        if (fetchedChats && socket) {
          const mappedChats = await Promise.all(
            fetchedChats.map(async (chat:any) => {
              let rcvId = "";
              let rcv_name = "";
              if(chat.participants[0] === user._id){
                rcvId = chat.participants[1];
              }else{
                rcvId = chat.participants[0];
              }
              // console.log(rcvId);
              try{
                const res = await axios.post(API_URL+"/api/message/getUser",{
                  rcvId },{
                  withCredentials:true
                })
                rcv_name = res.data.data.firstName+' '+res.data.data.lastName;
                // console.log(res.data.data);
                // console.log(rcv_name);
              }catch (error: unknown) {
                if (error instanceof Error) {
                  // Now TypeScript knows error is an instance of Error
                  console.error("Error message:", error.message);
                } else {
                  console.error("An unexpected error occurred");
                }
              }
              socket.emit("joinRoom",chat._id);
              return {
                _id:chat._id,
                uId:rcvId,
                avatar:"/placeholder.svg?height=40&width=40",
                name:rcv_name,
                lastMessage: chat.lastMessage?.content || "No messages yet",
                time: new Date(chat.updatedAt).toLocaleDateString(), 
              }
            })
          )
          // console.log(mappedChats);
          setChats(mappedChats);
        }
      })();
      // If URL has an ID, select that chat, otherwise select the first chat
      if (id) {
        selectChat(id)
      } else if (!selectedChatId) {
        selectChat("1") 
      }
      
      initializedRef.current = true
    }
  }, [setChats, socket, selectChat, id, selectedChatId])

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

