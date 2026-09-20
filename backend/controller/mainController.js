
import { Card }  from '../models/Cards.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { User } from '../models/User.js';


  const getIndex = asyncHandler(async(req,res) => {
    const user = await User.findById(req?.user?._id).select('-password -refreshToken')
    if(!user){
      throw new ApiError(400, 'User not found')
    }
    const totalCards = await Card.countDocuments({user: req.user._id})
    return res.status(200).json(new ApiResponse(200, {data: user, totalCards}, 'Total cards fetched successuflly'))

  })
export {getIndex}
