import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) =>{

    const {firstName, lastName, email, username, password} = req.body
    const details = [firstName,lastName,email,username,password]
    
    if(details.some(field => !field || field.trim() === "") || (!details[2].includes("@gmail.com"))){
        throw new ApiError(400,"Some details are missing or are not in correct format")
    }

    // console.log(details)
    // user pehele se hai 
    const exits = await User.findOne({
        $or : [{ username }, { email }]
    })
    if(exits){
        throw new ApiError(409,"User already exists");
    }

    const newUser = await User.create({
        firstName,
        lastName,
        email,
        username:username.toLowerCase(),
        password
    })
    
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )
    if(createdUser){
        // console.log(createdUser)
        return res.status(200).json(
            new ApiResponse(200,createdUser,"user created successfully")
        )
    }else{
        throw new ApiError(500,"DB is not working properly")
    }
    
})

const loginUser = asyncHandler( async(req, res)=>{
    res.status(200).json({
        message:"login here"
    })
})

export { registerUser , loginUser }