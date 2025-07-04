import mongoose,{Schema} from "mongoose";
const likeModel=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    likeable:{
        type:Schema.Types.ObjectId,
        required:true,
        refPath:"likeableModel",
    },
    likeableModel:{
        type:Schema.Types.ObjectId,
        required:true,
        enum:['video','comment']
    }
}
,{
    timestamps:true
});
like.index({user:1,likeable:1,likeableModel:1},{unique:true});
export const like=Schema.model("like",likeModel);