const cloudinary = require('cloudinary')
const {cloudinaryStorage}=require('multer-storage-cloudinary')




const Storage = new cloudinaryStorage ({
    cloudinary:cloudinary,
    params:{
        folder:'folder name'
    }
})


module.exports = Storage