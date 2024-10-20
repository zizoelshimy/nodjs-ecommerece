//third thing to make sub category
const express = require("express");
const { createSubcategory } = require("../services/subCategoryservice");
const{creatsubcategoryValidator}=require("../utils/validators/subCategoryValedator")//this for the validation &fifth thing to make sub category i call the validtor from the validator file
const router = express.Router();
router.route('/').post(creatsubcategoryValidator,createSubcategory);//6th thing to make sub category to go inside validator file to solve the issuebefore go to the subcategory service file and done `
module.exports = router;
