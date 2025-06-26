import { Router } from "express";
import { uploadVideo } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const videoRouter = Router();
videoRouter.route("/uploadVideo").post(
    upload.fields([
        { name: "video", maxCount: 1},
        { name: "thumnail", maxCount: 1 }
    ]),
    (err, req, res, next)=>{
        if(err)
            return res.status(500).json(new ApiResponse(400,"Error while uploading the video files",err));
        next();
    },
    uploadVideo
);
export {videoRouter};

