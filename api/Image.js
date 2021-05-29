const express=require('express')
const router=express.Router()
const upload=require('../config/multer')
const cloudinary=require('../config/cloudinary')
const Image=require('../models/Image')
const sharp=require('sharp')
const axios=require('axios').default

router.post('/upload',upload.single("image"),async(req,res)=>{
    
    try{
        await sharp(req.file.path).resize(200,200).toFile('uploads/' + 'thumbnails-' + req.file.originalname)
        const result=await cloudinary.uploader.upload('uploads/' + 'thumbnails-' + req.file.originalname)
        const username=req.file.originalname.substr(0,req.file.originalname.length-4)

        var options = {
            method: 'POST',
            url: 'https://face-detection6.p.rapidapi.com/img/face-age-gender',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': 'de27c4c4c7msh9366d5082f1d78ep1ca312jsn910995513853',
                'x-rapidapi-host': 'face-detection6.p.rapidapi.com'
            },
            data: {url: `${result.secure_url}`, accuracy_boost: 3}
        }
        const response=await axios.request(options)
        console.log(response.data.detected_faces.length)
        const image=new Image({
            username:username,
            countOfPeople:0,
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