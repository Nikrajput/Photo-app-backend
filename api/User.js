const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')

const User=require('../models/User')

router.post('/signup',async(req,res)=>{
    
    let {username,email,password}=req.body
    
    username=username.trim()
    email=email.trim()
    password=password.trim()

    if(username=='' || email=='' || password==''){
        return res.json({
            status:"FAILED",
            message:"Some fields are empty"
        })
    }

    try{
        let user=await User.find({username})
        if(user.length>0){
            return res.json({
                status:"FAILED",
                message:"Username already taken"
            })
        }

        user=await User.find({email})
        if(user.length>0){
            return res.json({
                status:"FAILED",
                message:"Email is already in use"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=new User({
            username:username,
            email:email,
            password:hashedPassword
        })
        await newUser.save()
        res.json({
            status:"SUCCESS",
            message:"Signup successful",
            data:newUser
        })
    }
    catch{
        res.json({
            status:"FAILED",
            message:"Something went wrong"
        })
    }
})

router.post('/signin',async(req,res)=>{
    let {email,password}=req.body
    
    email=email.trim()
    password=password.trim()
    console.log(password)

    if(email=='' || password==''){
        return res.json({
            status:"FAILED",
            message:"Some fields are empty"
        })
    }

    try{
        const user=await User.find({email})
        if(user.length==0){
            return res.json({
                status:"FAILED",
                message:"No such email exists"
            })
        }

        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
                return res.json({
                    status:"FAILED",
                    message:"Something went wrong"
                })
            }
            if(!result){
                return res.json({
                    status:"FAILED",
                    message:"Password is wrong"
                })
            }
            res.json({
                status:"SUCCESS",
                message:"Login successful",
                data:user
            })
        })
    }
    catch{
        res.json({
            status:"FAILED",
            message:"Something went wrong"
        })
    }
})

module.exports=router