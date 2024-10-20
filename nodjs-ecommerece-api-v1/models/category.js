const mongoose=require('mongoose');
//1-create  schema
const categorySchema=new mongoose.Schema({
    name:{//this is requrnments od name attribute
        type:String,
        required:[true,'category required '],//to make message that name is required
        unique:[true,'category must be unique '],
        minlength:[3,'too short category name'],
        maxlength:[32,'too long category name']
    },
    // the slug is the "how-to-learn-javascript-fast" part. It helps make the link more readable and SEO-friendly.
    slug:{
        type:String,
        lowercase:true
    },
image:String,
},{timestamps:true});//it will add two fields in db (1created at,updated at)
//2-create model (convert schema into model)take first the name of model 
const categoryModel=new mongoose.model("category",categorySchema);
module.exports=categoryModel;