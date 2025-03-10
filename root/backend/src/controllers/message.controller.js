import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const findOrCreateConversation = async(userId1,userId2)=>{
    const participants = [userId1,userId2].sort();

    // chat search kr
    let conversation = await Conversation.findOne(
        {
            participants,
            type:"one-to-one"
        }
    ) 
    // nhi mile tho bna 
    if(!conversation){
        conversation = new Conversation(
            {
                type:"one-to-one",
                participants,
            }
        );
        await conversation.save();
    }
    return conversation
}

const sendMessage = asyncHandler( async(req,res)=>{
    // console.log("sendMessage working");
    const senderId = req.user._id;
    const { receiverId, content } = req.body;
    
    if(receiverId && content){
        // chat find kr and message bnake return kra de 
        const conversation = await findOrCreateConversation(senderId,receiverId);
        const newMessage = new Message(
            {
                conversationId:conversation._id,
                senderId:senderId,
                content:content
            }
        );
        await newMessage.save();
        conversation.lastMessage = {
            content,
            createdAt:newMessage.createdAt
        }
        await conversation.save();

        const io = req.app.get("io");
        io.to(receiverId).emit("message", newMessage);
        // console.log("hree");
        return res.status(200).json(
            new ApiResponse(200,newMessage,"Message Sent Successfully")
        );

    }else{
        throw new ApiError(500,"Error Sending Message ");
    }
});

const getMessage = asyncHandler( async(req,res)=>{
    // console.log("getMessage working");
    const { conversationId } = req.query;
    // needs to be updated later
    const page = 0;
    const limit = 20;
    // console.log(conversationId);
    const messages = await Message.find({conversationId})
    .sort({createdAt:-1})
    .skip(page*limit)
    .limit(limit);
   
    if(messages){
        return res.status(200).json(
            new ApiResponse(200,messages,"Messages fetched successfully")
        )
    }else{
        throw new ApiError(500,"Error fetching Messages");
    }
})

const getChats = asyncHandler( async(req,res)=>{
    // console.log("getChats working");
    const userId = req.user._id;
    const chats = await Conversation.find({
        participants:userId
    }).sort({ updatedAt:-1 });
    
    if(chats){
        return res.status(200).json(
            new ApiResponse(200,chats,"Chats fetched Successfully")
        )
    }else{
        throw new ApiError(500,"Error fetching Chats");
    }
})

const deleteChats = asyncHandler( async(req,res)=>{
    console.log("delete Chats working")
    // const { conversationId } = req.body;
    // const deleteConv = await Conversation.findByIdAndDelete(conversationId);
    // const deleteMsg = await Message.deleteMany({conversationId});

    // // deleteMsg return count so directly pass nhi kr sakte
    // if(!deleteConv){
    //     throw new ApiError(500,"Error Deleting Chats");
    // }else{
    //     return res.status(200).json(
    //         new ApiResponse(200,"Chat Deleted Successfully")
    //     )
    // }
})

const createGroupChatHandler = asyncHandler(async (req, res) => {
    console.log("create Group chat working");
    // further purposes if decied to extend the application
    // const { groupName, participants } = req.body;
    // if (!groupName || !participants || !Array.isArray(participants) || participants.length < 2) {
    //     throw new ApiError(400,"Provide a group name and at least 2 participants.");
    // } 
    // const conversation = new Conversation({
    //   type: "group",
    //   groupName,
    //   participants,
    //   updatedAt: new Date(),
    // });

    // await conversation.save();
    // return res.status(200).json(
    //     new ApiResponse(200,conversation,"Group chat created Successfully")
    // )
});

export {
    sendMessage,
    getMessage,
    getChats,
    deleteChats,
    createGroupChatHandler,
}