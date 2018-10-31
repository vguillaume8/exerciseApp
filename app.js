const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://dev.jabaridash.com:27017/User_exercise');
const User = require('./model/user.model');
const userController = require('./controller/user.controller');

const port = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));


const multerConfig = {
    
    
    storage: multer.diskStorage({
     //Setup where the user's file will go
     destination: function(req, file, next){
       next(null, './public/photo-storage');
       },   
        
        //Then give the file a unique name
        filename: function(req, file, next){

            
            const ext = file.mimetype.split('/')[1];
            var file_name = file.fieldname + '-' + Date.now() + '.'+ext
            userController.saveFileName(file_name, req);
            next(null, file_name );
          }
        }),   
        
        //A means of ensuring only images are uploaded. 
        fileFilter: function(req, file, next){
              if(!file){
                next();
              }
            const image = file.mimetype.startsWith('image/');
            if(image){
              console.log('photo uploaded');
              next(null, true);
            }else{
              console.log("file not supported");
              
              //TODO:  A better message response to user on failure.
              return next();
            }
        }
      };
    

app.use(express.json());
app.get('/user', userController.findAll);
app.post('/user', userController.save);


app.get('/user/:userId', userController.findById);

app.delete('/user/:userId', userController.deleteById);

app.post('/upload/:userId', multer(multerConfig).single('photo'), function(req, res){
    res.send('Complete');
});

app.delete('/photo/:userId/:fileName', userController.deletePhoto);

app.get('/photo/:userId', userController.getPhotos);

app.put('/exercise/:userId', userController.createExercise);
app.get('/exercise/:userId', userController.getUserExercises);

app.listen(port, () => console.log(`Listening on port ${port}...`));