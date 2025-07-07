import { comment } from "../models/comment.models.js";
import { video } from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";

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
export {getContent};