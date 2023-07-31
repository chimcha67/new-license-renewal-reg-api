const { string } = require('joi');
const mongoose = require('mongoose')


const imageSchema = new mongoose.Schema({
    // user_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: false,
    //     ref: 'User'
    // },
    image: {
        // data: Buffer,
        type: String,
        required: true
    }
    
});
const Image = mongoose.model("Image", imageSchema);
module.exports = Image