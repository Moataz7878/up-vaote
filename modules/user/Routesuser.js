import { Router } from "express";
import { Login, addImageUser, deleteUser, logOut, profileUser, signUp, updateUser } from "./contorall.js";
import { validation } from "../../midlleWare/validation.js";
import { loginValidation, signUpValidation } from "./VallidationUser.js";
import { auth } from "../../midlleWare/auth.js";
import { fileUploud, validation_Array } from "../../serves/mullter.js";


const userRouter = Router()

userRouter.post('/signUp',validation(signUpValidation),signUp)
userRouter.post('/Login',validation(loginValidation),Login)
userRouter.put('/updateUser',auth(),updateUser)
userRouter.delete('/deleteUser',auth(),deleteUser)
userRouter.put('/logOut',auth(),logOut)
userRouter.post('/profileUser',auth(),profileUser)
userRouter.put('/addImageUser',auth(),fileUploud(validation_Array.image).single('image'),addImageUser)


export default userRouter