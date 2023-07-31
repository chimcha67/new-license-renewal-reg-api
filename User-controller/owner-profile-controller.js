const express = require('express')
const ownerInfo = require('../models/owner-info-schema')
const app = express()
 require("dotenv").config()
const fs = require('fs')
const  cloudinary = require('../controllers/cloudinary')


const controller = express()

const createProfile = async(req, res, next)=>{
    try {
       
        const { first_name,last_name,identity_number,date_of_birth, age, email, gender, address}= req.body
    

        // if( !first_name || !last_name || !identity_number || !date_of_birth || !email || !gender || !address){
        //     res.status(400).json({
        //         message: 'all fields are required'
        //     }
        //     )
            
        // }

        // check if user withsame id num exist exist


        // const existingUser = await ownerInfo.findOne({identity_number})
        // if(existingUser){
        //     return res.status(400).json({
        //         status: false,
        //         message: 'identity number already exist pls verify and try again'
        // })
        // }
        // else if(!email.includes("@")){
        //     return res.status(400).json({
        //         status: false,
        //         message: 'pls provide a valid email',
        //         // reason: validators[reason].reason
        //     })
        // }

        
        // Image uploader
         const result = await cloudinary.uploader.upload(req.file.path);
     

        const profile = await ownerInfo.create({
                //user_id:req.user.id,
                identity_card:result.secure_url,
                identity_number:identity_number,
                first_name: first_name,
                last_name:last_name,
                date_of_birth: date_of_birth,
                email: email,
                gender: gender,
                address:address,
                cloudinary_id:result.public_id
                
               
            })
       
        if(!profile) return res.status(500).json({
            status: false,
            message: 'something went wrong'
        })
        res.status(201).json({
            success: true,
            message: 'user created successfully',
            profile: profile
        })

       
        //const result = await User.create(user)
    } catch (error) {
        console.log(error)
    }
}

//for reading all users

const getOwnerProfile = async(req, res, next)=>{
    try {
        // const {page, limit} = req.query
        // if(page===0) return res.status(400).json({
        //     success: true,
        //     message:'invalide page'
        // })
        // const usePage = page-1
    const userProfile = await ownerInfo.find({user_id:req.user.id})
    if(!userProfile){
        res.status(404).json({
            success: false,
            message: "user info  not found"
        })
        // throw new Error('Users not found')
    }
    res.status(200).json({
        success: true,
        message: 'user profile fetched successfully',
        userProfile: userProfile
    })
    } catch (error) {
        console.log(error)
    }
    
}


const getSingleUserProfile = async(req, res, next)=>{
   try {
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})
    const userProfile = await ownerInfo.findById(id)

    if(!userProfile){
        res.status(404).json({
            success: false,
            message:'user not found'
        })
        // throw new Error('User not found')
    }

    if(JSON.stringify(userProfile.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot get another user details'
        })
    }

    res.status(200).json({
        status: true,
        message: 'user fetched successfully',
        userProfile: userProfile
    })
   } catch (error) {
    console.log(error)
   }
}


const updateUserProfile = async(req, res, next)=>{
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})

    const userProfile = await ownerInfo.findById(id)
    if(!userProfile){
        res.status(404)
        // throw new Error('User not found')
    }
    if(JSON.stringify(userProfile.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot edit another users profile'
        })
    }
    await cloudinary.uploader.destroy(file.cloudinary_id);
        // Upload new image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

   
    const { first_name,last_name,identity_number,dob,state, local_government, age, email, gender, address}= req.body

    const newProfile = {
        //user_id:req.user.id,
        identity_card:result.secure_url,
        identity_number:identity_number,
        first_name: first_name,
        last_name:last_name,
        date_of_birth: dob,
        age: age,
        state:state,
        local_government:local_government,
        email: email,
        gender: gender,
        address:address
        
       
    }

    const updatedUserProfile = await ownerInfo.findByIdAndUpdate(
        req.params.id,
        newProfile,
        {new: true}
    )
    res.status(200).json(updatedUserProfile)

}

const deleteUserProfile = async(req, res, next)=>{
    const id = req.params.id
    if(id.length>24 || id.length<24) return res.status(400)
    const userProfile = await ownerInfo.findById(id)

    if(JSON.stringify(userProfile.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'invalid id, user cannot delete another users info'
        })
    }
    await cloudinary.uploader.destroy(user.cloudinary_id);

    const userProfileDelete = await ownerInfo.findByIdAndDelete(
        req.params.id
    )
    if(!userProfileDelete){ 
        res.status(404).json({
            message: 'user not found',
            
        })
        // throw new Error('User not found')
    }
    
   
    res.status(200).json({
        message: 'user deleted successfully',
        userProfileDelete: userProfileDelete
    })
}





module.exports = {
    createProfile,
    getSingleUserProfile,
    getOwnerProfile,
    updateUserProfile,
    deleteUserProfile
}


