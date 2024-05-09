const Joi = require("joi");

const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    comments: Joi.string().required(),
    tag: Joi.string(),
});

const userSchema = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
    email:Joi.string().required(), 
    city: Joi.string().required(),
    age: Joi.string().required(),
});

module.exports = { userSchema , postSchema } ;