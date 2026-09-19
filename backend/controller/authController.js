
import {User }from '../models/User.js'
import {ApiError} from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import {asyncHandler} from '../utils/asyncHandler.js'

const generateAccessAndRefreshToken = async(userId) => {
  try{
    const user =  await User.findById(userId)
    const accessToken =  await user.generateAccessToken()
    // console.log("AccessToken :", accessToken)
    const refreshToken = await user.generateRefreshToken()
    // console.log("refreshToken :",refreshToken)
    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false})
    return {accessToken,refreshToken}
  }catch(_){
    throw new ApiError(500, "Something went wrong while generateing refresh and access token")
  }

}

const cookiesOptions = {
  httpOnly:true,    
  secure:true   
}

const register = asyncHandler (async (req,res) => {
   const {userName,fullname,email,password} = req.body
   const existingUser = await User.findOne({
    $or:[{userName}, {email}]
   })
   if(existingUser){
    throw new ApiError(409, 'User already exists')
   }
   const user = await User.create({
    userName,
    email,
    fullname,
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
    $or:[{email}]
  })
   if(!user){
     throw new ApiError(404, 'User not existited')
   } 
   const isPasswordValid = await user.comparePassword(password)
   if(!isPasswordValid){
    throw new ApiError(404,  'Incorrect password')
   }

   const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
   const loggedInUser = await User.findById(user._id).select('-password -refreshToken')

     res.status(200).cookie('accessToken', accessToken,cookiesOptions).cookie('refreshToken', refreshToken,cookiesOptions)
   .json(new ApiResponse(201,  {user: loggedInUser, accessToken, refreshToken}, 'Account logged successfully'))
   
})

const logout = asyncHandler(async(req,res) => {
   await User.findByIdAndUpdate(req.user._id, {
    $set: {refreshToken: undefined}
   })
 
   res.status(200)
   .clearCookie('accessToken', cookiesOptions)
   .clearCookie('refreshToken', cookiesOptions)
   .json(new ApiResponse(200, {}, 'Logged out successfully'))
})

const refreshAccessToken = asyncHandler(async(req,res) => {
  const clientRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  if(!clientRefreshToken){
     throw new ApiError(400, 'refresh token is requried')
  }
  try {
    // verify refrestoken
    const decodedToken =  jwt.verify(clientRefreshToken, process.env.ACCESS_TOKEN_SECRET)

    // find user from decodedToken
    const user = await User.findById(decodedToken._id)
    if(!user){
      throw new ApiError(400, 'User not found')
    }

    // compare refreshtoken of client and your db saved refreshtoken
    if(clientRefreshToken !== user.refreshToken){
      throw new ApiError(404, 'Refresh token is expired')
    }
  //  if everything is file create a new refrest and access toiken for the client
  const {accessToken,refreshToken} = generateAccessAndRefreshToken(user._id)

  return res.status(200).cookie('accessToken', accessToken, cookiesOptions).cookie('refreshToken', refreshToken,cookiesOptions)
  .json(new ApiResponse(200, {data:accessToken,refreshToken}, 'Access token refreshed successfully'))

    
  } catch (err) {
    throw new ApiError(400, err?.message ||'invalid refreshToken')
  }
})

const updateCurrentPassword = asyncHandler(async(req,res) => {
  const {oldPassword,newPassword,confirmPassword} = req.body
  if(newPassword !== confirmPassword){
    throw new ApiError(401, 'New password and confirm password d0 not match')
  }
  const user = await User.findById(req?.user?._id)
  if(!user){
    throw new ApiError(400, 'User is not existed')
  }
  const isPasswordCorrect = comparePassword(oldPassword)
  if(!isPasswordCorrect){
    throw ApiError(400, 'Invalid old password')
  }
  user.password = newPassword
  user.save({validateBeforeSave:false})
  return res.status(201).json(new ApiResponse(201,{},'Password updated succesfully'))
})
const getCurrentUser = asyncHandler(async(req,res) => {
  const user = await User.findById(req?.user?._id).select('-password -refreshToken')
  if(!user){
    throw new ApiError(400,'User not found')
  }
  return res.status(201).json(new ApiResponse(201,user,'User fetched successfully'))
})

const updateUser = asyncHandler(async(req,res) => {
  const {fullname, email} = req.body
  const user = await User.findByIdAndUpdate(req?.user?._id, {
    $set:{
      fullname,
      email
    }
  },{new:true})

  if(!user){
    throw new ApiError(400, 'No user found')
  }
  return res.status(201).json(new ApiResponse(201, 'User created succesfully'))
})

export {register,login,logout, refreshAccessToken,updateCurrentPassword,getCurrentUser,updateUser}