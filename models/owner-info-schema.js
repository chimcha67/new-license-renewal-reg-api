const mongoose = require('mongoose')

const OwnerInfoModel = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cloudinary_id:{
        type:String
    },
    identity_card:{
        type: String,
        //required: [true, 'image is required']
    },
    first_name:{
        type: String,
        required: [true, 'name is required']
    },
    last_name:{
        type: String,
        required: [true, 'name is required']
    },
    identity_number:{
        type: String,
        required: [true, 'id number is required']
    },
    date_of_birth:{
        type: String,
        required: [true, 'age is required']
    },
    // email:{
    //     type: String,
    //     required: [true, 'email is required'],
    //     lowercase: true,
    //     unique: [true, 'email address already taken'],
        
    //     match: /.+\@.+\..+/
    //     // validate: {validator: function(v) {return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);},
    //     // message: ` email is not a valid email address!`
    // // },

    // },
    gender:{
        type: String,
        enum:['M','F'],
        required: [true, 'gender is required']
    },
    address:{
        type: String,
        required: [true, 'address is required']
    }
    
})

module.exports = mongoose.model('ownerInfo', OwnerInfoModel)