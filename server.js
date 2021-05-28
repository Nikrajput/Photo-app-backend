require('dotenv').config()
const express=require('express')
const app=express()

const userRouter=require('./api/User')
const imageRouter=require('./api/Image')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const connectDb=require('./config/db.js')
connectDb()

app.use('/user',userRouter)
app.use('/image',imageRouter)

app.listen(process.env.PORT || 3123)
