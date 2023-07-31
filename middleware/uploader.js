const multer = require("multer");
const path = require("path");


// Multer config

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});


























// // external imports
// const multer = require("multer");

// // internal imports
// const accountStorage = require("../config/cloudinaryAccountStorage");

// // creating a universal image uploader
// const imageUploader = (
//   allowed_file_types,
//   max_file_size,
//   max_number_of_upload_file,
//   error_msg
// ) => {
//   // prepare final multer upload object
//   const upload = multer({
//     // setting multer engine storage using cloudinary
//     storage: accountStorage,
//     // limiting file size for upload
//     limits: {
//       fileSize: max_file_size,
//     },
//     // filtering file avoid to malicious file upload
//     fileFilter: (req, file, cb) => {
//       // checking total uploading image number
//       if (req.files.length > max_number_of_upload_file) {
//         cb(
//           new Error(
//             `Maximum ${max_number_of_upload_file} files are allowed to upload !`
//           )
//         );
//       } else {
//         // checking file types for every file
//         if (allowed_file_types.includes(file.mimetype)) {
//           cb(null, true);
//         } else {
//           cb(new Error(error_msg));
//         }
//       }
//     },
//   });

//   return upload;
// };

// // export function
// module.exports = imageUploader;