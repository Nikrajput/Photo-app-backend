const mongoose=require('mongoose')

const imageSchema=new mongoose.Schema({
    username: String,
    path: String,
    countOfFaces:Number
},{timestamps:true})

module.exports=mongoose.model('Image',imageSchema)