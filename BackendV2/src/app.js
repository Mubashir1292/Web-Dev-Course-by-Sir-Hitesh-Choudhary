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
app.use(express.json({limit:"400mb"}));
app.use(express.urlencoded({extended:true,limit:"300mb"}));
app.use(express.static("public"))
app.use(logger);
// cookies
app.use(cookieParser());
// import health-check-route
import { healthCheck } from './controllers/healthcheck.controller.js';
import cookieParser from 'cookie-parser';
import {userRouter} from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middlewares.js';
import logger from './middlewares/logger.middlewares.js';
import { videoRouter } from './routes/video.routes.js';
import {commentRouter} from './routes/comment.routes.js';

//*use route
app.use("/api/v1/healthcheck",healthCheck); 
app.use("/api/v1/users",userRouter);
app.use("/api/v1/video",videoRouter);
app.use("/api/v1/video",commentRouter);
// error handling middleware at the last..
app.use(errorHandler);
export {app};