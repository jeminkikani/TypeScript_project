import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const app: express.Application = express()


// env File Confignation
dotenv.config({
    path: "./.env"
})

const port = Number(process.env.PORT)
const mongodburl = String(process.env.MONGODB_URL)


// middlware
app.use(express.json())


//userRoutes
import userRouter from './Routes/user.Routes'
app.use('/api/user' , userRouter)

//productRoutes
import productRouter from './Routes/product.Routes'
app.use('/api/product' , productRouter)

// cartRoutes
import cartRouter from './Routes/cart.Routes'
app.use('/api/cart' ,cartRouter )




// server start
app.listen(port ,()=>{
    console.log(`server started At http://localhost:${port}`);
})


// mongoDb Connection
mongoose.connect(mongodburl).then(()=>{
    console.log(`DB Connected....`)
}).catch((error)=>{
    console.log(error);
})
