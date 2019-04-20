const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
const mongoose = require('mongoose');
const User = require('./model/user.model');
mongoose.Promise = global.Promise;
mongoose.connect('URI String');
const userController = require('./controller/user.controller');
const connection = mongoose.connection;

// Checks to see if database is connected
connection.on('connected', function(){
  console.log("DB connected");
})

// sets port
const port = 3000;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 'X-Requested-With, Content-Type');
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));



// Third party to store images
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


app.post('/userAll', userController.findAll); // return all users

app.post('/user', userController.save); // save a user in database


app.post('/userLog', userController.findUser); // returns a user
app.get('/user/:userId', userController.findById); // returns a user
app.post('/userGet', userController.findByIdParam); // returns a user
app.post('/userGetHome', userController.findById); // returns a user


app.delete('/user/:userId', userController.deleteById); // deletes a user
app.post('/deleteUser/:userId', userController.deleteById); // deletes a user


// saves a photo
app.post('/upload/:userId', function(req, res){
  console.log(req) // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  userController.saveFileName(image.url, req, res);
    console.log(res.photo);
});

// saves a photo
app.post('/upload/', parser.single('photo'), function(req, res){
  console.log("Logged");
  //console.log(req.file) // to see what is returned to you
  const image = {};
  console.log(req.cookie);
  image.url = req.file.url;
  image.id = req.file.public_id;
  userController.saveFileNameById(image.url, req, res);
    console.log(res.photo);
});



app.post('/deletePhoto/:userId', userController.deletePhoto); // deletes a photo
app.delete('/photo/:userId/:fileName', userController.deletePhoto); // deletes a photo

app.get('/photo/:userId', userController.getPhotos); // gets all user's photos
app.post('/getPhotos/:userId', userController.getPhotos); // gets all user's photos

app.post('/exercise/:userId', userController.createExercise); // creates an exercise
app.get('/exercise/:userId', userController.getUserExercises); // gets all user exercises

app.get('/autocomplete/:search', userController.autoComplete);

app.listen(port, () => console.log(`Listening on port ${port}...`));