// const { string } = require('joi');
const mongoose = require('mongoose')


const oldPrivateCarSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
   
    car_license_image:[],
    licence_id:{
        type: String,
        required: [true, 'pls insert car license id']
    },
    vin: {
        // data: Buffer,
        type: String,
        required: true
    },
    roadworthiness_image: [],
    roadworthiness_id:{
        type: String,
        required: [true, 'pls insert car license id']
    },
    insurance_image: [],
    cloudinary_id: []
});
const Image = mongoose.model("oldPrivateCar", oldPrivateCarSchema);
module.exports = Image
 
