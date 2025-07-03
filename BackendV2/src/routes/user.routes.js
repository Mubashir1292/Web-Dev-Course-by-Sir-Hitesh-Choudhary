import { Router } from "express";
import {registerUser,logoutUser, loginUser, getUserChannelProfile}  from '../controllers/user.controller.js';
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const userRouter = Router();
userRouter.route("/registerUser").post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    (err, req, res, next) => {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json(new ApiResponse(400, "File upload error"));
        }
        next();
    },
    registerUser
);
userRouter.route("/login").post(loginUser);
//* secure routes for users
userRouter.route("/logout").post(verifyJWT,logoutUser);
userRouter.route('/userChannel/:username').get(getUserChannelProfile);
export  {userRouter};