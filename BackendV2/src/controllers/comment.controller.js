import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { comment } from '../models/comment.models.js'
import mongoose from "mongoose";
const writeComment = asyncHandler(async (req, res) => {
    if (!req.body || !req.params) throw new ApiError(400, "Request body not founded");
    const videoId = req.params.videoId;
    const { content, userId } = req.body;
    //? finding video

    const checkingvideo = await video.findById(videoId);
    if (!checkingvideo) throw new ApiError(404, "Video Not founded on this id");
    // finding user
    const checkingUser = await User.findById(userId);
    if (!checkingUser) throw new Error(404, "User not founded on the id");

    try {
        const newComment = await comment.create({
            content,
            video: checkingvideo,
            owner: checkingUser
        });
        res.status(201).json(new ApiResponse(201, "Comment Successfully created", newComment));
    } catch (error) {
        throw new ApiError(500, error || "Error while creating the new Comment");
    }
});
const updateComment = asyncHandler(async (req, res) => {
    if (!req.body) throw new ApiError(400, "Request body not passed");
    const { commentId, content } = req.body;
    // finding the previous comment to update its content
    try {
        const previousCommentAndUpdate = await comment.findByIdAndUpdate(commentId, {
            $set: {
                content
            }
        },
            { new: true }
        );
        return res.status(200).json(new ApiResponse(200, "comment Updated Successfully", previousCommentAndUpdate));
    } catch (error) {
        throw new ApiError(400, error || "failed to update the comment");
    }
});
const deleteComment = asyncHandler(async (req, res) => {
    if (!req.body) throw new ApiError(400, "Request Body not founded");
    const { commentId } = req.body;
    try {
        const deletingComment = await comment.findOneAndDelete(commentId);
        res.status(200).json(new ApiResponse(200, "comment deleted", deletingComment));
    } catch (error) {
        throw new ApiError(400, error || "Failed to delete the comment");
    }
});
const fetchComments = asyncHandler(async (req, res) => {
    if (!req.body) throw new Error(400, "Request body not founded");
    const { videoId } = req.body;
    if(!mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(404,"Invalid video Id");
    }
    const page = parseInt(req.body.page || 1);
    const limit = parseInt(req.body.limit || 1);
    try {
        const commentsOfThisVideo = await comment.aggregate([
            {
            $match: {
                video:new mongoose.Types.ObjectId(videoId),
            }
        },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: limit
            },
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    content: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'user.username': 1,
                    'user.avatar': 1
                }
            }
        ]);
        const totalComments = await comment.countDocuments({ video: videoId });
        const totalPages = Math.ceil(totalComments / limit);
        return res.status(200).json({
            success: true,
            commentsOfThisVideo,
            pagination: {
                currentPage: page,
                totalPages,
                totalComments,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        });
    } catch (error) {
        throw new ApiError(400, error || "comments can't be fetched");
    }
});

export {
    writeComment,
    updateComment,
    deleteComment,
    fetchComments
}