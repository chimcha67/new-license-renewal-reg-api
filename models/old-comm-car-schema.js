const { string } = require('joi');
const mongoose = require('mongoose')


const oldCommercialCarSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    //cloudinary_id: String,
   
    licence_id: String,
   
    roadworthiness_id: String,
    vin: {
        // data: Buffer,
        type: String,
        required: true
    },
        
    car_license_image: [],
    roadworthiness_image: [],
    insurance_image:[],
    carrier_permit_image: [],
   heavy_goods_permit_image: [],
   cloudinary_id: []
    
},
);
// { typeKey: '$type' }
const Image = mongoose.model("oldCommercialCar", oldCommercialCarSchema);
module.exports = Image