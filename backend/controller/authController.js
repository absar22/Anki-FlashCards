import {User }from '../models/User.js'
import {ApiError} from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'

const generateAccessAndRefreshToken = async(userId) => {
  try{
    const user =  await User.findById(userId)
    const accessToken =  await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false})
    return {accessToken,refreshToken}
  }catch(err){
    throw new ApiError(500, "Something went wrong while generateing refresh and access token")
  }

}

const options = {
  httpOnly:true,
  secure:true
}

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

const login = asyncHandler (async (req,res) => {
  const {email, password} = req.body
  const user = await User.findOne({
    $or:[{userName},{email}]
  })
   if(!user){
     throw new ApiError(404, 'User not existited')
   } 
   const isPasswordValid = await user.comparePassword(password)
   if(!isPasswordValid){
    throw new ApiError(404, 'Incorrect password')
   }

   const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
   const loggedInUser = await User.findById(user._id).select('-password -refreshToken')
   res.status(200).cookie('accessToken', accessToken ,options).cookie('refreshToken', refreshToken, options)
   .json(200, {user:  loggedInUser , accessToken, refreshToken}, 'Account logged successfully')
   
})







export {register,login}