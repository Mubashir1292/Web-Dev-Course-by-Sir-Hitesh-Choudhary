import { subscription } from "../models/subscription.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

//! create sunscription
const toggleSubscription = asyncHandler(async (req, res) => {
    if (!req.body) throw new ApiError(400, "Request body not found");
    const { subscriber, channel } = req.body;
    const checkingSubscriber = await User.findById(subscriber);
    if (!checkingSubscriber) throw new ApiError(400, "given subscriber user not found");
    const checkingChannel = await User.findById(channel);
    if (!checkingChannel) throw new ApiError(400, "given channel not found");
    if (subscriber === channel) throw new ApiError(400, "You can't subscribe to your self..");
    //! existing subscription
    const existingSubscription = await subscription.findOne({
        subscriber,
        channel
    });
    if (existingSubscription) {
        await subscription.findOneAndDelete(existingSubscription._id);
        return res.status(200).json(new ApiResponse(200,"subscription Removed",existingSubscription));
    } else {
        try {
            const creatingSubscription = await subscription.create({
                subscriber,
                channel
            });
            if (!creatingSubscription) throw new ApiError(400, "Failed to Subscribe this channel");
            return res.status(200).json(new ApiResponse(200, "subscription added", creatingSubscription));
        } catch (error) {
            throw new ApiError(400, error || "failed to add subscription");
        }
    }
});
export { toggleSubscription };