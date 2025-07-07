import { Router } from "express";
import { toggleSubscription } from "../controllers/subscription.controller.js";
const subscriptionRouter= Router();
subscriptionRouter.route("/").post(toggleSubscription);
export {subscriptionRouter};