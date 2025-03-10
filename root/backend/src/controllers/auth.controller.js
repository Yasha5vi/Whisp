import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const checkAuthorized = asyncHandler(async(req,res)=>{
    return res.status(200).json(
        new ApiResponse(200,req.user,"User is Authorized")
    )
})

export { checkAuthorized }