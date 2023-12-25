const mongoose=require('mongoose');

const articleSchema=new mongoose.Schema({
   
   name:String,
   comments: Array
  
});

// Export Student Schema
module.exports=mongoose.model("articles",articleSchema)