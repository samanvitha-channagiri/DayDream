import mongoose from "mongoose"

const commentSchema=mongoose.Schema({
    entry_id:{
        type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'entries'
},
entry_author:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'entries'
},
comment: {
    type: String,
    required: true
},
commented_by: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'users'
},
    
},
{
    timestamps: {
        createdAt: 'commentedAt'
    }
})


const Comment=mongoose.model("Comment",commentSchema)

export default Comment