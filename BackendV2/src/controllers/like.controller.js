import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";
import { video } from "../models/video.models.js";
import { comment } from "../models/comment.models.js";
import { like } from "../models/like.models.js";
const createLike=asyncHandler(async(req,res)=>{
    if(!req.body) throw new ApiError(400,"Request Body not found");
    const {userId,likeable,likeableModel}=req.body;
    const user = await User.findById(userId);
    if(!user) throw new ApiError(404,"uer not found");
    let content = await video.findById(likeable._id);
    if(!content){
        content = await comment.findById(likeable._id);
    }
    //?
    try{
        const newLike = await like.create({
            user,
            likeable:content._id,
            likeableModel:content._id
        });
        return res.status(201).json(new ApiResponse(201,"new Like published",newLike));
    }catch(error){
        throw new ApiError(400,error || "can't like this medium..");
    }
});
const removeLike = asyncHandler(async(req,res)=>{
    if(!req.body) throw new ApiError(400,"Request Body not found");

});
export {createLike,removeLike};