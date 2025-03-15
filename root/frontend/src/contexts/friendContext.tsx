import React, { createContext, useState, useContext, ReactNode } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authContext";
import { API_URL } from "@/config/urlConfig";

// Define the Friend interface
export interface Friend {
    id: string;
    name: string;
    avatar: string;
    username: string;
    // Optionally add more fields (e.g., status, online, etc.)
}

// Define the FriendRequest interface
export interface FriendRequest {
    id: string;
    name:string;
    username:string;
    status: "sent" | "received" ;
    createdAt: Date;
}

// Define the FriendsContext type
interface FriendsContextType {
    friends: Friend[];
    friendRequestsSent: FriendRequest[];
    friendRequestsReceived: FriendRequest[];
    addFriend: (friend: Friend) => void;
    removeFriend: (friendId: string) => void;
    sendFriendRequest: ({id,name,username}:any) => void;
    acceptFriendRequest: (senderId: string) => void;
    rejectFriendRequest: (senderId: string) => void;
    unsentFriendRequest: (senderId: string) => void;
    updateFriendRequestsSent: React.Dispatch<React.SetStateAction<FriendRequest[]>>;
    updateFriendRequestsReceived: React.Dispatch<React.SetStateAction<FriendRequest[]>>;
    // Optionally, you can add more functions to update or reset these states
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

interface FriendsProviderProps {
    children: ReactNode;
}

export const FriendsProvider = ({ children }: FriendsProviderProps) => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [friendRequestsSent, setFriendRequestsSent] = useState<FriendRequest[]>([]);
    const [friendRequestsReceived, setFriendRequestsReceived] = useState<FriendRequest[]>([]);
    const user = useAuth();

    useEffect(() => {
        if (!user) return;

        const fetchFriendsData = async () => {
            try {
                const res = await axios.get(API_URL+"/api/friends/getFriend",{ 
                    withCredentials: true 
                });
                // console.log(res.data.data);
                if(res){
                    const friendJson = await Promise.all((res.data.data).map(async (id:any)=>{
                        try{
                            const userfriend = await axios.post(API_URL+"/api/message/getUser",{
                                rcvId:id
                            },{withCredentials:true})
                            if(userfriend){
                                const name = userfriend.data.data.firstName+' '+userfriend.data.data.lastName;
                                const id = userfriend.data.data._id;
                                const username = userfriend.data.data.username;
                                return {
                                    name:name,
                                    id:id,
                                    username:username
                                }
                                // console.log(userfriend);
                            }else{
                                throw new Error("error fetching friends");
                            }
                        }catch(error){
                            console.error("Error : ",error);
                        }  
                    }))
                    setFriends(friendJson);
                    // setFriends(res.data.data);
                }else{
                    throw new Error("error fetching friends");
                }
                // setFriendRequestsReceived(requestsRes.data.requests);
            } catch (error) {
                console.error("Error fetching friends data:", error);
            }
        };
        
        const fetchFriendSentRequest = async () =>{
            try{
                const res = await axios.get(API_URL+"/api/friends/getSent",{
                    withCredentials:true
                })
                if(res){
                    const friendRequestSentJson = await Promise.all((res.data.data).map(async (id:any)=>{
                        try{
                            const userfriend = await axios.post(API_URL+"/api/message/getUser",{
                                rcvId:id
                            },{withCredentials:true})
                            if(userfriend){
                                const name = userfriend.data.data.firstName+' '+userfriend.data.data.lastName;
                                const id = userfriend.data.data._id;
                                const username = userfriend.data.data.username;
                                return {
                                    name:name,
                                    id:id,
                                    username:username,
                                    status:"sent"
                                }
                                // console.log(userfriend);
                            }else{
                                throw new Error("error fetching friends");
                            }
                        }catch(error){
                            console.error("Error : ",error);
                        }  
                    }))
                    setFriendRequestsSent(friendRequestSentJson);
                    // console.log(friendRequestSentJson);

                }else{
                    throw new Error("error fetching friends sent request");
                }
            }catch(error){
                console.log("Error fetching friend request details",error);
            }
        }
        
        const fetchFriendReceivedRequest = async () =>{
            try{
                const res = await axios.get(API_URL+"/api/friends/getReceived",{
                    withCredentials:true
                })
                if(res){
                    const friendRequestReceivedJson = await Promise.all((res.data.data).map(async (id:any)=>{
                        try{
                            const userfriend = await axios.post(API_URL+"/api/message/getUser",{
                                rcvId:id
                            },{withCredentials:true})
                            if(userfriend){
                                const name = userfriend.data.data.firstName+' '+userfriend.data.data.lastName;
                                const id = userfriend.data.data._id;
                                const username = userfriend.data.data.username;
                                return {
                                    name:name,
                                    id:id,
                                    username:username,
                                    status:"received"
                                }
                                // console.log(userfriend);
                            }else{
                                throw new Error("error fetching friends");
                            }
                        }catch(error){
                            console.error("Error : ",error);
                        }  
                    }))
                    setFriendRequestsReceived(friendRequestReceivedJson);
                    // console.log(friendRequestSentJson);
                }else{
                    throw new Error("error fetching friends sent request");
                }
            }catch(error){
                console.log("Error fetching friend request details",error);
            }
        }
        fetchFriendsData();
        fetchFriendSentRequest();
        fetchFriendReceivedRequest();
    }, [user]);

