import mongoose, { Schema } from "mongoose";
const playlistSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title Required.."],
        index: true
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            required: [true, "Minimum 1 Video is required"],
            index: true,
            Select: true
        },
    ],
    quantity: {
        type: Number,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
},
    { timestamps: true }
);
export const playlist = mongoose.model("playlist", playlistSchema);