//the general error class 
//@desc this class is responsible about opertional errors (errors that i can prdict)
class ApiError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith(4)?"fail":"error";//this to mintain the status of error by the requsit number if he 400 401 403 is fail else 500 for ex then error
        this.isOperational=true;
    }
}
module.exports =ApiError;
//this class benfits
//when i have error anywhere insted of generate the error ang sent messge to the middlewhere 