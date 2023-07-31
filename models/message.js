// external imports
const mongoose = require("mongoose");

// message structure
const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    attachment: [
      {
        attachment_file: String,
        cloudinary_id: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// create model
const Message = mongoose.model("Message", messageSchema);

// export module
module.exports = Message;