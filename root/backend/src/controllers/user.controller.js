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

    const {username, email, password} = req.body

    // atleast ek pair tho hona chaiye
    if((username && password) || (email && password)){
        const user = await User.findOne({
            $or:[{ username }, { email }]
        })
        // console.log(user);
        if(user){
            const valid = await user.isPasswordMatched(password)
            if(valid){
 
                const accessToken = await user.generateAccessToken();
                const refreshToken = await user.generateRefreshToken();
                // console.log(refreshToken)
                user.refreshToken = refreshToken
                await user.save({ validateBeforeSave: false })

                // console.log(user.refreshToken)
                const options = {
                    httpOnly:true,
                    secure:true
                }

                const data = {
                    _id:user._id,
                    username:user.username,
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                }

                // console.log(data);
                return res.status(200)
                .cookie("accessToken",accessToken,options)
                .cookie("refreshToken",refreshToken,options)
                .json(
                    new ApiResponse(200,{
                        user:data,refreshToken,refreshToken
                    },"User Logged In Successfully")
                )
            }else{
                throw new ApiError(400,"Invalid Credentials")
            }
        }else{
            throw new ApiError(400,"User Not Registered")
        }
    }else{
        throw new ApiError(400,"Incomplete Information")
    }
})

const logoutUser = asyncHandler( async (req,res)=>{
    // console.log();
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:1
            }
        }
    )
    const options = {
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200,"User LoggedOut Successfully")
    )
})

export { registerUser, loginUser, logoutUser }