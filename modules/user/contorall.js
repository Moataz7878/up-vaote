import { postmodel } from "../../DB/models/postModel.js";
import { usermodel } from "../../DB/models/usermodel.js";
import cloudinary from "../../serves/culldnert.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//=================== signUp ===============
 export const signUp =async(req,res)=>{
    try {
        const {name , email , age , password}=req.body
        const user = await usermodel.findOne({email:email})
        if (user) {
            return res.json({message:'email already Exist'})
        }
        const hasPassword =bcrypt.hashSync(password ,+process.env.bcrypt)

        const newUser = await usermodel.create({name,email,age,password:hasPassword})
        if (!newUser) {
            return res.json({message:'Fail create user'})
        }
        res.json({message:'Success',newUser})
    } catch (error) {
        console.log(error)
        return  res.json({message:"Fail catch"});
    }
 }

 //================== login ================
 export const Login =async(req,res)=>{
    try {
        const {email,password}=req.body
        const user = await usermodel.findOne({email:email})
        if (!user) {
            return res.json({message:"Found user email"})
        }
        
        const isMatch =bcrypt.compareSync(password , user.password)
        if (isMatch) {
        await usermodel.findOneAndUpdate({_id:user._id},{loginIn:true},{new:true})
            const token = jwt.sign({user},process.env.passwordtoken)
          return  res.json({message:"Done" ,token});
        }
         res.json({message:"Fail password user"})
    } catch (error) {
        console.log(error)
        return  res.json({message:"Fail catch"});
    }
 }

 //==================update User ==============
 export const updateUser =async(req,res)=>{
    try {
        const user =await usermodel.findById({_id:req.user})
        if (!user) {
            return res.json({message:"Fail id user"})
        }
        if (req.body.name) {
            user.name = req.body.name
        }
        if(req.body.age){
            user.age = req.body.age
        }
        const useruPdate =await user.save()
        if(!useruPdate){
            return res.json({message:"Fail save update user"})
        }
        res.json({message:"Done",useruPdate})
    } catch (error) {
        console.log(error)
        return  res.json({message:"Fail catch"});
    }
 }

 // ================delete User ===========
 export const deleteUser =async(req,res)=>{
    try {
        const user = await usermodel.findByIdAndDelete({_id:req.user})
        if (!user) {
            return res.json({message:"Fail delet user"})
        }
        res.json({message:"Done"})
    } catch (error) {
        console.log(error)
        return  res.json({message:"Fail catch"});
    }
 }

 //===============log out ===================
 export const logOut =async(req,res)=>{
    try {
        const userOut =await usermodel.findOneAndUpdate({_id:req.user},{
            loginIn:false
        })
        res.json({message:"Done"})
    } catch (error) {
        console.log(error)
        return  res.json({message:"Fail catch"});
    }
 }

 //================ add Image User =============
export const addImageUser =async(req,res)=>{
    try {
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path ,{folder:`user/${req.user}`})
        const user =await usermodel.findByIdAndUpdate({_id:req.user},{pictureUrl:secure_url ,pictureId:public_id},{
            new:true
        })
        if (!user) {
            return res.json({message:'in-valid add image'})
        }
        res.json({message:'Done', user})
    } catch (error) {
        console.log(error)
        return  res.json({message:"Fail catch"});
    }
}

//================ profile user ===========
export const profileUser =async(req,res)=>{
    try {
        const user =await usermodel.findById({_id:req.user})
        const post =await postmodel.find({createId:user._id}).populate([
           {
                path:'like',
                select:'name pictureUrl'
            },{
                path:'unLike',
                select:'name pictureUrl'
            }
        ])

        res.json({message:"Done",user,post})
    } catch (error) {
        console.log(error)
        return  res.json({message:"Fail catch"});
    }
}