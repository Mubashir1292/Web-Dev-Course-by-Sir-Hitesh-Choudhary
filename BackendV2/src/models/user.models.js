import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
            specialletters: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: false,
            index: true,
            specialletters: true,
        },
        fullName: {
            type: String,
            required: true,
            index: true
        },
        coverImage: {
            type: String, // cloudinary URL
            required: false,
            index: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            index: true,
            select: false,
        },
        avatar: {
            type: String,
            required: false,
            index: true
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
                required: false,
            }
        ],
        refreshToken: {
            type: String,
        },
        // likedVideo: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "Video",
        //         required: false,
        //     }
        // ],
        // theme: {
        //     type: String,
        //     default:"light",
        //     required: false
        // },
        // Notification: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "notification",
        //         required: false
        //     }
        // ]
    },
    {
        timestamps: true
    });
//* adding the methods to handle the password encryption...
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
})
//? Matching the password is correct or not..
UserSchema.methods.isPasswordCorrect = async function(password){
    if(!password) return false;
    return await bcrypt.compare(password,this.password);
}
//* json web tokens..
UserSchema.methods.generateAccessToken = function (){
    // short lived tokens
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
);
}
// * json refresh token 
UserSchema.methods.generateRefreshToken=function(){
    // refresh token
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)
}

export const User = mongoose.model("User", UserSchema);