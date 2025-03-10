import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SearchBar() {
  return (
    <div className="p-4 border-b border-gray-800 flex gap-2">
      <div className="relative flex-1">
        <Input type="text" placeholder="Search chat..." className="bg-background border-gray-300 dark:border-gray-800 pl-10 w-full" />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="border-gray-800">
              <Filter className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Filter chats</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

