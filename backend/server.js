import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv"
import { connectDB } from "./config/database.config.js";
dotenv.config()
const PORT=process.env.PORT||5000
console.log(process.env.PORT);

const app=express();
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Server is ready")
})
app.listen(PORT,()=>{
    connectDB();
    console.log("server is running at the port",PORT);
    
})