import mongoose,{Schema} from "mongoose";
const like=new Schema({
    comment:{
        type:Schema.Types.ObjectId,
        ref:"comment",
        required:true,
    },
    video:{
        type:Schema.Types.ObjectId,
        ref:"video",
        required:true
    },
    likedby:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
}
,{
    timestamps:true
}
);
export const likemodel=Schema.model("like",like);