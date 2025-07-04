import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likeable: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "likeableModel",
    },
    likeableModel: {
        type: String,
        required: true,
        enum: ['video', 'comment'],
        lowercase: true // Ensure consistent case
    }
}, {
    timestamps: true,
});

// Create compound unique index
likeSchema.index(
    { user: 1, likeable: 1, likeableModel: 1 },
    { unique: true, name: 'unique_like' }
);

export const Like = mongoose.model("Like", likeSchema);