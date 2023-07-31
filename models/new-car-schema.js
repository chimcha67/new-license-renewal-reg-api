const { string } = require('joi');
const mongoose = require('mongoose')


const newCarSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    licence_id:{
        type: String,
        required: [true, 'pls insert car license id']
    },

    vin: {
        // data: Buffer,
        type: String,
        required: true
    },
    //cloudinary_id: String,
    owner_passport:[],
    attestation_letter_image: [],
    purchase_receipt_image: [],
    delivery_note_image: [],
    proof_of_ownership_image: [],
    driver_license_image: [],

    cloudinary_id: [],
   
   
    // current_add_proof:{
    //     type: String,
    //     required: [true, 'pls insert car license id']
    // },
    
    date:{
        type:Date,
        default:Date.now
    }
    
});
const Image = mongoose.model("newCar", newCarSchema);
module.exports = Image