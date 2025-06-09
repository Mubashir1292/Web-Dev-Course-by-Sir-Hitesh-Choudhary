import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema = new Schema({
    videoFile: {
        type: [true, "Video file is required.."],
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
        select: false,
        index: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: [true, "Title is mandatory.."],
    },
    description: {
        type: String,
        required: false,
    },
    duration: {
        type: Number,
        required: false,
    },
    views: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
    },
    isPublished: {
        type: Boolean,
        required: [true, "Public or Private"]
    },
    madeForKids: {
        type: Boolean,
        required: [true, "Made for Kids ?"]
    },
    filters: {
        type: String,
        required: [true, "Select At-least One"],
        Select: true,
        index: true
    },
    keyMoments: [
        {
            type: String,
            required: true,
            index: true
        }
    ],
    taggedChannel: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "User"
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
},
    { timestamps: true }
)
VideoSchema.plugin(mongooseAggregatePaginate);
export const video = mongoose.model("video", VideoSchema);