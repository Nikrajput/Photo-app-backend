const express=require('express')
const router=express.Router()
const upload=require('../config/multer.js')

router.post('/upload',upload.single("image"),async(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send("send")
})


module.exports=router