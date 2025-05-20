import express from "express";
import { configDotenv } from "dotenv";
import router from "./routes/book.route.js";
import morgan from "morgan";
import logger from "./logger.js";
configDotenv();
const app = express();
const Port = process.env.PORT;
// middle-ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//? morgan's related things..
const mroganFormat = ":method :url :status :response-time ms:";
app.use(morgan(mroganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responsetime: message.split(' ')[3],
            };
            logger.info(JSON.stringify(logObject));
        },
    }
}))



// specifying the routes..
app.use("/", router)
// server starting
app.listen(Port, () => {
    console.log("server is listening...");
})