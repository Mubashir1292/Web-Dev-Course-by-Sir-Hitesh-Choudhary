import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { isImageByMagicNumber, isVideoByMagicNumber } from "../utils/fileTypeChecking.js";

const uploadVideo=asyncHandler( async(req,res)=>{
    if(!req.body) throw new ApiError(400,"All Fields are required..");
    const {owner,title,description,isPublished,filters,keyMoments,taggedChannel}=req.body;    
    //! checking user is valid
    const checkingOwnerIsValid=await User.findById(owner);
    if(!checkingOwnerIsValid) throw new ApiError(400,"Invalid User..");

    if(!req.files) throw new ApiError(400,"Request files are required..");
    
    const thumnailLocalPath = req.files?.thumnail?.[0]?.path;
    const videoFileLocalPath=req.files?.video?.[0]?.path;

    if(!videoFileLocalPath) throw new ApiError(400,"Video file local path is required..");

    // ? checking the file is video and thumnail or not
    try {
        const isVideo = await isVideoByMagicNumber(videoFileLocalPath);
        if(!isVideo) throw new ApiError(400,"Incorrect Video file...");
        const isImage = await isImageByMagicNumber(thumnailLocalPath); 
        if(!isImage) throw new ApiError(400,"Incorrect Thumnail File");
    } catch (error) {
        throw new ApiError(400,error || "Something went wrong while checking the file");
    }
    let localVideoFile,thumnailFile;
    try{
        localVideoFile=await uploadOnCloudinary(videoFileLocalPath);
    }catch(error){
        throw new ApiError(400,error ||  "video file not uploaded");
    }
    //* thumnail required
    try {
        thumnailFile=await uploadOnCloudinary(thumnailLocalPath);
    } catch (error) {
        throw new ApiError(400,error||"Thumnail file upload error")
    }

    //? Video Creation
    try {
        const Video = await video.create({
            owner,
            title,
            description,
            isPublished,
            filters,
            keyMoments,
            taggedChannel,
            videoFile:localVideoFile.url,
            thumnailFile:thumnailFile?.url || ""
        });
        const createdVideo = await video.findById(Video._id).select("-videoFile -thumnail");
        if(!createdVideo) throw new ApiError(400,"Video Creation Failed");
        res.status(201).json(new ApiResponse(201,"Video is Created.."));
    } catch (error) {
        if(thumnailFile)
            await deleteFromCloudinary(thumnailFile.public_id);
        if(localVideoFile)
            await deleteFromCloudinary(localVideoFile.public_id);
        throw new ApiError(400,error ||"Failed to video creation..");
    }
})

const getVidoes=asyncHandler(async(req,res)=>{
    
})
export {
    uploadVideo
};