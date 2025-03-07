import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler( async (req,res,next) => {
    const token = req.cookies?.accessToken
    if(token){
        const decodedInfo = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedInfo?._id).select(
            "-password -refreshToken"
        )
        if(user){
            req.user = user;
            next();
        }else{
            throw new ApiError(400,"Invalid Access Token")
        }
    }else{
        throw new ApiError(400,"Unauthorized request")
    }
})