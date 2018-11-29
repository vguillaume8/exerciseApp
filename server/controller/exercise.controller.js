const service = require('../service/exercise.service');

function findById(req, res, next) {

    let id = req.params.id;

    console.log(`get exercise by ID: ${id}`);
    
    return service.findById(res, id);
}

function findAll(req, res, next) {

    console.log("get All Exercises");

    return service.findAll(res);
}

function save(req, res, next) {
    console.log("Create Excercises");
    return service.save(res, req.body);
}

function deleteById(req, res, next) {

    console.log("Delete Exercises by ID");
    let id = req.params.id;
    return service.deleteById(res, id);
}

module.exports = {
    findById, 
    findAll, 
    save, 
    deleteById
}