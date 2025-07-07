import mongoose from "mongoose";
const dislikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dislikeAble: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'dislikeAbleModel'
    },
    dislikeAbleModel: {
        type: String,
        required: true,
        enum: ['video', 'comment']
    }
},
    { timestamps: true },);

dislikeSchema.index({
    user: 1,
    dislikeAble: 1,
    dislikeAbleModel: 1
},
    {
        unique: true,
        name: 'unique_dislike'
    }
);
export const dislike = mongoose.model("dislike",dislikeSchema);