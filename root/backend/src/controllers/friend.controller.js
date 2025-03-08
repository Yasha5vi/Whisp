import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// all function tested and working correctly 
// but some edge cases needs to be solved later 

const addFriend = asyncHandler( async(req,res) =>{
    const senderId = req.user._id
    const { receiverId } = req.body
    // console.log(senderId);
    // console.log(receiverId);

    const updateReceiver = await User.findByIdAndUpdate(receiverId,
        { $addToSet:{ friendRequestReceived:senderId } },
        { new:true }
    );
    const updateSender = await User.findByIdAndUpdate(senderId,
        { $addToSet:{ friendRequestSent:receiverId } },
        { new:true }
    );
    if(!updateReceiver || !updateSender){
        throw new ApiError(500,"Error sending friend request")
    }else{
        return res.status(200).json(
            new ApiResponse(200,"Friend Request Sent")
        )
    }
})


const removeFriend = asyncHandler( async(req,res)=>{
    // console.log("removeFriend working")
    const userId = req.user._id;
    const { friendId } = req.body;

    const updateUser = await User.findByIdAndUpdate(userId,
        { $pull:{friends:friendId} },
        { new:true }
    )
    const updateFriend = await User.findByIdAndUpdate(friendId,
        { $pull :{friends:userId} },
        { new:true }
    )

    if(!updateUser || !updateFriend){
        throw new ApiError(500,"Error removing friend")
    }
    return res.status(200).json(
        new ApiResponse(200,"Friend Removed Successfully")
    )
})

const acceptFriendRequest = asyncHandler( async(req,res)=>{
    // console.log("acceptFriendRequest working")
    // me reciever
    const receiverId = req.user._id
    const { senderId } = req.body
    const updateReceiver = await User.findByIdAndUpdate(receiverId,
        {
            $pull:{friendRequestReceived:senderId},
            $addToSet:{friends:senderId}
        },
        { new: true }
    );
    const updateSender = await User.findByIdAndUpdate(senderId,
        {
            $pull:{friendRequestSent:receiverId},
            $addToSet:{friends:receiverId}
        },
        { new:true }
    );

    if(!updateReceiver || !updateSender){
        throw new ApiError(500,"Error accepting friend request ")
    }else{
        return res.status(200).json(
            new ApiResponse(200,"Friend Request Accepted")
        )
    }
})

const rejectFriendRequest = asyncHandler( async(req,res) => {
    // console.log("RejectFriendRequest working");
    const receiverId = req.user._id
    const { senderId } = req.body;

    const updateReceiver = await User.findByIdAndUpdate(
        receiverId,
        { $pull: { friendRequestReceived: senderId } },
        { new: true }
    );
    const updateSender = await User.findByIdAndUpdate(
        senderId,
        { $pull: { friendRequestSent: receiverId } },
        { new: true }
    );

    if(!updateReceiver || !updateSender){
        throw new ApiError(500,"Error rejecting friend request")
    }else{
        return res.status(200).json(
            new ApiResponse(200,"Friend Request Rejected")
        )
    }
})

const getSentRequest = asyncHandler( async(req,res) => {
    // console.log("retrieveSentRequest Working");
    const user = await User.findById(req.user._id)
    .populate("friendRequestSent","username email firstName lastName");
    if(!user){
        throw new ApiError(404, "User not found");
    }
    // console.log(user);
    return res.status(200).json(
        new ApiResponse(200,user.friendRequestSent, "Sent friend requests retrieved successfully")
    );
})

const getReceivedRequest = asyncHandler( async(req,res) => {
    // console.log("retrieveReceivedRequest Working")
    const user = await User.findById(req.user._id)
    .populate("friendRequestReceived","username email firstName lastName");

    if(!user){
        throw new ApiError(404, "User not found")
    }
    return res.status(200).json(
        new ApiResponse(200,user.friendRequestReceived,"Received friend requests retrieved successfully")
    )
})

const getFriends = asyncHandler( async(req,res) => {

    const user = await User.findById(req.user._id);
    if(!user){
        throw new ApiError(500,"Error retreiving friends");
    }else{
        const friends = user.friends;
        return res.status(200).json(
            new ApiResponse(200,friends,"Friends retrieved Successfully")
        )
    }
    
})

export {
    addFriend,
    removeFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    getReceivedRequest,
    getSentRequest,
    getFriends
}
