import mongoose from 'mongoose'

import dotenv from "dotenv"
dotenv.config()
console.log(process.env.MONGO_URI);
export const connectDB=async()=>{
    try{ console.log("I am inside connect function");
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected successfully");
        
    }catch(error){
        console.log(`Error${error.message}`);
        process.exit(1)
        
        
    }
}