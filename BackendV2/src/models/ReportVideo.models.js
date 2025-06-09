import mongoose, { Schema } from "mongoose";
const ReportVideo = new Schema({
    video: {
        type: Schema.Types.ObjectId,
        ref: "video",
        required: true,
    },
    reportCause: {
        type: String,
        required: true
    },
},
    { timestamps: true }
)
export const Report= mongoose.model("reportVideo",ReportVideo);