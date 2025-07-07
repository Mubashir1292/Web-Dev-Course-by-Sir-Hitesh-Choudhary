import { Router } from "express";
import { toggleDislike } from "../controllers/dislike.controller.js";
const dislikeRouter = Router();
dislikeRouter.route("/").post(toggleDislike);
export {dislikeRouter};