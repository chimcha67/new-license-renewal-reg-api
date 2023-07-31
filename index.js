const cors = require("cors");
const express = require("express");
const app = express();
const multer = require("multer");
const initRoutes = require('./file.routes/file-route')
const bodyParser = require('body-parser')
const fileUpload  = require('express-fileupload')
const path = require('path');
const connectDb = require("./models/db");
const Image = require('./models/file-schema')
const fileRouter = require('./file.routes/file-route')
const userRouter = require('./user-routes/users')
const oldcarfileRouter = require('./user-routes/old-car-routes')
const dotenv = require("dotenv")

global.__basedir = __dirname;

//link = 'https://licence-reg-renewal-api.onrender.com'

app.use(
    express.json()
)


app.use (cors())
require('./file.routes/index.routes')
// app.use(cors({
//   methods:['GET', 'POST','DELETE', 'UPDATE', ,'PUT']
// }))

//documentation_link = 'https://documenter.getpostman.com/view/28308145/2s946h9CcX'

app.use(bodyParser.json());


app.use(express.urlencoded({extended: true}))
dotenv.config()
connectDb()

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
app.set('view engine', 'ejs')
//app.use(cors(corsOptions));

global.appRoot = path.resolve(__dirname)

app.use(express.urlencoded({ extended: true }));
app.use('/files', fileRouter)
app.use('/user', userRouter)
app.use('/', oldcarfileRouter)



// initRoutes(app);


const port = 8080;
app.listen(port, () => {
  port,
  console.log(`Running at localhost:${port}`);
});



// app.post("/uploadPhoto", upload.single("myImage"), (req, res) => {
//   const obj = {
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };
//   const newImage = new ImageModel({
//     image: obj.img,
//   });
//   newImage.save((err) => {
//     err ? console.log(err) : res.redirect("/");
//   });
// });



// app.get("/getimg", (req, res) => {
//   Image.find({}, (err, images) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("An error occurred", err);
//     } else {
//       res.render("index", { images: images });
//     }
//   });
// });

// app.get('/', (req, res)=>{
  
//   //res.sendFile(path.join(__dirname, 'index.html'))
//   res.render('index')
 
// })


