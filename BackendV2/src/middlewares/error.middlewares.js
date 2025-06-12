import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";


const errorHandler=(err,req,res,next)=>{
    let error=err;
    if(!(error instanceof ApiError)){
        const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 :500;
        const message = err.message || "Something went wrong";
        error = new ApiError(statusCode,message,error?.errors||[],err.stack);
    }
    const response ={
        ...error,
        message,
        ...(process.env.NODE_ENV === "development" ? {stack:error.stack} : {}),
    }
}
export {errorHandler};