import express from 'express';
import cors from 'cors';
const app=express()
// adding the cors middleware
app.use(
    cors({
        origin:process.env.CROSS_ORIGIN,
        credentials:true,
    })
)
// common middlewares...
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"20kb"}));
app.use(express.static("public"))
// cookies
app.use(cookieParser());
// import health-check-route
import { healthCheck } from './controllers/healthcheck.controller.js';
import cookieParser from 'cookie-parser';
import {userRouter} from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middlewares.js';

//*use route
app.use("/api/v1/healthcheck",healthCheck); 
app.use("/api/v1/users",userRouter);

// error handling middleware at the last..
app.use(errorHandler);
export {app};