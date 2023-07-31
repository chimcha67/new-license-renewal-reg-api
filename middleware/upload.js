const util = require("util");
const multer = require("multer");
const { required } = require("joi");
const maxSize = 2 * 1024 * 1024;
const path = require('path')


let storage = multer.diskStorage({
  //destination:destination,
   destination: (req, file, cb) => {
    cb(null,  "upload");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    return cb(null,file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb)=>{
    let ext = path.extname(file.originalname);
    if(ext ==='.png' || ext === '.jpg' || ext === '.jpeg'){
      cb(null, true)
    }else{
      cb(null, false)
      return cb(new Error('only .png, .jpg, .jpeg format allowed'))
    }
  },
  onError: function(err, next){
    return console.log('error', err)
    next(err)
  }

});

//let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFile;