//seconde thing to make sub category
const slugify = require("slugify"); //backege to make the work od slug to convert anytopic to slashes topic
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler"); //to make handelr to any exception by using asink await
const subcategoryModel = require("../models/subCategoryModel");
const ApiError = require("../utils/ApiError");
//@desc create subcategory
//@rout  POST /api-v1/subcategoris ,el api ely ana 3amlo
//access public
exports.createSubcategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  //asynk-await
  const subcategory = await subcategoryModel.create({
    name,
    slug: slugify(name),
    category,//this is the category refrence to the parent category 
  });
  res.status(201).json({ data: subcategory }); //in case of success and any err the express hnadler make it
});
