const FileSchema = require('../models/file-schema')
const fs = require('fs')
const Image = require('../models/file-schema')
const cloudinary = require("./cloudinary");
const fileUpload = require('../middleware/upload')
//const { upload } = require('./cloudinary')




//const uploadFile = require("../middleware/upload");





const upload = async (req, res, file) => {
  try {
    // let {image} = req.body
    // var imgUrl =''
    if(req.file) var imgUrl= `upload/images/${req.file.originalname}`
    image = imgUrl
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please add an image to upload!" });
    }
     const result = await cloudinary.uploader.upload(req.file.path,{width:500,heigth:500});
     console.log(result)
    // image = result.secure_url
    const filePost = await Image.create({
      image: result.secure_url,
      //cloudinary_id: result.public_id,
      //user_id: req.user.id

    })
    //const filePostData = await filePost.save()

    res.status(200).send({
      message: "Uploaded the file successfully: " ,
      image:filePost
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
};


const getListFiles = async(req, res) => {
  const images = await Image.find({})
    const directoryPath = __dirname + "file.routes";
  
    // fs.readdir(directoryPath, function (err, files) {
    //   if (err) {
    //     res.status(500).send({
    //       message: "Unable to scan files!",
    //     });
    //   }
  
      let fileInfos = [];
  
      images.forEach((file) => {
        fileInfos.push({
          data: images.data,
          content: images.contentType
        });
      });
      
    res.status(200).send(images);
// });
};




const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "uploads";
  
    res.download(directoryPath + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  };
  
  module.exports = {
    upload,
    getListFiles,
    download,
  };