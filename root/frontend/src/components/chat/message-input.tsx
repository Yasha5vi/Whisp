import { KeyboardEvent } from "react"
import { Smile, Paperclip, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useChat } from "@/contexts/chat-context"
import axios from "axios"
import useIncomingMessages from "@/hooks/useIncomingMessages"
import { useSocket } from "@/contexts/socketContext"
import { API_URL } from "@/config/urlConfig"

export default function MessageInput() {
  const { selectedChat, currentMessage, setCurrentMessage, sendMessage } = useChat()
  const socket = useSocket();

  const handleSendMessage = async () => {
    if (currentMessage.trim()) {
      try {
        // Code that might throw an error.
        const receiverId = selectedChat?.uId
        const content = currentMessage;
        const res = await axios.post(API_URL+"/api/message/send",{
          receiverId,content
        },{ withCredentials:true })
        if(res && socket){
          // console.log(res);
          sendMessage(currentMessage)
          // socket.emit("newMessage", {
          //   roomId: selectedChat?._id,
          //   message: res.data.data, // the message object returned from the backend
          // });
        }else{
          throw new Error("Message not sent");
        }
      } catch (error: unknown) {
        // Type narrow the error.
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }
  }
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="p-4 border-t border-gray-800 h-20">
      <div className="flex items-center gap-2 bg-background rounded-lg p-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Input
          type="text"
          placeholder="Message..."
          className="bg-transparent border-0 flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 dark:text-white"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <Smile className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <Paperclip className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Attach file</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="icon" 
                className="bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800"
                onClick={handleSendMessage}
              >
                <Send className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

