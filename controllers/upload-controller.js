// internal imports
const cloudinary = require("./cloudinary");
//const User = require("../models/People");
const Message = require("../models/message");

// add user function
async function addUser(req, res, next) {
  let newUser;

  try {
    // checking avatar/files
    if (req.files && req.files.length > 0) {
      // use cloudinary.uploader.upload() to upload image in cloudinary
      const result = await cloudinary.uploader.upload(req.files[0].path, {
        width: 200, // setting width to 200px
        height: 200, // setting height to 200px
        crop: "thumb", // create thumbnail image
        gravity: "face", // focusing on face
      });

      // creating new user object with image
      newUser = new User({
        ...req.body,
        avatar: result.secure_url, // image url
        cloudinary_id: result.public_id, // unique id
      });
    } else {
      // creating new user object without image
      newUser = new User({
        ...req.body,
      });
    }

    // save user
    await newUser.save();
    // send json response
    res.status(200).json({
      success: "User added successfully!",
      newUser,
    });
  } catch (err) {
    // send json error
    res.status(500).json({
      errors: {
        common: {
          msg: "Couldn't add user!",
        },
      },
    });
  }
}

// remove user
async function deleteUser(req, res, next) {
  try {
    // find user by id
    const user = await User.findById(req.params.id);

    if (user.avatar && user.cloudinary_id) {
      // use cloudinary.uploader.destroy() to delete image from cloudinary
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }
    // delete user from db
    await user.remove();

    // send json response
    res.status(200).json({
      success: "User removed Successfully!",
      user,
    });
  } catch (err) {
    res.status(500).json({
      // send json error
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
}

// send message function
async function sendMessage(req, res, next) {
  // checking for message or any file
  if (req.body.message || (req.files && req.files.length > 0)) {
    try {
      // save message text/attachment in database
      let attachments = null;
      // creating an async function to upload image in cloudinary
      const multipleUpload = async (path) => {
        // use cloudinary.uploader.upload() to upload image in cloudinary
        await cloudinary.uploader.upload(path);
      };
      // check for file upload
      if (req.files && req.files.length > 0) {
        attachments = [];
        // loop through every file from files request
        for (const file of req.files) {
          // destructuring path of every file
          const { path } = file;
          // saving result
          const result = await multipleUpload(path);
          // pushing object to attachment array
          attachments.push({
            attachment_file: result.secure_url, // image url
            cloudinary_id: result.public_id, // unique id
          });
        }
      }

      // create new message object
      const newMessage = new Message({
        text: req.body.message,
        attachment: attachments, // all image stored as string
      });

      // send data to database
      const result = await newMessage.save();
      // success json response
      res.status(200).json({
        success: "Message send successfully!",
        result,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    // send json error
    res.status(500).json({
      errors: {
        common: {
          msg: "Couldn't send message!",
        },
      },
    });
  }
}

// remove message and attachments
async function removeMsgAndAttachments(req, res, next) {
  try {
    // filtering message by id form database
    const message = await Message.findById(req.params.id);
    // creating an async function for deleting image from cloudinary
    const multipleDelete = async (public_id) => {
      // use cloudinary.uploader.destroy() to delete image from cloudinary
      await cloudinary.uploader.destroy(public_id);
    };
    // check attachment file
    if (message.attachment) {
      const attachments = message.attachment;
      // looping every attachment file from attachments
      for (const attachment of attachments) {
        // sending cloudinary_id or public_id to multipleDelete function
        await multipleDelete(attachment.cloudinary_id);
      }
    }
    // removing message from database
    await message.remove();
    // sending success json response
    res.status(200).json({
      success: "Message and attachments removed Successfully!",
      message,
    });
  } catch (err) {
    // sending error json response
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete message and attachments!",
        },
      },
    });
  }
}

// export function
module.exports = { addUser, deleteUser, sendMessage, removeMsgAndAttachments };