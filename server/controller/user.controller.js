'use strict';
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose'),
 User = mongoose.model('User');
var currentId = 0;
var host = 'http://35.237.194.223/';


function findById(req, res, next) {
    console.log(req.body);
    User.findById(req.body.userId, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);

    });
}

function findByIdParam(req, res, next) {
    User.findById(req.params.userId, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);

    });
}
function findUser(req, res){
    //console.log(req.body);
    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    User.find({firstName: firstname, lastName: lastname}, function(err, user){
        if(user.length == 0){
            console.log("user not found");
            res.status(204).send("User not found");
        }else{

            currentId = user[0]._id;
            res.json(user);
        console.log(user);
        console.log("user found");
        }
        
    })
};

function findAll(req, res, next){
    var usersProtection = {
        __v: false,
        ExerciseList: false
    };

    User.find({}, usersProtection, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });

};

function save(req, res, next) {
    console.log("API WORKS!!!");
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    User.find({firstName: firstName, lastName: lastName}, function(err, user){
        if(user.length == 0){
            var newUser = new User(req.body);
            newUser.save(function(err, user){
            if(err){
                res.send(err);
            }
            let id = user._id;
            let url = host + 'login';
            //res.redirect(url);
            res.json(user);

            });
        }else{
            let url = host + 'secure';
            //res.redirect(url);
            res.send(user);
        }
    })

};

function updateUser(req, res, next){
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
};

function deleteById(req, res, next){
    User.remove({
        _id: req.params.userId
    }, function(err, user){
        if(err){
            res.send(err);
        }
        res.json({message: 'User successfully deleted'});
        let url = host + 'login';
        //res.redirect(url);
        res.json(user);
    });

    // console.log("Delete User by ID");
    // let id = req.params.id;
    // return service.deleteById(res, id);
};

function createExercise(req, res, next){
    var exercises = req.body;
    console.log(exercises);
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$push: {ExerciseList: exercises}},
        function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        });
};

function getPhotos(req, res, next){
   User.findById(req.params.userId, 'PhotoList.fileName', function(err, user){
       if(err){
           res.send(err);
       }
       var array = new Array();
       var i;
       for (i in user.PhotoList) {
        var x = user.PhotoList[i];
        console.log(x.fileName);
        if(x.fileName != null){
            array.push(x.fileName);
        }
        
    }
       res.json(array);
       
   });
   
};

function saveFileName(file_name, req, res ){
    var fileName = {fileName: file_name}
    console.log("FILE UPLOAD WORKS");

    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$push: {PhotoList: fileName}},
        function(err, user){
            if(err){
                console.log(err);
            }
            console.log(user);
            //let url = 'http://localhost:8080/login' + '?' + user.id;
            //res.redirect(url);
            //res.status(200).end();
            //res.json(user);
            res.json(user);
        }
    );
    
};


function saveFileNameById(file_name, req, res ){
    var fileName = {fileName: file_name}
    console.log("FILE UPLOAD WORKS");
    console.log(req.cookie);
    console.log(req.body);
    console.log("current user id: " + currentId);
    User.findOneAndUpdate(
        {_id: currentId},
        {$push: {PhotoList: fileName}},
        function(err, user){
            if(err){
                console.log(err);
            }
            console.log(user);
            let url = host + 'login'
            res.json(user);
            //res.redirect(url);
            //res.status(200).end();
            //res.json(user);
            
        }
    );
    
};

function deletePhoto(req, res){
    const filename = req.body.name;
    console.log(filename);
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {PhotoList: {fileName: filename}}},
        function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        }
    );
};

function getUserExercises(req, res, next){
    User.findById(req.params.userId, function(err, user){
        if(err){
            res.send(err);
        }
    });
    

}





module.exports = {
    findById, 
    findAll, 
    save, 
    deleteById,
    getPhotos,
    createExercise,
    updateUser,
    saveFileName,
    deletePhoto,
    getUserExercises,
    findUser,
    saveFileNameById,
    findByIdParam
}