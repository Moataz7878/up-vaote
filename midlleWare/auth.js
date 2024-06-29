import jwt from 'jsonwebtoken'
import { usermodel } from '../DB/models/usermodel.js'



export const auth=()=>{
    return async(req,res,next)=>{
        try {
            const {token}=req.headers
            if (!token) {
                return res.json({message:'pealse enter your token'})
            }
            const decode =jwt.verify(token ,process.env.passwordtoken)
            const user =await usermodel.findById({_id:decode.user._id})
            if (!user) {
                return res.json({message:"fail token id"})
            }
            req.user=user._id
           return next()
        } catch (error) {
            console.log(error)
            return  res.json({message:"Fail catch.."});
        }
    }
}