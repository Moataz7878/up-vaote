import { commintmodel } from "../../DB/models/commintModel.js";
import { postmodel } from "../../DB/models/postModel.js";

//================== add commint ============
export const createCommint =async(req,res)=>{
    try {
        const {comment,postId}=req.body
        const post = await postmodel.findById({_id:postId})
        if (!post) {
            return res.json({message:"Fail id post"})
        }
        const commint =await commintmodel.create({comment,postId,createId:req.user})
        if (!commint) {
            return res.json({message:"fail create commint"})
        }
        await postmodel.findByIdAndUpdate({_id:postId},{
            $push:{commint:commint._id}
        })
        res.json({message:"Done", commint})
    } catch (error) {
        console.log(error)
        return  res.json({message:"fail catch",error});
    }
}

//===============- add like commnit ==================
export const addLikeCommint =async(req,res)=>{
    try {
        const {id}=req.params
        const commintExist=await commintmodel.findById({_id:id})
        if (!commintExist) {
            return res.json({message:"in-vaild id commint"})
        }
        const commint =await commintmodel.findByIdAndUpdate({_id:id},{
            $addToSet:{like:req.user},
            $pull:{unLike:req.user}
        })
        res.json({message:"Done"})
    } catch (error) {
        console.log(error)
        return  res.json({message:"fail catch",error});
    }
}

//================ un like commint ===================
export const addUnLikeCommint =async(req,res)=>{
    try {
        const {id}=req.params
        const commintExist=await commintmodel.findById({_id:id})
        if (!commintExist) {
            return res.json({message:"in-vaild id commint"})
        }
        const commint =await commintmodel.findByIdAndUpdate({_id:id},{
            $addToSet:{unLike:req.user},
            $pull:{like:req.user}
        })
        res.json({message:"Done"})
    } catch (error) {
        console.log(error)
        return  res.json({message:"fail catch",error});
    }
}

//================ delete commint =================
export const deleteCommint =async(req,res)=>{
    try {
        const {id}=req.params
        const commintExist=await commintmodel.findById({_id:id})
        if (!commintExist) {
            return res.json({message:"in-vaild id commint"})
        }
        await commintmodel.findByIdAndDelete({_id:id})
        res.json({message:"Done"})
    } catch (error) {
        console.log(error)
        return  res.json({message:"fail catch",error});
    }
}

//================ get all commint =================
export const getAllCommint =async(req,res)=>{
    try {
        const {idPost}=req.params
        const post =await postmodel.findById({_id:idPost})
        if (!post) {
            return res.json({message:"in-vaild id post"})
        }
        const commints=await commintmodel.find({postId:idPost}).populate([
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
        if (!commints.length) {
            return res.json({message:"not found commint"})
        }
        res.json({message:"Done", commints})
    } catch (error) {
        console.log(error)
        return  res.json({message:"fail catch",error});
    }
}

//================ update commint =================
export const updateCommint =async(req,res)=>{
    try {
        const {idcommint ,comment}=req.body
        const commint =await commintmodel.findByIdAndUpdate({_id:idcommint},{comment},{new:true})
        if (!commint){
            return res.json({message:"in-vaild ipdate commint"})
        }
        res.json({message:"Done",commint})
    } catch (error) {
        console.log(error)
        return  res.json({message:"fail catch",error});
    }
}