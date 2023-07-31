
const cloudinary = require("cloudinary").v2;
require("dotenv").config()
cloudinary.config({ 
        cloud_name: 'dqkgwscbl', 
        api_key: '439349238494229', 
        api_secret: 'kpXqydeHUdB351MY-9UlDNOeRys' 
});


// exports.uploads = (file, folder)=>{
//         return new Promise(resolve=>{
//                 cloudinary.uploader.upload(file, (result)=>{
//                         resolve({
//                                 url:result.url,
//                                 id:result.public_id
//                         })
//                 },{
//                         rsource_type:'auto',
//                         folder:folder
//                 })
//         })
// }
  
   module.exports = cloudinary;