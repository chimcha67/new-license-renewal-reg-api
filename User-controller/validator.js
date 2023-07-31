const Joi = require('joi')


// middleware for validating logged in user token
const registerSchema = Joi.object({
    name: Joi.string().required(),
    //age: Joi.number().min(10).required(),
    email: Joi.string().email().required(),
    //gender: Joi.string().valid('M','F').required(),
    //password:Joi.string().min(8).required()
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password')

})


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().min(8).required()

})


const profileSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    identity_number: Joi.number().min(10).required(),
    date_of_birth: Joi.string().required(),
   // email: Joi.string().email().required(),
    gender: Joi.string().valid('M','F').required(),
    address:Joi.string().min(8).required()


})

const editProfileSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    identity_number: Joi.number().min(10).required(),
    date_of_birth: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('M','F').required(),
    address:Joi.string().min(8).required()


})

const newCarSchema = Joi.object({
    
    licence_id:Joi.number().min(1000).required(),
    vin:Joi.string().min(5).required(),


})

const editNewCarSchema = Joi.object({
    
    licence_id:Joi.number().min(1000).required(),
    vin:Joi.string().min(5).required(),


})

const oldPrivateCarSchema = Joi.object({
    roadworthiness_id: Joi.number().min(1000).required(),
    licence_id:Joi.number().min(1000).required(),
    vin:Joi.string().min(5).required(),


})

const editOldPrivateCarSchema = Joi.object({
    roadworthiness_id: Joi.number().min(1000).required(),
    licence_id:Joi.number().min(1000).required(),
    vin:Joi.string().min(5).required(),


})

const oldCommarSchema = Joi.object({
    roadworthiness_id: Joi.number().min(1000).required(),
    licence_id:Joi.number().min(1000).required(),
    vin:Joi.string().min(5).required(),


})

const editOldCommarSchema = Joi.object({
    roadworthiness_id: Joi.number().min(1000).required(),
    licence_id:Joi.number().min(1000).required(),
    vin:Joi.string().min(5).required(),


})

module.exports = {
    registerSchema,
    loginSchema,
    profileSchema,
    newCarSchema,
    oldCommarSchema,
    oldPrivateCarSchema,
    editProfileSchema,
    editNewCarSchema,
    editOldPrivateCarSchema,
    editOldCommarSchema
}
