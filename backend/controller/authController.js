import {User }from '../models/User.js'
import {ApiError} from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'

const register = asyncHandler (async (req,res) => {
   const {userName,email,password} = req.body
   const existingUser = await User.findOne({
    $or:[{userName}, {email}]
   })
   if(existingUser){
    throw new ApiError(409, 'User already exists')
   }
   const user = await User.create({
    userName,
    email,
    password

   })
   const createdUser = await User.findById(user._id).select('-password -refreshToken')
    if(!createdUser){
         throw new ApiError(500, 'Error fetching created user')
     }
     return res.status(200).json(
      new ApiResponse(201, createdUser, 'User registered Successfully')
     )

})







export {register}