import { Router } from "express";
import { toggleLike } from "../controllers/like.controller.js";
const LikeRouter = Router();
LikeRouter.route("/toggleLike").post(toggleLike);
export {LikeRouter};