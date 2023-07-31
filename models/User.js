const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'name is required']
    },
    // age:{
    //     type: Number,
    //     required: [true, 'age is required']
    // },
    email:{
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        unique: [true, 'email address already taken'],
        
        match: /.+\@.+\..+/
        // validate: {validator: function(v) {return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(v);},
        // message: ` email is not a valid email address!`
    // },

    },
    // gender:{
    //     type: String,
    //     enum:['M','F'],
    //     required: [true, 'gender is required']
    // },
    password:{
        type: String,
        required: [true, 'password is required']
    },
    repeat_password:{
        type: String,
        required: [true, 'password is required']
    }
})

module.exports = mongoose.model('User', UserModel)