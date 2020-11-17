const mongoose= require('mongoose');

const godsSchema= new mongoose.Schema({
  id:  Number,  
  title: String ,
  description: String
});

module.exports= mongoose.model('Object',godsSchema);