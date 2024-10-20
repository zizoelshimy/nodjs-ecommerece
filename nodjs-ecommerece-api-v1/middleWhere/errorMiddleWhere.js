//@desc to appeare our error in format way using the global error handling API error
const globalError =(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500; //if i not have status code come from the above middle where then i make defult by 500
    err.status=err.status||'error'
    if (process.env.NODE_ENV=="development"){
        sendErrorForDev(err,res);
    }else{
        sendErrorForproduction(err,res); 
    }
    };
    const sendErrorForDev=(err,res)=>{
        return res.status(err.statusCode).json({
        status:err.status,
        error:err,
        messge:err.messge,
        stack:err.stack //where the error happen 
    });
};
const sendErrorForproduction=(err,res)=>{
    return res.status(err.statusCode).json({
    status:err.status,
    messge:err.messge,
});
};
    module.exports=globalError;