import Joi from "joi";


export const createPostValidation={
    body:Joi.object().required().keys({
        title:Joi.string().required().min(3).max(50),
    })
}
export const likeValidation ={
    params:Joi.object().required().keys({
        id:Joi.string().required().min(3).max(50),
    })
}
export const deletePostValidation ={
    params:Joi.object().required().keys({
        id:Joi.string().required().min(3).max(50),
    })
}
export const updatePostValidation={
    body:Joi.object().required().keys({
        title:Joi.string().required().min(3).max(30),
        id:Joi.string().required()
    })
}
