const service = require('../service/user.service');

function findById(req, res, next) {

    let id = req.params.id;

    console.log(`get user by ID: ${id}`);

    return service.findById(res, id);
}

function findAll(req, res, next){

    console.log("get All Users");

    return service.findAll(res);
}

function save(req, res, next) {
    console.log("Create User");

    return service.save(res, req.body);
}

function deleteById(req, res, next) {

    console.log("Delete User by ID");
    let id = req.params.id;
    return service.deleteById(res, id);
}

module.exports = {
    findById, 
    findAll, 
    save, 
    deleteById
}