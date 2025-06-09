import dotenv from "dotenv";
import { app } from './app.js';
import { connectDB } from "./db/index.js";
import path from 'path'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path: path.resolve(__dirname, '.env'),
})

const port = process.env.PORT || 8001;
// * database related things
connectDB().then(()=>{
app.listen(port, () => {
    console.log(`Server Started on the port ${port}`);
})
}).catch(err => console.log(err));

