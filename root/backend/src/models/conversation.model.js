import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        type:{
            type:String,
            enum:["one-to-one","group"],
            required:true
        },
        participants:[
            {
                type:mongoose.Types.ObjectId,
                ref:"User",
                required:true
            }
        ],
        lastMessage: {
            content: { type: String },
            createdAt: { type: Date }
        }
    },{ timestamps:true }
)

conversationSchema.index({ participants: 1 });
conversationSchema.index({ updatedAt: -1 });
export const Conversation = mongoose.model("Conversation",conversationSchema);
