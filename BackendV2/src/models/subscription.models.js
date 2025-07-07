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
subscriptionModel.index({
    subscriber:1,
    channel:1
},{
    unique:true,
    "name":"unique_subscription"
});
export const subscription=mongoose.model("subscription",subscriptionModel);