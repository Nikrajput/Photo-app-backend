const mongoose=require('mongoose')

const imageSchema=new mongoose.Schema({
    username: String,
    path: String,
    countOfPeople:Number
})

module.exports=mongoose.model('Image',imageSchema)