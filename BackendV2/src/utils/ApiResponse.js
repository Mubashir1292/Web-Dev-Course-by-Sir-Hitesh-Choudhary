class ApiResponse {
    constructor(statusCode,message="Success",data){
        this.statusCode=parseInt(statusCode),
        this.message=message,
        this.data=data,
        this.success = statusCode<400
    }
}
export {ApiResponse};