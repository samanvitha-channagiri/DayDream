import mongoose from "mongoose"

const commentSchema=mongoose.Schema({
    entry_id:{
        type:Schema.Types.ObjectId,
    required:true,
    ref:'entries'
},
entry_author:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'entries'
},
comment: {
    type: String,
    required: true
},
commented_by: {
    type: Schema.Types.ObjectId,
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