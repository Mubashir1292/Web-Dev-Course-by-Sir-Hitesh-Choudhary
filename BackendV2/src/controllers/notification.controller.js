import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import { video } from '../models/video.models.js'
import { comment } from '../models/comment.models.js';
import { Like } from '../models/like.models.js';
import { dislike } from '../models/dislike.models.js';
import { User } from '../models/user.models.js';
import { notification } from '../models/notification.models.js';
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
const createNotification = asyncHandler(async (req, res) => {
    if (!req.body) return new ApiError(400, "Request body not found");
    const { content, notifi, notificationModel, owner, NotificationUsers } = req.body;
    const ownerChecking = await User.findById(owner);
    if (!ownerChecking) throw new ApiError(400, "owner not founded");
    const notifiUsers = await NotificationUsers.find((user) => user.findById(user._id));
    if (!notifiUsers) throw new ApiError(400, "Notifi User not founded");
    const getContent = await getNotificationContent(notificationModel, notifi);
    try {
        const createNotification = await notification.create({
            content: {
                content,
                getContent
            },
            notifi,
            notificationModel,
            owner,
            NotificationUsers,
        });
        if (!createNotification) throw new ApiError(400, "Can't Create the Notification");
        return res.status(200).json(new ApiResponse(200, "Notification created.."));
    } catch (error) {
        throw new ApiError(400, error || "Error while creating notification");
    }
})
const getAllNotificationForTheUser = asyncHandler(async (req, res) => {
    if(!req.params) throw new ApiError(400,"Request Params not found");
    const {userId} = req.params;
    const findingUser = await User.findById(userId);
    if(!findingUser) throw new ApiError(400,"User not found");
    const gettingNotifications = await notification.aggregate([
        {
            $match:{
                user : NotificationUsers.includes(findingUser)
            }
        },
        {
            $sort:{
                createdAt:-1
            }
        },
        {
            $limit:1
        },
        {
            $lookup:{
                from:""
            }
        }

    ])
})
export { createNotification };