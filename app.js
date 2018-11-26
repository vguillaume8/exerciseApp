const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
var cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://dev.jabaridash.com:27017/User_exercise');
mongoose.connect('mongodb+srv://vguillaume:vmoney502@cluster0-zb5te.gcp.mongodb.net/exerciseApp');
const User = require('./model/user.model');
const userController = require('./controller/user.controller');
var connection = mongoose.connection;
connection.on('connected', function(){
  console.log("DB connected");
})
const port = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));


// const multerConfig = {
    
    
//     storage: multer.diskStorage({
//      //Setup where the user's file will go
//      destination: function(req, file, next){
//        next(null, './public/photo-storage');
//        },   
       
        
//         //Then give the file a unique name
//         filename: function(req, file, next){
          

            
//             const ext = file.mimetype.split('/')[1];
//             var file_name = file.fieldname + '-' + Date.now() + '.'+ext
//             userController.saveFileName(file_name, req);
//             next(null, file_name );
//           }
//         }),   
        
//         //A means of ensuring only images are uploaded. 
//         fileFilter: function(req, file, next){
//               if(!file){
//                 next();
//               }
//             const image = file.mimetype.startsWith('image/');
//             if(image){
//               console.log('photo uploaded');
//               next(null, true);
//             }else{
//               console.log("file not supported");
              
//               //TODO:  A better message response to user on failure.
//               return next();
//             }
//         }
//       };

cloudinary.config({
  cloud_name: 'dhkzmky45',
  api_key: '392267394929477',
  api_secret: 'QvEb2taMj-clQpgzVttaJ--fpJ4'
  });
  const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
  const parser = multer({ storage: storage });


    




app.use(express.json());
app.get('/user', userController.findAll);
app.post('/user', userController.save);
app.post('/userLog', userController.findUser);


app.get('/user/:userId', userController.findById);
app.post('/userGet/:userId', userController.findById);

app.delete('/user/:userId', userController.deleteById);


// app.post('/api/images', parser.single("image"), (req, res) => {
//   console.log(req.file) // to see what is returned to you
//   const image = {};
//   image.url = req.file.url;
//   image.id = req.file.public_id;
//   Image.create(image) // save image information in database
//     .then(newImage => res.json(newImage))
//     .catch(err => console.log(err));
// });

app.post('/upload/:userId', parser.single('photo'), function(req, res){
  console.log(req.file) // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  userController.saveFileName(image.url, req, res);
    console.log(res.photo);
});
app.post('/upload/', parser.single('photo'), function(req, res){
  //console.log(req.file) // to see what is returned to you
  const image = {};
  console.log(req.cookie);
  image.url = req.file.url;
  image.id = req.file.public_id;
  userController.saveFileNameById(image.url, req, res);
    console.log(res.photo);
});

app.delete('/photo/:userId/:fileName', userController.deletePhoto);

app.get('/photo/:userId', userController.getPhotos);
app.post('/getPhotos/:userId', userController.getPhotos);

app.post('/exercise/:userId', userController.createExercise);
app.get('/exercise/:userId', userController.getUserExercises);

app.listen(port, () => console.log(`Listening on port ${port}...`));