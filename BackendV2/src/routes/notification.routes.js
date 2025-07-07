import { Router } from "express";
import { createNotification } from "../controllers/notification.controller.js";
const notificationRouter = Router();
notificationRouter.route("/createNotification").post(createNotification);
export {notificationRouter};