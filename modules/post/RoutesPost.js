import { Router } from "express";
import { addLike, createPost, deletePost, getAllPost, unLike, updatePost } from "./contorallPost.js";
import { validation } from "../../midlleWare/validation.js";
import { createPostValidation, deletePostValidation, likeValidation, updatePostValidation } from "./VallidationPost.js";
import { auth } from "../../midlleWare/auth.js";
import { fileUploud, validation_Array } from "../../serves/mullter.js";


const RouterPost =Router()

RouterPost.post("/createPost",auth(),fileUploud(validation_Array.image).single('image'),validation(createPostValidation),createPost)
RouterPost.patch("/:id/addLike",auth(),validation(likeValidation),addLike)
RouterPost.patch("/:id/unLike",auth(),validation(likeValidation),unLike)
RouterPost.get("/getAllPost",getAllPost)
RouterPost.delete("/:id/deletePost",validation(deletePostValidation),deletePost)
RouterPost.patch("/updatePost",auth(),validation(updatePostValidation),updatePost)
export default RouterPost