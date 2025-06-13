import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    console.log("Error handler triggered:", err);
    
    let error = err;
    
    // Convert to ApiError if it isn't already
    if (!(error instanceof ApiError)) {
        const statusCode = 
            error.statusCode || 500
            error.status || "success"
            (error instanceof mongoose.Error ? 400 : 500);
        
        const message = error.message || "Something went wrong";
        error = new ApiError(
            parseInt(statusCode), 
            message, 
            error?.errors || [], 
            error.stack
        );
    }

    // Prepare the response
    const response = {
        success: false,
        message: error.message,
        ...(process.env.NODE_ENV === "development" && { 
            stack: error.stack,
            error: error 
        })
    };

    // Log the error in development
    if (process.env.NODE_ENV === "development") {
        console.error("Error:", error);
    }

    // Send the response
    return res.status(error.statusCode||500).json(response);
};

export { errorHandler };