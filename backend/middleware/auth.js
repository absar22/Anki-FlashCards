import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const jwtVerify = asyncHandler(async(req,_,next) => {
   const token = req.cookies?.accessToken || req.headers?.authorization?.replace('Bearer ', '')
   if(!token){
    throw new ApiError(401, 'Unauthorized access"')
   }

   const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  //  console.log(decodedToken)
   const user = await User.findById(decodedToken?._id)
   if(!user){
     throw new ApiError(401, 'Invalid access token')
   }
   req.user = user
   next()
})
