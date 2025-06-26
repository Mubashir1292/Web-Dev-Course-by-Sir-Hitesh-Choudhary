import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema = new Schema({
    videoFile: {
        type: String,
        required: [true,"Video file is required..."],
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
    views: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default:0,
    },
    isPublished: {
        type: Boolean,
        required: [true, "Public or Private"]
    },
    filters: [
        {
        type: String,
        required: [true, "Several Filters"],
        Select: true,
        index: true
        }
    ],
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
},
    { timestamps: true }
)
VideoSchema.plugin(mongooseAggregatePaginate);
export const video = mongoose.model("video", VideoSchema);