'use strict';
const mongoose = require('mongoose'),
 User = mongoose.model('User');
var currentId = 0;



function findById(req, res) {
    console.log(req.body);
    User.findById(req.body.userId, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);

    });
}

function findByIdParam(req, res) {
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
        }
        
    })
};

function findAll(req, res){
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

function save(req, res) {
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
            res.redirect('http://exercise.vinstonguillaume.com');

            });
        }else{
            res.redirect('http://exercise.vinstonguillaume.com');
        }
    })

};

function updateUser(req, res){
    User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
};

function deleteById(req, res){
    User.remove({
        _id: req.params.userId
    }, function(err, user){
        if(err){
            res.send(err);
        }
        res.redirect('http://exercise.vinstonguillaume.com');
    });
};

function createExercise(req, res){
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

function getPhotos(req, res){
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
    var fileName = {fileName: file_name};

    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$push: {PhotoList: fileName}},
        function(err, user){
            if(err){
                console.log(err);
            }
            res.redirect('http://exercise.vinstonguillaume.com');
        }
    );
    
};


function saveFileNameById(file_name, res ){
    var fileName = {fileName: file_name};
    User.findOneAndUpdate(
        {_id: currentId},
        {$push: {PhotoList: fileName}},
        function(err){
            if(err){
                console.log(err);
            }
            res.redirect('http://exercise.vinstonguillaume.com');
            
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

function getUserExercises(req, res){
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