import { Router } from "express";
import registerUser  from '../controllers/user.controller.js';
import { upload } from "../middlewares/multer.middlewares.js";

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
console.log("into the user routes..");
export  {userRouter};