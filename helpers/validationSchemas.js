const Joi = require("joi");

const shirtSchema = Joi.object({
    fabric: Joi.string().required(),
    size: Joi.string().required(),
    pattern: Joi.string().required(),
    shirtColor: Joi.string().required(),
    price: Joi.string().required(),
    timestamps: Joi.string(),
});

const userSchema = Joi.object({
    username: Joi.string(),
    password: Joi.string(),
    gender:Joi.string().required(), 
    size: Joi.string().required(),
    age: Joi.string().required(),
    address: Joi.string().required(),
})

module.exports = { userSchema , shirtSchema } ;