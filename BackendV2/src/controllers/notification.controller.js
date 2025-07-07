import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { video } from '../models/video.models.js'
import { comment} from '../models/comment.models.js';
import { Like } from '../models/like.models.js';
import { dislike } from '../models/dislike.models.js';
import { User } from '../models/user.models.js';
import { Notifcation } from '../models/notification.models.js';
import { subscription } from '../models/subscription.models.js';
import mongoose from 'mongoose';
import { NotificationService } from '../utils/NotificationServiceClass.js';
const getNotificationContent = async (notificationModel, notifi) => {
    if (!["video", "comment", "like", "dislike"].includes(notificationModel))
        throw new ApiError(400, "Model is'nt found");
    let content;
    if (notificationModel === "video") {
        content = await video.findById(notifi);
    } else if (notificationModel === "comment") {
        content = await comment.findById(notifi);
    } else if (notificationModel === "like") {
        content = await Like.findById(notifi);
    } else if (notificationModel === "dislike") {
        content = await dislike.findById(notifi);
    }
    if (!content) throw new ApiError(400, "content not found");
    return content;
}
const notifyNewVideoUpload = asyncHandler(async (req, res) => {
    if (!req.body) return new ApiError(400, "Request body not found");
    const { uploaderId, videoId } = req.body;
    const uploader = await User.findById(uploaderId);
    if (!uploader) throw new ApiError(400, "Uploader not found");
    //! finding the subscribers of the user
    const subscribers = await subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(uploaderId)
            }
        },
        {
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "subscriber",
                as: "subscribers"
            }
        },
        {
            $unwind: "$subscribers"
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ]);
    if (!subscribers) throw new ApiError(400, "Subscribers not found on this channel");
    const subscriberIds = subscribers.map((sub) => sub._id.toString());
    const newNotifications = await NotificationService.createNotification({
        content: `${uploader.username} uploaded a new video`,
        entityId: videoId,
        entityType: 'video',
        senderId: uploaderId,
        recipientIds: subscriberIds
    });
    if (!newNotifications) throw new ApiError(400, "Failed to create Notifi the Users about the new Video");
    res.status(200).json(new ApiResponse(200, "Notifications sent to the Subscriber about the new Video Upload...", subscribers));
})
const notifiNewCommentOnVideo = asyncHandler(async (req, res) => {
    if (!req.body) throw new ApiError(400, "Request body not defined");
    const { commentId, videoId, commenterId } = req.body;
    //!checking video
    const videoFinding = await video.findById(videoId);
    if (!videoFinding) throw new ApiError(400, "video not founded");
    if (commentId===video.owner) return;
    const commenter = await User.findById(commenterId);
    if (!commenter) throw new ApiError(400, "commenter user is'nt defined");

    const notificationOnNewComment = await NotificationService.createNotification({
        content: `${commenter.username} has written a new comment on your video`,
        entityId: commentId,
        entityType: 'comment',
        senderId: commenterId,
        recipientIds: [videoFinding.owner]
    })
    if (!notificationOnNewComment) throw new ApiError(400, "failed to notifi on new Comment");
    return res.status(200).json(new ApiResponse(200, "Notification created of the Comment Added"));
})



export { notifyNewVideoUpload, notifiNewCommentOnVideo };