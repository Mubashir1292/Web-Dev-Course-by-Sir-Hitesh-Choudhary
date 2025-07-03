import { Router } from "express";
import { deleteComment, fetchComments, updateComment, writeComment } from "../controllers/comment.controller.js";
const commentRouter = Router();
commentRouter.route("/getComments").get(fetchComments);
commentRouter.route("/:videoId/writeComment").post(writeComment);
commentRouter.route("/updateComment").put(updateComment);
commentRouter.route("/deleteComment").delete(deleteComment);
export {commentRouter};