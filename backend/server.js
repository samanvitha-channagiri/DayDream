import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose"
import { connectDB } from "./config/database.config.js";
dotenv.config()
import { appConfig } from "./config/app.config.js";
console.log(process.env.PORT);


const startServer=async()=>{
   
    const app=express();
     connectDB();
    await appConfig(app);
}

startServer();

