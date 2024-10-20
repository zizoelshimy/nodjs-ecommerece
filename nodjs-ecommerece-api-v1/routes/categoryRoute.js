const express=require('express');
const {getCategoryValidator,
    creatCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator}=require("../utils/validators/categoryValedator");
const {getCategories,
    getCategorie,
    updateCategory,
    createcategory,
    deleteCategory
}=require('../services/categoryservice')
const router=express.Router();
router.route('/')
.get(getCategories).post(creatCategoryValidator,createcategory);
router.route("/:id")
.get(getCategoryValidator,getCategorie)//not go the getCategorie unless checkingfirst 
.put(updateCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCategory);
module.exports=router;