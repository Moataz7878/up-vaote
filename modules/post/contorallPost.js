import { postmodel } from "../../DB/models/postModel.js";
import cloudinary from "../../serves/culldnert.js"

//================== add post ===========================
export const createPost =async(req,res)=>{
    try {
        const {title}=req.body
        if (req.file) {
            const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path ,{folder:`post/${req.user}`})
            const post = await postmodel.create({title ,createId:req.user ,pictureUrl:secure_url ,pictureId:public_id})
            if(!post){
                return res.json({error:"Something went wrong" })
            }
            return res.json({message:"Done",post})
        }
        const post = await postmodel.create({title ,createId:req.user})
        if(!post){
            return res.json({error:"Something went wrong" })
        }
         res.json({message:"Done",post})
    } catch (error) {
        console.log(error)
        return  res.json({message:'fail catch'});
    }
}

//=================== add like of post ==================
export const addLike =async(req,res)=>{
try {
    const {id}=req.params
    const post =await postmodel.findById({_id:id})
    if(!post){
        return res.json({message:"not-vaild id post"})
    }
    const addlikeuser =await postmodel.findOneAndUpdate({_id:post._id },{
    $addToSet:{
        like:req.user
    },
    $pull:{
        unLike:req.user
    }
    })
    res.json({message:"Done"})
} catch (error) {
    console.log(error)
    return  res.json({message:'fail catch'});
}
}

//=================== add unLike of post ==================
export const unLike =async(req,res)=>{
    try {
        const {id}=req.params
        const post =await postmodel.findById({_id:id})
        if(!post){
            return res.json({message:"not-vaild id post"})
        }
        const unlikeuser =await postmodel.findOneAndUpdate({_id:post._id },{
        $addToSet:{
            unLike:req.user
        },
        $pull:{
            like:req.user
        }
        })
        res.json({message:"Done"})
    } catch (error) {
        console.log(error)
        return  res.json({message:'fail catch'});
    }
}

//=====================get all post ================
export const getAllPost =async(req,res)=>{
    try {
        const posts =await postmodel.find().populate([
            {
                path:'createId',
                select:'name pictureUrl'
            },{
                path:'like',
                select:'name pictureUrl'
            },{
                path:'unLike',
                select:'name pictureUrl'
            }
        ])
        if (!posts.length) {
            return res.json({message:"Not found posts"})
        }
        res.json({message:"Done", posts})
    } catch (error) {
        console.log(error)
        return  res.json({message:'fail catch'});
    }
}

//====================== delete post ===============
export const deletePost =async(req,res)=>{
    try {
        const {id}=req.params
        const post =await postmodel.findById({_id:id})
        if (!post) {
            return res.json({messsage:"in-vaild id post"})
        }
        await postmodel.findByIdAndDelete({_id:id})
        res.json({message:"Done"})
    } catch (error) {
        console.log(error)
        return  res.json({message:'fail catch'});
    }
}


//====================== update post ==================
export const updatePost =async(req,res)=>{
    try {
        const {id , title}=req.body
        const post =await postmodel.findById({_id:id})
        if (!post) {
            return  res.json({message:"not found id post"})
        }
        const userCreate =await postmodel.findOne({createId:req.user ,_id:id})
        if (!userCreate) {
            return res.json({message:'not match id user for this is post'})
        }
        const postUpdate =await postmodel.findByIdAndUpdate({_id:id},{title:title},{new:true})
        res.json({message:"Done", postUpdate})
    } catch (error) {
        console.log(error)
        return  res.json({message:'fail catch'});
    }
}