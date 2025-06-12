import { Router } from "express";
import registerUser  from '../controllers/user.controller.js';
import { upload } from "../middlewares/multer.middlewares.js";

const userRouter = Router();

userRouter.route("/registerUser").post(
    upload.fields(
        [
            {
                name: 'avatar',
                maxCount: 1
            },
            {
                name: "coverImage",
                maxCount: 1
            }
        ]
    ),
    registerUser);
export  {userRouter};