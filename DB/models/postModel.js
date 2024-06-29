import mongoose, { Schema } from "mongoose";


const postSchema =new Schema({
    title:{
        type:String,
        required:true
    },
    createId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    like:[{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    unLike:[{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    commint:[{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    pictureUrl:String,
    pictureId:String
}) 
export const postmodel =mongoose.model('post',postSchema)