//first thing of creation of subcategory 
//@desc build schema of sub categories
const mongoose = require('mongoose'); // Correct


const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, //if i make in db ("hp  ") trim make this without space in db
      unique: [true, "subcategory must be unique"],
      minlength: [2, "too short subcategory name"],
      maxlength: [32, "too long subcategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    //sub category i will add tantmy to another category parent category
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subcategory must be belong to parent category"],
    },
  },
  { timestamp: true }
); //make when i use the model it appeare that created at or updated at
module.exports = mongoose.model("subCategory", subCategorySchema);
