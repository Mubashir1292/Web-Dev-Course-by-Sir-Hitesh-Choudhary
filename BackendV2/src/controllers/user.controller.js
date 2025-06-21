import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { deleteFromCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
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
// })
// till now we just add the some relevant things into the file.. 

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, userName, email, password } = req.body;

    if ([fullName, userName, email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists");
    }
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    let avatar;
    let coverImage;
    //* here we are going to implement the uploading path on to the cloudinary using the try catch
    try {
        avatar = await uploadOnCloudinary(avatarLocalPath);
    } catch (error) {
        console.log("failed to upload avatar" + error);
        throw new ApiError(500, "failed to upload avatar");
    }
    try {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    } catch (error) {
        console.log("failed to upload coverImage" + error);
        throw new ApiError(500, "failed to upload coverImage");
    }
    // ? User creation...
    try {
        const user = await User.create({
            userName: userName.toLowerCase(),
            email,
            fullName,
            coverImage: coverImage?.url || "",
            avatar: avatar.url,
            password,
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
        if (avatar) {
            await deleteFromCloudinary(avatar.public_id);
        }
        if (coverImage) {
            await deleteFromCloudinary(coverImage.public_id);
        }
        throw new ApiError(500, "Something went wrong while registering a user and images were deleted..");
    }
});
// grabbing the access token and refresh token for the authentication..

const generatingRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, "user Not founded");
        //* nw moving to generate the access and refresh token..
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBefore: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the refresh tokens for the user");
    }
}
const loginUser = asyncHandler(async (req, res) => {
    try {
        // * getting the user params for login 
        if (!req.body)
            throw new ApiError(400, "Request body not founded");
        const { email, password } = req.body;
        //? validation
        if ([email, password].some((field) => field.trim() === ""))
            throw new ApiError(500, "All Fields must be filled..");
        //? finding the user 
        const user = await User.findOne({ email });
        if (!user) throw new ApiError(404, `User not Founded on this Email: ${email}`);

        //* validate password..
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) throw new ApiError(401, "Invalid Credentials");

        const { accessToken, refreshToken } = await generatingRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id)
            .select("+password -refreshToken")
        if (!loggedInUser) throw new ApiError(500, "Something went wrong on fetching the logged in user..");
        // ? settings related to cookies
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully..."
            ));

    } catch (error) {
        throw new ApiError(500, error || "Something went wrong while logging in the user..");
    }
});
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        //logging out the user means just have to delete the refresh token fromt eh database..
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }, {
        new: true
    }
    )
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "User Logout Successfully"));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        // just refreshing the old token by passing it to the database again..
        //? getting the old refresh token
        const incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!incommingRefreshToken) throw new ApiError(401, "Refresh Token is required..");
        //? have to verify the old refresh token..
        const decodedToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
        if (!user) throw new ApiError(404, "Invalid refresh Token");
        //? just checking the refresh Token from the database
        if (incommingRefreshToken !== user?.refreshToken) throw new ApiError(404, "Invalid Refresh Token");
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        };
        const { accessToken, refreshToken: newRefreshToken } = await generatingRefreshToken(user._id);
        return res.status(200)
            .cookie("access Token", accessToken, options)
            .cookie("refresh Token", refreshToken, options)
            .json(new ApiResponse(200, {
                accessToken,
                refreshToken: newRefreshToken
            },
                "Access token refreshed succesfully.."
            ));

    } catch (error) {
        throw new ApiError(500, "Something went wrong while refreshing the refresh token");
    }
});
const changePassword = asyncHandler(async (req, res) => {
    console.log(`Request User ${req?.user}`);
    const { userId, oldPassword, newPassword } = req.body;
    if (!req.body) throw new ApiError(500, "Request Body is empty");
    const user = User.findById(userId);
    if (!user) throw new ApiError(404, "User not founded on this id");
    const isPasswordCorrect = await user.isPasswordValid(oldPassword);
    if (!isPasswordCorrect) throw new ApiError(500, "old Password did'nt Correct");
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res.status(200)
        .json(new ApiResponse(200, "Password Successfully Updated.."));
});
const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "Current User Details"))
});
const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;
    if (!fullName || !email)
        throw new ApiError(500, "fullName and Email are required..");
    const user = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            fullName,
            email
        }
    },
        { new: true }
    ).select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, user, "Account details updated Successfully.."));
});
const updateUserAvatar = asyncHandler(async (req, res) => {
    
});
const updateUserCoverImage = asyncHandler(async (req, res) => {

});



export { generatingRefreshToken, registerUser, loginUser, refreshAccessToken, logoutUser }; 