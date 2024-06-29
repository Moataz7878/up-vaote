import mongoose, { Schema } from "mongoose";

const commintSchema =new Schema({
    comment:{
        type:String,
        required:true
    },
    createId:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'post',
        required:true
    },
    like:[{
        type:Schema.Types.ObjectId,
        ref:'user',
    }],
    unLike:[{
        type:Schema.Types.ObjectId,
        ref:'user',
    }]
})
export const commintmodel =mongoose.model('commint',commintSchema)