import { asyncHandler } from "../utils/asyncHandler.js";

const loginUser = asyncHandler( async(req, res)=>{
    res.status(200).json({
        message:"login here"
    })
})

export { loginUser }