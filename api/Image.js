const express=require('express')
const router=express.Router()
const upload=require('../config/multer')
const cloudinary=require('../config/cloudinary')
const Image=require('../models/Image')

router.post('/upload',upload.single("image"),async(req,res)=>{
    
    try{
        console.log(req.file)
        const result=await cloudinary.uploader.upload(req.file.path)
        const username=req.file.originalname
        console.log(username)
        const image=new Image({
            username:username,
            countOfPeople:0,
            thumbnail:"Feeling happy",
            path:result.secure_url,
        })
        await image.save()
        res.send('Uploaded')
    }
    catch{
        res.send('Enter valid data')
    }
})


module.exports=router