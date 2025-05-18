import express from "express";
import { configDotenv } from "dotenv";
import router from "./routes/book.route.js";
configDotenv();
const app =express();
const Port=process.env.PORT;
// middle-ware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// specifying the routes..
app.use("/",router)    
// server starting
app.listen(Port,()=>{
    console.log("server is listening...");
})