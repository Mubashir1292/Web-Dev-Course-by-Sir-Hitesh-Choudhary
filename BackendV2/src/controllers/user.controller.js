import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { deleteFromCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
// const registerUser = asyncHandler(async (req, res) => {
//     console.log("into the  controllers..");
//     // getting all the data from the user.routes.js...
//     const { fullName, username, email, password } = req.body;
//     console.log(req.body);
//     // custom validation
//     // simple hack to validate it throught the if statement..
//     // but we have to use the zod for checking the field's length...
//     if (
//         [fullName, username, email, password].some(field => field?.trim() === "")
//     ) {
//         throw new ApiError(400, "All fields are required")
//     }
//     const existedUser = await User.findOne({
//         $or:[{username},{email}]
//     })
//     if(existedUser){
//         throw new ApiError(400,"The User with same username and email exists..")
//     }
//     //? checking the avatar file's local path exists or not..
//     const avatarLocalPath = req.files?.avatar[0]?.path;
//     const coverImageLocalPath = req.files?.coverImage[0]?.path;
//     if(!avatarLocalPath){
//         throw new ApiError(500,"The files local path is missing..")
//     }
//     // uploading this localfile path to the cloudinary for the sake of getting it back when we need it...
//     const avatarImage=await uploadOnCloudinary(avatarLocalPath);
//     let coverImage="";
//     if(coverImageLocalPath){
//         coverImage = await uploadOnCloudinary(coverImageLocalPath);
//     }
//     const user=await User.create({
//         fullName,
//         email,
//         coverImage:coverImage?.url || "",
//         avatar:avatarImage?.url || "",
//         password,
//         username:username.toLowerCase()
//     })
//     //* checking the database if the newly user is created or not..
//     const createdUser = await User.findById(user._id).select(
//         "-password -Notification watchHistory refreshToken"
//     )
//     if(createdUser){
//         throw new ApiError(500,"Something went wrong")
//     }
//     //? finally sending back the response..
//     return res.status(201).json(
//         new ApiResponse(201,"Newly User created....",createdUser)
//     )

//     // till now we just add the some relevant things into the file.. 
// });
const registerUser = asyncHandler(async (req, res) => {

    const { fullName, username, email, password } = req.body;

    if ([fullName, username, email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists");
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // let coverImage;
    // if (coverImageLocalPath) {
    //     coverImage = await uploadOnCloudinary(coverImageLocalPath);
    // }

    //* here we are going to implement the uploading path on to the cloudinary using the try catch
    let avatar;
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath);
        console.log("Uploaded avatar");
    } catch (error) {
        console.log("failed to upload avatar" + error);
        throw new ApiError(500, "failed to upload avatar");
    }
    let coverImage;
    try {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
        console.log("Uploaded coverImage");
    } catch (error) {
        console.log("failed to upload coverImage" + error);
        throw new ApiError(500, "failed to upload coverImage");
    }
    // ? User creation...
    try {
        const user = await User.create({
            fullName,
            email,
            avatar: avatarImage.url,
            coverImage: coverImage?.url || "",
            password,
            username: username.toLowerCase()
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken -watchHistory"
        );

        if (!createdUser) {
            throw new ApiError(500, "Failed to create user");
        }

        return res.status(201).json(
            new ApiResponse(201, "User registered successfully", createdUser)
        );
    } catch (error) {
        console.log("error while creating a user", error);
        if (avatar) {
            await deleteFromCloudinary(avatar.public_id);
        }
        if (coverImage) {
            await deleteFromCloudinary(coverImage.public_id);
        }
        throw new ApiError(500, "Something went wrong while registering a user and images are deleted..");
    }
});
export default registerUser;