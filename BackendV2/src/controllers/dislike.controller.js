import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {User} from '../models/user.models.js';
import {dislike} from '../models/dislike.models.js';
import { getContent } from "../helper/helperMethods.js";
const toggleDislike=asyncHandler(async(req,res)=>{
    if(!req.body) throw new ApiError(400,"Request body not found");
    const{userId,dislikeAble,dislikeAbleModel}=req.body;
    const userFinding = await User.findById(userId);
    if(!userFinding) throw new ApiError(400,"User not found");
    const content = await getContent(dislikeAble,dislikeAbleModel);
    if(!content) throw new ApiError(400,"Content not found...");
    //! existing dislike 
    const existingDislike = await dislike.findOne({
        user:userId,
        dislikeAble,
        dislikeAbleModel
    });
    if(existingDislike){
        await dislike.findOneAndDelete(existingDislike._id);
        return res.status(200).json(new ApiResponse(200,"dislike removed from this content",existingDislike));
    }else{
        const creatingDislike = await dislike.create({
            user:userId,
            dislikeAble,
            dislikeAbleModel
        });
        if(!creatingDislike) throw new ApiError(400,"unable to dislike");
        return res.status(200).json(new ApiResponse(200,"Disliked Successfully"));
    }
})
export {toggleDislike};