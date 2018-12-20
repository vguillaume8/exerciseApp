'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserModel = new Schema({
  firstName: String,
  lastName: String,
  ExerciseList: [
    {
      _id: false,
      name: String,
      duration: String,
      Date: String
    }
  ],
  PhotoList: [{
    fileName: String
  }]
 

},
{collection: 'users'});

module.exports = mongoose.model('User', UserModel);