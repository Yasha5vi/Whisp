import { useState } from "react";
import { Bell, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateChat from "@/components/chat/create-chat";
import { useFriends } from "@/contexts/friendContext";

export default function ChatHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const { 
    friendRequestsReceived, 
    friendRequestsSent, 
    acceptFriendRequest, 
    rejectFriendRequest, 
    unsentFriendRequest 
  } = useFriends();


  const receivedRequests = friendRequestsReceived
  const sentRequests = friendRequestsSent;

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-800 bg-background relative">
      <h1 className="text-2xl font-bold">Inbox</h1>
      <div className="flex items-center gap-4 relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="relative flex items-center justify-center" onClick={() => setIsOpen(true)}>
                <Bell className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[400px] flex flex-col items-center justify-center">
            <DialogHeader>
              <DialogTitle>Friend Requests</DialogTitle>
              <DialogDescription>Manage your incoming and outgoing friend requests.</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="received" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="received" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Received
                </TabsTrigger>
                <TabsTrigger value="sent" className="flex items-center gap-2">
                  Sent
                </TabsTrigger>
              </TabsList>
              <TabsContent value="received" className="space-y-2">
                {receivedRequests.length > 0 ? receivedRequests.map((friend) => (
                  <FriendTile key={friend.id} {...friend} type="received" />
                )) : (
                  <p className="text-muted-foreground text-center">No friend requests received.</p>
                )}
              </TabsContent>
              <TabsContent value="sent" className="space-y-2">
                {sentRequests.length > 0 ? sentRequests.map((friend) => (
                  <FriendTile key={friend.id} {...friend} type="sent" />
                )) : (
                  <p className="text-muted-foreground text-center">No friend requests sent.</p>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        <Avatar className="h-8 w-8 border border-gray-700">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>

        <CreateChat />
      </div>
    </header>
  );
}

function FriendTile({ id, name, username, status }:any) {
  const {
    acceptFriendRequest, 
    rejectFriendRequest, 
    unsentFriendRequest } = useFriends();

  const handleAcceptClick = ()=>{
    acceptFriendRequest(id);
  }

  const handleRejectClick = ()=>{
    rejectFriendRequest(id);
  }

  const handleUnsentClick = ()=>{
    unsentFriendRequest(id);
  }
  // console.log(status);
  return (
    <div className="bg-white shadow-lg rounded-lg p-3 flex justify-between items-center border border-gray-300">
      <div>
        <span className="font-medium text-black">{name}</span>
        <span className="block text-sm text-gray-500">@{username}</span>
      </div>
      <div className="flex space-x-2">
        {status === "received" ? (
          <>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-green-600"
              onClick={handleAcceptClick}
            >✔</Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-red-600"
              onClick={handleRejectClick}
            >✖</Button>
          </>
        ) : (
          <Button 
            size="sm" 
            variant="outline" 
            className="text-gray-600"
            onClick={handleUnsentClick}
          >↩</Button>
        )}
      </div>
    </div>
  );
}
