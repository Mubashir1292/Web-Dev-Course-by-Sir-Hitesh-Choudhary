import { Router } from "express";
import { createLike } from "../controllers/like.controller.js";
const LikeRouter = Router();
LikeRouter.route("/createLike").post(createLike);
export {LikeRouter};