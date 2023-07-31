const validator = require("./validator")
const { 
    registerSchema, 
    loginSchema , 
    profileSchema, 
    newCarSchema, 
    oldCommarSchema, 
    oldPrivateCarSchema,
    editProfileSchema,
    editNewCarSchema,
    editOldPrivateCarSchema,
    editOldCommarSchema
} = require("./validator")
const userService = require('./user-controller')
const { request } = require("express")
const profileservice = require('./owner-info-controller')
const newCarService = require('./new-car-controller')
const oldCommarService = require('./old-comm-car-controller')
const oldPrivateCarService = require('./old-private-car-controller')



const registration = async(req, res, next)=>{
    const {error} = await registerSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await userService.createUser(req,res, next)
}


// login service

const login = async(req, res, next)=>{
    const {error} = await loginSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await userService.loginUser(req,res, next)
}

// update user details

const profile = async(req, res, next)=>{
    const {error} = await profileSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await profileservice.createProfile(req,res, next)
}

const editProfile = async(req, res, next)=>{
    const {error} = await editProfileSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await profileservice.updateUserProfile(req,res, next)
}

const newCar = async(req, res, next)=>{
    const {error} = await newCarSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await newCarService.newCarReg(req,res, next)
}

const editNewCar = async(req, res, next)=>{
    const {error} = await editNewCarSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await newCarService.editCredentials(req,res, next)
}

const oldCommercialCar = async(req, res, next)=>{
    const {error} = await oldCommarSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await oldCommarService.renewCommercialCar(req,res, next)
}

const editOldCommercialCar = async(req, res, next)=>{
    const {error} = await editOldCommarSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await oldCommarService.editCredentials(req,res, next)
}

const oldPrivateCar = async(req, res, next)=>{
    const {error} = await oldPrivateCarSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await oldPrivateCarService.renewPrivateCarReg(req,res, next)
}

const editOldPrivateCar = async(req, res, next)=>{
    const {error} = await oldPrivateCarSchema.validate(req.body)
    if(error){
        console.log("utftfu: ",error.details)
        return res.status(400).json({
            error: error.details[0].message
        })
    }

   await oldPrivateCarService.editCredentials(req,res, next)
}



module.exports = {
    registration,
    login,
    profile,
    newCar,
    oldCommercialCar,
    oldPrivateCar,
    editProfile,
    editNewCar,
    editOldCommercialCar,
    editOldPrivateCar
}