class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.message=message,
        this.statusCode=statusCode,
        this.errors=errors,
        this.data=data,
        this.success=false
        if(stack){
            stack=this.stack
        }else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}
export {ApiError};