import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Search, UserPlus, MessageSquarePlus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const mockFriends = [
  { id: 1, name: "Alex Smith", username: "@alex", status: "online", avatar: "/avatars/alex.png" },
  { id: 2, name: "Jamie Brown", username: "@jamie", status: "offline", avatar: "/avatars/jamie.png" },
  { id: 3, name: "Taylor Johnson", username: "@taylor", status: "online", avatar: "/avatars/taylor.png" },
]

export default function CreateChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreatingChat, setIsCreatingChat] = useState(false)
  const [isAddingFriend, setIsAddingFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null)
  const [newFriendUsername, setNewFriendUsername] = useState("")

  const filteredFriends = mockFriends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateChat = () => {
    if (!selectedFriend) return
    setIsCreatingChat(true)
    // Simulate API call
    setTimeout(() => {
      setIsCreatingChat(false)
      setIsOpen(false)
      setSelectedFriend(null)
      // Here you would navigate to the new chat
    }, 1000)
  }

  const handleAddFriend = () => {
    if (!newFriendUsername) return
    setIsAddingFriend(true)
    // Simulate API call
    setTimeout(() => {
      setIsAddingFriend(false)
      setNewFriendUsername("")
      // Show success feedback
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="flex items-center gap-2 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <PlusCircle className="w-4 h-4" />
          
          Create a chat
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Chat</DialogTitle>
          <DialogDescription>
            Start a new chat or add a friend
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="new-chat" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="new-chat" className="flex items-center gap-2">
              <MessageSquarePlus className="w-4 h-4" />
              New Chat
            </TabsTrigger>
            <TabsTrigger value="add-friend" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Add Friend
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-chat" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search friends..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="max-h-[300px] overflow-y-auto space-y-2 border rounded-md p-2">
              {filteredFriends.length > 0 ? filteredFriends.map(friend => (
                <div 
                  key={friend.id}
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    selectedFriend === friend.id.toString() ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                  onClick={() => setSelectedFriend(friend.id.toString())}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                      friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    } border-2 border-white dark:border-gray-900`}></span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{friend.name}</p>
                    <p className="text-sm text-muted-foreground">{friend.username}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-6 text-muted-foreground">
                  No friends found matching "{searchQuery}"
                </div>
              )}
            </div>
            
            {selectedFriend && (
              <div className="flex items-center gap-2">
                <span>Selected:</span>
                <Badge variant="secondary">
                  {mockFriends.find(f => f.id.toString() === selectedFriend)?.name}
                </Badge>
              </div>
            )}

            <DialogFooter>
              <Button 
                type="button" 
                onClick={handleCreateChat} 
                disabled={!selectedFriend || isCreatingChat}
              >
                {isCreatingChat ? "Creating..." : "Start Chat"}
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="add-friend">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="friendUsername">Friend's Username</Label>
                <div className="flex gap-2">
                  <Input
                    id="friendUsername"
                    placeholder="@username"
                    className="flex-1"
                    value={newFriendUsername}
                    onChange={(e) => setNewFriendUsername(e.target.value)}
                  />
                  <Button 
                    onClick={handleAddFriend} 
                    disabled={!newFriendUsername || isAddingFriend}
                  >
                    {isAddingFriend ? "Adding..." : "Add"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter your friend's username to send them a friend request
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
