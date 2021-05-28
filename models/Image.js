const mongoose=require('mongoose')

const imageSchema=new mongoose.Schema({
    username: String,
    path: String,
    thumnail: String,
    countOfPeople:Number
})

module.exports=mongoose.model('Image',imageSchema)