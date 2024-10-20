const {validationResult}=require('express-validator');//here i try to make the validtor to not go to the db first and solve the issue 
const valdiatorMiddleware=//2-make middlewhere=>catch error from rule if exist
(req,res,next)=>{//here the middlewhere tha will catch the error from the mongoid if it is false
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();//make the api to go to the nextmiddleware if there is no errors go to the  getcategory middleware
};
module.exports=valdiatorMiddleware;