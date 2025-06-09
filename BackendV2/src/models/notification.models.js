import mongoose, { Schema } from "mongoose";
const notificationModel = new Schema({
    content: {
        type: String,
        required: true,
        index: true,
        Select: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    NotificationUser: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            index: true
        }
    ]
},
    {
        timestamps: true
    });
export const notification=mongoose.model("notification",notificationModel);