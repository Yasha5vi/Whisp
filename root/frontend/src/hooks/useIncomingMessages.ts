import { useEffect } from "react";
import { useSocket } from "@/contexts/socketContext";
import { useChat } from "@/contexts/chat-context";
import { useAuth } from "@/contexts/authContext";
import axios from "axios";
import { useFriends } from "@/contexts/friendContext";

interface FriendRequestUpdatePayload {
  action: "accepted" | "rejected" | "cancelled" | "sent";
  senderId: string;   // The ID of the user who originally sent the request
  receiverId: string; // The ID of the user who accepted/rejected it
}

export default function useIncomingMessages() {
  const socket = useSocket();
  const { setChatMessages, chatMessages, chats, setChats } = useChat();
  const { user } = useAuth();
  const { updateFriendRequestsSent, updateFriendRequestsReceived, addFriend } = useFriends();

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message: any) => {
      // Determine type based on the sender
      const uniqueId = message._id || Date.now().toString();
      const messageWithType = {
        ...message,
        id:uniqueId,
        type: message.senderId === user._id ? "sent" : "received",
      };

      // Update messages for the corresponding conversation room
      setChatMessages(message.conversationId, [
        ...(chatMessages[message.conversationId] || []),
        messageWithType,
      ]);
    });

    socket.on("conversationCreated", async (newConversation) => {
      // console.log(newConversation);
      const newChat = newConversation;
      let rcvId = "";
      let rcv_name = "";
      if(newChat.participants[0] === user._id){
        rcvId = newChat.participants[1];
      }else{
        rcvId = newChat.participants[0];
      }
      // console.log(rcvId);
      try{
        const res = await axios.post("http://localhost:3000/api/message/getUser",{
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
      socket.emit("joinRoom",newChat._id);
      const newItem =  {
        _id:newChat._id,
        uId:rcvId,
        avatar:"/placeholder.svg?height=40&width=40",
        name:rcv_name,
        lastMessage: newChat.lastMessage?.content || "No messages yet",
        time: new Date(newChat.updatedAt).toLocaleDateString(), 
      };

      setChats(prevChats => [...prevChats, newItem]);
    });

    socket.on("friendRequestUpdate", async (data: FriendRequestUpdatePayload) => {
      // console.log("change in request list");
      // console.log(data);
      if (data.action === "sent" && data.receiverId === user._id) {
        try{
          const res = await axios.post("http://localhost:3000/api/message/getUser",{
            rcvId:data.senderId
          },{withCredentials:true});
          // console.log(res);
          const id = res.data.data._id;
          const name = res.data.data.firstName+' '+res.data.data.lastName;
          const username = res.data.data.username;

          updateFriendRequestsReceived((prev) => [
            ...prev,
            {
              id: id,
              name: name,    
              username: username, 
              status: "received",
              createdAt: new Date(),
            },
          ]);
        }catch(error){
          console.log("Error updating request via socket",error);
        }
      }else if(data.action === "accepted"){

        try {
          const res = await axios.post("http://localhost:3000/api/message/getUser", {
            rcvId: data.receiverId,
          }, { withCredentials: true });
          const friendData = {
            id: res.data.data._id,
            name: res.data.data.firstName + ' ' + res.data.data.lastName,
            avatar: "/placeholder.svg?height=40&width=40",
            username: res.data.data.username,
          };
          addFriend(friendData);
          
        } catch (error) {
          console.log("Error fetching friend data on accepted:", error);
        }
      }else{
        updateFriendRequestsSent((prev) => {
          const newSent = prev.filter((req) => req.id !== data.receiverId);
          return newSent;
        });
        updateFriendRequestsReceived((prev) => {
          const newReceived = prev.filter((req) => req.id !== data.senderId);
          return newReceived;
        });
      }
    });

    return () => {
      socket.off("newMessage");
      socket.off("conversationCreated");
      socket.off("friendRequestUpdate");
    };
  }, [socket, setChats , setChatMessages, chatMessages, user]);
}
