'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

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
  }],
  FriendList: [{
    _id: false,
    userId: ObjectId,
    firstName: String
  }]
 

},
{collection: 'users'});

module.exports = mongoose.model('User', UserModel);