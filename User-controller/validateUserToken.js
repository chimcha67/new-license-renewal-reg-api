const jwt = require('jsonwebtoken')
//const asyncHandler = require('express-async-handler')



const validateToken = async(req, res, next)=> {
    //console.log("check")
    let token;
    let authHeader = req.headers.Authorization ||  req.headers.authorization
    console.log(authHeader)
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1]
          
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                return res.status(401).json({message: 'unauthorized user'})
            }
           req.user = decoded.user
         
          next()
        //   if(res.headerSent !== true){
        //          res.send('hello')
        //   }
          
        })
       
    }
    if(!token){
        return res.status(401).json({message: 'token is missing'})
    }
}

module.exports = {validateToken}



// const jwt = require('jsonwebtoken')
// const asyncHandler = require('express-async-handler');
// const User = require('../models/User');
// // User = require('../models/User')



// const validateToken = asyncHandler(async(req, res, next)=>{

//     let token;
//     //let authHeader = req.headers.Authorization ||  req.headers.authorization
//     if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
//         //token = authHeader.split(" ")[1]
//         jwt.verify(req.headers.authorization.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
//             if(err){
//                 res.status(401).json({message: 'unauthorized user'})
//             }
//             // User.findOne({
//             //     _id: jwt.decode.id
//             // }).
//             console.log(decoded)
//         })
//     }
// })

// module.exports = validateToken