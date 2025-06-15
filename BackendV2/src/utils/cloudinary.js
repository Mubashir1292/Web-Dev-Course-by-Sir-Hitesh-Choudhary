import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!fs.existsSync(localFilePath)) {
            console.log("file not exists on the localpath" + localFilePath)
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("cloudinary file upload error" + error);
        return null;
    }
}

//* when the error occurs the images might be uploaded so writing a method to delete those files and other stuff
const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("Error while deleting from the cloudinary..", error);
        return null;
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };