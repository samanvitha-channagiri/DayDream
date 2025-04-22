import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        trim:true
        
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        // match:/^[a-zA-Z0-0]+$/
    },
    password:{
        type:String,
        required:true,
        minLength:6

    },
    profilePic:{
        type:String,
        default:""
    },
    bio:{
        type:String
    },
    entries: {
        type: [ mongoose.Schema.Types.ObjectId ],
        ref: 'entries',
        default: [],
    },
    refreshToken:{
        type:String
    }

},{
    timestamps: {
        createdAt: 'joinedAt'
    } 
})

const User=mongoose.model("User",userSchema)

export default User;