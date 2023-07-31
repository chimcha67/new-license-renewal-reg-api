const newCar= require('../models/new-car-schema')
const express = require('express')
 require("dotenv").config()
 const cloudinary = require('../controllers/cloudinary')
 const path = require('path')
 const fs = require('fs')



const controller = express()

const newCarReg = async(req, res, file)=>{
    try {
        const {licence_id, vin}= req.body
       

        const checkCarByVin = await newCar.findOne({vin})
        const checkCarByLicenceId = await newCar.findOne({licence_id})

        if(checkCarByLicenceId || checkCarByVin){
            return res.status(400).json({
                status: false,
                message: 'vin or licence id already exist. Please verify and try again'
        })
        }

        // submitting credentials
        //const result = await cloudinary.uploader.upload(req.file.path,{width:500,heigth:500});
        const url = []
        const image_ids = []
        for(var i=0;i<req.files.length;i++){
        var locaFilePath = req.files[i].path
        var result = await cloudinary.uploader.upload(locaFilePath)
        url[i]= {img_url:result.secure_url, id:result.public_id}

        image_ids.push(result.public_id)
    }
        
        const credentials = await newCar.create({
            user_id:req.user.id,
            //cloudinary_id: result.public_id,
            licence_id: licence_id,
            vin:vin,
            owner_passport:url[0],
            attestation_letter_image:url[1],
            purchase_receipt_image:url[2],
            delivery_note_image: url[3],
            proof_of_ownership_image: url[4],
            driver_license_image: url[5],
            cloudinary_id: image_ids
            
            })
    
        if(!credentials) return res.status(500).json({
            status: false,
            message: 'something went wrong'
        })
        res.status(201).json({
            success: true,
            message: 'user created successfully',
            credentials:credentials
        })

       
      
    } catch (error) {
        console.log(error)
    }
}










const getAllCarCredentials = async(req, res, next)=>{
    try {
        // const {page, limit} = req.query
        // if(page===0) return res.status(400).json({
        //     success: true,
        //     message:'invalide page'
        // })
        // const usePage = page-1
    const allCarDoc = await newCar.find({user_id:req.user.id})
    if(!allCarDoc){
        res.status(404).json({
            success: false,
            message: "car info  not found"
        })
        // throw new Error('Users not found')
    }
    res.status(200).json({
        success: true,
        message: 'documents fetched successfully',
        allCarDoc: allCarDoc
    })
    } catch (error) {
        console.log(error)
    }
    
}



const getSingleCarCredentials = async(req, res, next)=>{
    try {
     const id = req.params.id
     if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})
     const singleCarDoc = await newCar.findById(id)
 
     if(!singleCarDoc){
         res.status(404).json({
             success: false,
             message:'car docs not found'
         })
         // throw new Error('User not found')
     }
 
     if(JSON.stringify(singleCarDoc.user_id) !== JSON.stringify(req.user.id)){
         return res.status(403).json({
             message: 'user cannot get another user details'
         })
     }
 
     res.status(200).json({
         status: true,
         message: 'car docs fetched successfully',
         userProfile: singleCarDoc
     })
    } catch (error) {
     console.log(error)
    }
 }
 

