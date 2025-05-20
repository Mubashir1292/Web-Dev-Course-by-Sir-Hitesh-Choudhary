//! this file generally tells us about the url details...
import { createLogger,formate,level,transport, transports } from "winston";
const {combine,timestamp,json,colorize} =formate;

const customLogFormate=()=>{
    formate.colorize();
    formate.printf(({level,message,timestamp})=>{
        return `${level}:${message} at ${timestamp}`;
    })
}
const logger=createLogger({
    level:"info",
    format:combine(colorize(),timestamp,json()),
    transports:[
        new transport.Console({
            formate:consoleLogFormate,
        }),
        new transports.File({filename:"app.log"}),
    ]
});
export default logger;