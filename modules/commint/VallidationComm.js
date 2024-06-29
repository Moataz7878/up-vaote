import Joi from "joi";

export const commnitValidation={
    body:Joi.object().required().keys({
        comment:Joi.string().required().min(2).max(50),
        postId:Joi.string().required()
    })
}

export const likeValidation ={
    params:Joi.object().required().keys({
        id:Joi.string().required().min(3).max(50),
    })
}
export const deleteValidation ={
    params:Joi.object().required().keys({
        id:Joi.string().required().min(3).max(50),
    })
}
export const getcommintsValidation ={
    params:Joi.object().required().keys({
        idPost:Joi.string().required().min(3).max(50),
    })
}

export const updatecommintValidation={
    body:Joi.object().required().keys({
        comment:Joi.string().required().min(2).max(50),
        idcommint:Joi.string().required()
    })
}