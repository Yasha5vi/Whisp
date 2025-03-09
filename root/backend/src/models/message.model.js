import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
    {
        conversationId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Conversation",
            required:true
        },
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        content:{
            type:String,
            required:true,
        },
    },{ timestamps:true }
)

// searching T.C kam hogi
messageSchema.index({ conversationId: 1 , createdAt: -1});
export const Message = mongoose.model("Message",messageSchema);