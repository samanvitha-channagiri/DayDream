import mongoose from 'mongoose'

const entrySchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        requred:true
    },
   
    title:{
        type:String,
        required:true,
        trim:true,
        
    },content:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const Entry=mongoose.model("Entry",entrySchema)

export default Entry