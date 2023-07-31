const express = require('express')
const userCntroller = require('../User-controller/user-controller')
const {validateToken} = require('../User-controller/validateUserToken')
const Router = express.Router()
const  userService  = require('../User-controller/user.services')

const ownerProfile = require('../User-controller/owner-info-controller')
const oldCommercialCarController = require('../User-controller/old-comm-car-controller')
const oldPrivateCarController = require('../User-controller/old-private-car-controller')
const newCarController = require('../User-controller/new-car-controller')
const uploadFile = require('../middleware/upload')
const uploader = require('../middleware/uploader')



// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

Router.get('/getProfile',validateToken, ownerProfile.getProfile)
Router.get('/getAllDoc',validateToken, newCarController.getAllCarCredentials)
Router.get('/allPrivateDoc',validateToken, oldPrivateCarController.getAllCarCredentials)


Router.post('/create', userService.registration)
Router.get('/current',validateToken, userCntroller.currentUser)
Router.get('/', userCntroller.getAllUsers)
Router.post('/forgotPassword', userCntroller.sendResetMail)
Router.patch('/resetPassword/:id/:token', userCntroller.passwordReset)

Router.get('/:id',validateToken, userCntroller.getSingleUser)
Router.put('/:id',validateToken, userCntroller.updateUser)
Router.delete('/:id',validateToken, userCntroller.deleteUser)

Router.post('/login', userService.login )


Router.post('/profile',validateToken, uploader.single('image'), userService.profile)
Router.get('/getProfile/:id',validateToken, ownerProfile.getSingleUserProfile)
Router.put('/updateProfile/:id',validateToken, uploader.single('image'), userService.editProfile)
Router.delete('/deleteProfile/:id',validateToken, ownerProfile.deleteUserProfile)




Router.post('/oldPrivate',validateToken, uploader.array('image'), userService.oldPrivateCar)
Router.get('/singlePrivateDoc/:id',validateToken, oldPrivateCarController.getSingleCarCredentials)
Router.put('/editPrivateDoc/:id',validateToken,uploader.array('image'), userService.editOldPrivateCar)
Router.delete('/delPrivateDoc/:id',validateToken, oldPrivateCarController.deleteCredential)




Router.post('/regNewCar',validateToken, uploader.array('image'), userService.newCar)
Router.get('/getSingleNewCar/:id',validateToken, newCarController.getSingleCarCredentials)
Router.put('/editNewCar/:id',validateToken,uploader.array('image'), userService.editNewCar)
Router.delete('/delNewCar/:id',validateToken, newCarController.deleteCredential)



// Router.get('/all', userCntroller.getUsers)
//Router.get('/del', userCntroller.deleteUser)
//Router.get('/getSingleUser', userCntroller.singleUser)

 

module.exports = Router