import mongoose from "mongoose";
import { db_name } from "../constants.js";
const connectDB=async()=>{
    try{
       const databaseConnection=await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`);
        console.log(`database Connection successfull..`);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
export {connectDB};