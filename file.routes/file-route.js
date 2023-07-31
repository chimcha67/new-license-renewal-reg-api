const express = require("express");
const router = express.Router();
const controller = require("../controllers/file-controller");
const util = require("util");
const multer = require("multer");
const bodyParser = require('body-parser')
const path = require('path');
const maxSize = 2 * 1024 * 1024;
const uploadFile = require('../middleware/upload');

const app = express()
app.use(
  express.json()
)

app.use(bodyParser.json());

 const storage=multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(__dirname) , '../uploads', (err)=>{
      if(err){
        console.log(err)
      }
    });
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    const name = Date.now()+ '-' + file.originalname
    cb(null, name, (err)=>{
      if(err){
        console.log(err)
      }
    });
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
});


  


module.exports = router;