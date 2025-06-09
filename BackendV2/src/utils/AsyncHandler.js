//? just a middleware function to handle the asyncronous behaivour of the functions..
const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch(err=>next(err))
    }
}
export {asyncHandler};
