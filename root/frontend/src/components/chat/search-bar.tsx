import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useChat } from "@/contexts/chat-context"

export default function SearchBar() {
  const { chats, setChats } = useChat()
  const [searchQuery, setSearchQuery] = useState("")
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // If we have a full implementation, here we would filter the chats
    // This is a simple implementation for demonstration
    if (query.trim() === "") {
      // Reset filter when search is cleared
      setChats(chats.map(chat => ({ ...chat })))
    }
  }

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex gap-2 bg-white dark:bg-gray-950">
      <div className="relative flex-1">
        <Input 
          type="text" 
          placeholder="Search chat..." 
          className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 pl-10 w-full" 
          value={searchQuery}
          onChange={handleSearch}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="border-gray-200 dark:border-gray-700">
              <Filter className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="z-50">
            <p>Filter chats</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

