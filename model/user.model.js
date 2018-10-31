'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserModel = new Schema({
  firstName: String,
  lastName: String,
  ExerciseList: [
    {
      name: String,
      duration: String,
      Date: String
    }
  ],
  PhotoList: [{
    fileName: String
  }]

});

module.exports = mongoose.model('User', UserModel);