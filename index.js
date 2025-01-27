import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());

//middleware to check the token of the user
app.use((req, res, next)=>{

    let token = req.header("Authorization")

    if(token !=null){
        token = token.replace("Bearer ","")
        jwt.verify(token, process.env.jwt_secret, (err, decoded)=>{
            if(!err){
                console.log(decoded)
                req.user = decoded
            }
        })
    }
    next()
    //console.log(token)
});

const mongoUrl = process.env.mongoUrl
mongoose.connect(mongoUrl)
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('MongoDB database connection established successfully!')
})


app.use("/api/users",userRouter)
app.use("/api/products", productRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/inquiries", inquiryRouter)


app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})