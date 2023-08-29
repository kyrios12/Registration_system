const joi = require('@hapi/joi');

// Blue print of javascript objects
const registervalidation = (data)=>{
const schema=joi.object({
    username: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6)
})
return schema.validate(data)
}


// blueprint of javasript objects
const loginValidation = (data)=>{
    const schema = joi.object({
        email : joi.string().email().min(6).required(),
        password : joi.string().min(6).required()
    })
       return schema.validate(data);
       
    }
module.exports = {registervalidation,loginValidation};