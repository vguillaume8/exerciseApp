//Require Mongoose
var mongoose = require('mongoose');


//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    a_user: String,
    a_id: Number
});

// Compile model from schema
var userModel = mongoose.model('userModel', userSchema );