const editCredentials = async (req, res) => {
    try {
      let id = req.params.id
      //let file = await newCar.findbyId(id);
      let filesPath;
      if (req.file) {
          filesPath = req.file.path; // We get file from multer
      }
      console.log(filesPath)
      
      const files = await newCar.findById(id)

      if(JSON.stringify(files.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot edit another user details'
        })
    }
   
      const fileName = files.owner_passport[0].id
        const fileName2 = files.attestation_letter_image[0].id
        const fileName3 = files.purchase_receipt_image[0].id
        const fileName4 = files.delivery_note_image[0].id
        const fileName5 = files.proof_of_ownership_image[0].id
        const fileName6 = files.driver_license_image[0].id


    //   const filePath= path.resolve(fileName)
    //   const filePath2= path.resolve(fileName2)
    //   const filePath3= path.resolve(fileName3)
    //   const filePath4= path.resolve(fileName4)
    //   const filePath5= path.resolve(fileName5)
    //   const filePath6= path.resolve(fileName6)

      const pathArrr = [fileName,fileName2,fileName3,fileName4,fileName5,fileName6]

    
    
    //   pathArrr.map(arr=>{
    //      fs.unlinkSync(arr,  (err) => { //rootfolder/upload/filename
    //         if (err) {

    //             return next(CustomErrorHandler.serverError(err.message));
    //         }
    //     });
    //   })


      let cloud_img_id = files.cloudinary_id
    for(var i=0;i<cloud_img_id.length;i++){

    cloud_img_id.map(imgId=>{
         if(JSON.stringify(pathArrr[i]) === JSON.stringify(imgId)){
              cloudinary.uploader.destroy(pathArrr[i]);
         }
    })
}
    // Upload new image to cloudinary
   


    const url = []
    const image_ids = []
  for(var i=0;i<req.files.length;i++){
    var locaFilePath = req.files[i].path
    var result = await cloudinary.uploader.upload(locaFilePath)
    url[i]= {img_url:result.secure_url, id:result.public_id}

    image_ids.push(result.public_id)
  }
  const newDoc = {
    
    //cloudinary_id: result.public_id,
    licence_id: req.body.licence_id,
    vin: req.body.arrvin,
    owner_passport:url[0] || files.owner_passport,
    attestation_letter_image:url[1] || files.attestation_letter_image,
    purchase_receipt_image:url[2] || files.purchase_receipt_image,
    delivery_note_image: url[3] || files.delivery_note_image,
    proof_of_ownership_image: url[4] || files.proof_of_ownership_image,
    driver_license_image: url[5] || files.driver_license_image,
    cloudinary_id: image_ids || files.cloudinary_id
    
       
    }
     
      const updateDoc = await newCar.findByIdAndUpdate(
        id,
        newDoc,
         {new:true}
      )
        
     

       
      res.status(200).json(updateDoc);
     
    } catch (err) {
      console.log(err);
    }
  };


 const deleteCredential = async (req, res) => {
    try {
      const id = req.params.id
      const files = await newCar.findById(id)

      if(JSON.stringify(files.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot delete another user details'
        })
    }
    const fileName = files.owner_passport[0].id
    const fileName2 = files.attestation_letter_image[0].id
    const fileName3 = files.purchase_receipt_image[0].id
    const fileName4 = files.delivery_note_image[0].id
    const fileName5 = files.proof_of_ownership_image[0].id
    const fileName6 = files.driver_license_image[0].id




  const pathArrr = [fileName,fileName2,fileName3,fileName4,fileName5,fileName6]



  let cloud_img_id = files.cloudinary_id
for(var i=0;i<cloud_img_id.length;i++){

cloud_img_id.map(imgId=>{
     if(JSON.stringify(pathArrr[i]) === JSON.stringify(imgId)){
          cloudinary.uploader.destroy(pathArrr[i]);
     }
})
}
    let file = await newCar.findByIdAndRemove(id);

     
    
      // Find user by id
 
   
      res.json({
        message:'deleted successfully',
        documents_deleted: file
      });
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = {
    newCarReg,
    editCredentials,
    deleteCredential,
    getAllCarCredentials,
    getSingleCarCredentials
  }












  //   function deleteFiles(){
    //     return Promise.all([filePath,filePath2,filePath3,filePath4,filePath5,filePath6].map(file=>
    //         new Promise((res, rej)=>{
                
    //                 fs.unlinkSync(file,  (err) => { //rootfolder/upload/filename
    //                     if (err) {
            
    //                         return next(CustomErrorHandler.serverError(err.message));
    //                     }
    //                 });
    //                 // if(file===filePath){
    //                 //     res()
    //                 //     return
    //                 // }
    //                 // fs.unlinkSync(file,  (err) => { //rootfolder/upload/filename
    //                 //     if (err) {
            
    //                 //         return next(CustomErrorHandler.serverError(err.message));
    //                 //     }
    //                 // });
                
    //         })))

        
    //   }
    //   deleteFiles()