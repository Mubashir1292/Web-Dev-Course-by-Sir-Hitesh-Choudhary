import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";
import { video } from "../models/video.models.js";
import { comment } from "../models/comment.models.js";
import { Like } from "../models/like.models.js";
const getContent = async (likeable, likeableModel) => {
    if (!['video', 'comment'].includes(likeableModel)) throw new ApiError(400, `${likeableModel} is not defined`);
    let content;
    if (likeableModel === "video") {
        content = await video.findById(likeable);
    } else {
        content = await comment.findById(likeable);
    }
    if (!content) throw new ApiError(400, `${likeableModel} not defined`);
    //? returning the content..
    return content;
}
// //! Remove Like
// const removeLike = asyncHandler(async (userId, likeable, likeableModel) => {
//     const user = await User.findById(userId);
//     if (!user) throw new ApiError(404, "uer not found");
//     let content = await getContent(likeable, likeableModel);
//     try {
//         const likeDeleted = await Like.deleteOne({
//             user: userId,
//             likeable: content._id,
//             likeableModel
//         });
//         return res.status(200).json(new ApiResponse(200, "Unliked Successfully...", likeDeleted));
//     } catch (error) {
//         console.log("failed to remove like " + error);
//     }
// });
//! Toggle Like
const toggleLike = asyncHandler(async (req, res) => {
    if (!req.body) throw new ApiError(400, "Request Body not found");
    const {userId, likeable, likeableModel} = req.body;
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "uer not found");
    let content = await getContent(likeable, likeableModel);
    if (!content) throw new ApiError(400, `${likeableModel} not founded`);
    //searching is already liked the same content
    const existingLike = await Like.findOne({
        user: userId,
        likeable: content._id,
        likeableModel
    });
    if (existingLike) {
        await Like.findOneAndDelete(existingLike._id);
        return res.status(200).json(new ApiResponse(200, "Unliked Successfully.", existingLike));
    } else {
        try {
            const newLike = await Like.create({
                user: userId,
                likeable: content._id,
                likeableModel
            });
            return res.status(201).json(new ApiResponse(201, "new Like published", newLike));
    } catch (error) {
        throw new ApiError(400, error || "can't like this medium..");
    }
}
});
export { toggleLike };