const slugify=require('slugify');//backege to make the work od slug to convert anytopic to slashes topic
const categoryModel=require('../models/category');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');//to make handelr to any exception by using asink await 
const ApiError = require('../utils/ApiError');
//@desc Get list od categories 
//@rout GEt /api-v1/categoris
//access Public
exports. getCategories =asyncHandler(async (req,res)=>{
    const page =req.query.page*1||1;
    const limit=req.query.limit*1||5;
    const skip=(page-1)*limit;//(2-1)*5=5 (skip first 5 decuments and get the sec 5 documents)
    const categories= await  categoryModel.find({}).skip(skip).limit(limit);//find get all categories then we make varible to put it inside the varible
    res.status(200).json({results:categories.legth,page,data:categories});
}); 
//desc Get specific category by id
//@rout Get /api-v1/categoris/:id
//@access public 
exports.getCategorie=asyncHandler(async (req,res,next)=>{
  const { id } = req.params;
    //1-then () catch (err)
    //2-try{} catch(err)
    //3-asynkhandler(asynk)=>express error handler
    // Validate the ID
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: `Invalid ID format: ${id}` });
    }

    const category = await categoryModel.findById(id);

    if (!category) {
      return  next(new ApiError(`No category for this id ${id}`, 404));
    }

   res.status(200).json({ data: category });
   

});

 //@desc create category
 //@rout  POST /api-v1/categoris ,el api ely ana 3amlo
 //access public
exports.createcategory=asyncHandler(async(req,res)=>{
    const name=req.body.name;
    //asynk-await
    const category =await categoryModel.create({name,slug:slugify(name)});
    res.status(201).json({data:category});//in case of success and any err the express hnadler make it 
});

//@desc Update specific category 
//@rouat Put(for update)  /api-v1/categoris/:id
 //access private
 exports.updateCategory=asyncHandler(async(req,res,next)=>{
const {id}=req.params;// the id we get from query 
const {name}=req.body;
  // Validate the ID format
  if (!mongoose.isValidObjectId(id)) {
    return next(new ApiError(`Invalid ID format: ${id}`, 400)); // Bad request
}
const category=await categoryModel.findOneAndUpdate({_id:id},{name:name},{new:true})//take first the elemt i want to make update on it then the name whiech we want to update then new:true to reback the category after the update not befor the update 
if (!category) {
    return  next(new ApiError(`No category for this id ${id}`, 404));
}
res.status(200).json({ data: category });
});
//@desc delete specific category 
//@rouatdelete /api-v1/categoris/:id
 //access private
exports.deleteCategory=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;// the id we get from query 
    const category=await categoryModel.findByIdAndDelete(id);
    if (!category) {
        return  next(new ApiError(`No category for this id ${id}`, 404));
    }
    res.status(204).send( );
})