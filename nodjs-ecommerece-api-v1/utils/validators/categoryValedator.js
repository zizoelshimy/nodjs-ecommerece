const {check}=require('express-validator');//here i try to make the validtor to not go to the db first and solve the issue 
const valdiatorMiddleware=require("../../middleWhere/validatorMiddleware")
exports.getCategoryValidator=[
    //the rules 
    check('id').isMongoId().withMessage("Invalid categoryid"),
    valdiatorMiddleware,//the middleware in another file (validator middleware)
];
exports.creatCategoryValidator=[
    check('name')
    .notEmpty()
    .withMessage("name required")
    .isLength({min:3})
    .withMessage('too short category name')
    .isLength({max:32})
    .withMessage('too long category name'),
    valdiatorMiddleware //i put it here bec it catch the error  if it is exist from this rule then go the (validator middleware) to solve the error
];

exports.updateCategoryValidator=[
    check('id').isMongoId().withMessage("Invalid categoryid"),
    valdiatorMiddleware,//the middleware in another file (validator middleware)
];
exports.deleteCategoryValidator=[
    check('id').isMongoId().withMessage("Invalid categoryid"),
    valdiatorMiddleware,//the middleware in another file (validator middleware)
];