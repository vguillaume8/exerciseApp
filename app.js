const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userController    = require('./controller/user.controller');
const exerciseController = require('./controller/exercise.controller');
//const fileUploadController = require('./controller/fileupload.controller');
const port = process.env.PORT || 3000;


app.use(express.json());
app.get('/user', userController.findAll);
app.get('/user/:id', userController.findById);
app.post('/user', userController.save);
app.delete('/user/:id', userController.deleteById);


app.get('/exercise', exerciseController.findAll);
app.get('/exercise/:id', exerciseController.findById);
app.post('/exercise', exerciseController.save);
app.delete('/exercise/:id', exerciseController.deleteById);

//app.post('/fileupload', fileuploadController.save);

app.listen(port, () => console.log(`Listening on port ${port}...`));