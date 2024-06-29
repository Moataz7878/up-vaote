import Joi from 'joi'


export const signUpValidation = {
    body :Joi.object().required().keys({
        name: Joi.string().required().min(3).max(30),
        email: Joi.string().email().required().min(3).max(30),
        password: Joi.string().required().min(6).max(30),
        age:Joi.number().min(4).max(100)
    })
}
export const loginValidation ={
    body:Joi.object().required().keys({
        email: Joi.string().email().required().min(3).max(30),
        password: Joi.string().required().min(6).max(30),
    })
}