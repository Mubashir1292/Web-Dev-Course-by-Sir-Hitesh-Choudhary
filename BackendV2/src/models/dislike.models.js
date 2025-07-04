import mongoose from "mongoose";
const dislikeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'User'
    },
    likeable:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'likeAbleModel'
    },
    likeAbleModel:{
        type:String,
        required:true,
        enum:['video','comment']
    }
},
{timestamps:true});
