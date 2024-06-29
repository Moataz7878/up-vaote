export const validation=(schema)=>{
    return (req,res,next)=>{
        const validates =['body','params','headers','query']
        const validateError =[]
        for (const key of validates) {
            if (schema[key]) {
                const validationResult =schema[key].validate(req[key],{
                    abortEarly:false
                })
                if (validationResult?.error?.details) {
                    validateError.push(validationResult.error.details)
                }
                //  res.json({message:'validation',validationResult});
            }
            if (validateError.length) {
            return  res.json({message:'vaildation Error', validateError});
            }
          return  next()
        }
    }
}