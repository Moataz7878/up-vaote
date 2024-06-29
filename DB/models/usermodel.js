import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
        },
        password: {
            type: String,
            required: true
            },
            age:{
                type: Number,
            },
            pictureUrl:String,
            pictureId:String,
            loginIn:{
                type:Boolean,
                default:false
            }
}) 
export const usermodel = mongoose.model('user',userSchema)