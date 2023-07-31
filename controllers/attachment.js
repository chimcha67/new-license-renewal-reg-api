// internal imports
const imageUploader = require("../middlware/imageUploader");

// middleware of avatar upload
function attachmentUpload(req, res, next) {
  const upload = imageUploader(
    // sending file mime types
    ["image/jpeg", "image/jpg", "image/png"],
    // maximum file size
    25000000,
    // maximum file number
    10,
    // error message
    "Only .jpeg, .jpg or .png format allowed!"
  );

  // call the middleware function

  // upload.single() or upload.array() or upload.fields needs name of input file field

  // upload.any()() doesn't needs any input file field name
  upload.any()(req, res, (err) => {
    if (err) {
      // sending json error response
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      // go to the next function
      next();
    }
  });
}

// export function
module.exports = attachmentUpload;