    // Function to add a friend (e.g., after accepting a friend request)
    const addFriend = (friend: Friend) => {
        setFriends((prevFriends) => [...prevFriends, friend]);
    };

    // Remove a friend by ID
    const removeFriend = (friendId: string) => {
        setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
    };

    // Send a friend request
    const sendFriendRequest = async ({id,name,username}:any) => {
        try{
            // console.log(id+' '+username+' '+name);
            const res = await axios.post(API_URL+"/api/friends/send",{
                receiverId:id
            },{withCredentials:true});
            
            const newRequest: FriendRequest = {
                id: id,
                name:name,
                username:username,
                status: "sent",
                createdAt: new Date(),
            };
            setFriendRequestsSent((prev) => [...prev, newRequest]);
        }catch(error){
            console.error("Error : ",error);
        }
    };

    // Accept an incoming friend request
    const acceptFriendRequest = async (senderId: string) => {
        try {
            // console.log(senderId);
            const res = await axios.post(API_URL+"/api/friends/accept", { 
                senderId 
            }, { withCredentials: true });
    
            setFriendRequestsReceived((prev) => prev.filter((req) => req.id !== senderId));
    
            const acceptedRequest = friendRequestsReceived.find((req) => req.id === senderId);
            if (acceptedRequest) {
                addFriend({
                    id: acceptedRequest.id,
                    name: acceptedRequest.name,
                    username: acceptedRequest.username,
                    avatar: "", 
                });
            }
        } catch (error) {
            console.error("Error accepting friend request:", error);
        }
    };

    // Reject an incoming friend request
    const rejectFriendRequest = async(senderId: string) => {
        try {
            // console.log(senderId);
            await axios.post(API_URL+"/api/friends/reject", { 
                senderId 
            }, { withCredentials: true });
            setFriendRequestsReceived((prev) => prev.filter((req) => req.id !== senderId));
        } catch (error) {
            console.error("Error rejecting friend request:", error);
        }
    };

    const unsentFriendRequest = async (receiverId: string) => {
        try {
            // console.log(senderId)
            await axios.post(API_URL+"/api/friends/removeRequest", { 
                receiverId 
            }, { withCredentials: true });
            setFriendRequestsSent((prev) => prev.filter((req) => req.id !== receiverId));
        } catch (error) {
            console.error("Error unsending friend request:", error);
        }
    };

    return (
        <FriendsContext.Provider
            value={{
                friends,
                friendRequestsSent,
                friendRequestsReceived,
                addFriend,
                removeFriend,
                sendFriendRequest,
                acceptFriendRequest,
                rejectFriendRequest,
                unsentFriendRequest,
                updateFriendRequestsSent: setFriendRequestsSent,
                updateFriendRequestsReceived: setFriendRequestsReceived,
            }}
        >
            {children}
        </FriendsContext.Provider>
    );
};

// Custom hook to consume the FriendsContext
export function useFriends() {
    const context = useContext(FriendsContext);
    if (context === undefined) {
        throw new Error("useFriends must be used within a FriendsProvider");
    }
    return context;
}
