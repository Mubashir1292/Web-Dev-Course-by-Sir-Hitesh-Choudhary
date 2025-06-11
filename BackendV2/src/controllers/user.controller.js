import asyncHandler from '../utils/AsyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/user.models.js';
const registerUser = asyncHandler(async (req, res) => {
    // getting all the data from the user.routes.js...
    const { fullName, username, email, password } = req.body;
    // custom validation
    // simple hack to validate it throught the if statement..
    // but we have to use the zod for checking the field's length...
    if (
        [fullName, username, email, password].some(field => field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(400,"The User with same username and email exists..")
    }
    //? checking the avatar file's local path exists or not..
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(avatarFile){
        
    }



    // till now we just add the some relevant things into the file.. 
});
export default registerUser;