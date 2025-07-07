import { Router } from "express";
import {  notifiNewCommentOnVideo, notifyNewVideoUpload } from "../controllers/notification.controller.js";
const notificationRouter = Router();
notificationRouter.route("/notifySubscribers").get(notifyNewVideoUpload);
notificationRouter.route("/notifiVideoOwnerOnNewComment").post(notifiNewCommentOnVideo);
export {notificationRouter};