//forth thing to make sub category 
const {check}=require('express-validator');//here i try to make the validtor to not go to the db first and solve the issue 
const valdiatorMiddleware=require("../../middleWhere/validatorMiddleware")
exports.createsubcategoryValidator=[
    check('name')
    .notEmpty()
    .withMessage("name required")
    .isLength({min:2})
    .withMessage('too short subcategory name')
    .isLength({max:32})
    .withMessage('too long subcategory name'),
   // check('category').isMongoId().withMessage('invalid category ID format'), //this is the id of the category which the subcategory belong to it
    valdiatorMiddleware //i put it here bec it catch the error  if it is exist from this rule then go the (validator middleware) to solve the error
];

