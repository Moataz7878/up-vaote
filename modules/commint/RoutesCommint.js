import { Router } from "express";
import { addLikeCommint, addUnLikeCommint, createCommint, deleteCommint, getAllCommint, updateCommint } from "./contorallCommint.js";
import { validation } from "../../midlleWare/validation.js";
import { commnitValidation, deleteValidation, getcommintsValidation, likeValidation, updatecommintValidation } from "./VallidationComm.js";
import { auth } from "../../midlleWare/auth.js";

const RouterCommint =Router()

RouterCommint.post("/createCommint",auth(),validation(commnitValidation),createCommint)
RouterCommint.patch("/:id/addLikeCommint",auth(),validation(likeValidation),addLikeCommint)
RouterCommint.patch("/:id/addUnLikeCommint",auth(),validation(likeValidation),addUnLikeCommint)
RouterCommint.delete("/:id/deleteCommint",validation(deleteValidation),deleteCommint)
RouterCommint.post("/:idPost/getAllCommint",validation(getcommintsValidation),getAllCommint)
RouterCommint.put("/updateCommint",validation(updatecommintValidation),updateCommint)

export default RouterCommint