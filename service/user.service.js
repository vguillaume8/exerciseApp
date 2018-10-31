const repository = require('../repository/user.repository');
const exercise_repo = require('../repository/exercise.repository');

function findById(res, id) {

    let user = repository.findById(id);

    res.send(user);
}

function findAll(res){
    let list = repository.findAll();
    let body = {
        content: list
    };

    res.send(body);

}

function save(res, entity){
    let user = repository.save(entity);
    res.send(user);


}

function deleteById(res, id){
    let user = repository.deleteById(id);
    res.send(user);
    
}

function getAllUserExercises(res, id){
    let exercises_list = exercise_repo.getAllUserExercises(id);
    let body = {
        content: list
    };

    res.send(body);
    
}

module.exports = {
    findById, findAll, save, deleteById
}