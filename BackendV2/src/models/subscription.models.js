import mongoose, { Schema } from 'mongoose';
const subscriptionModel = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    {
        timestamps: true
    }
);
export const subscription=mongoose.model("subscription",subscriptionModel);