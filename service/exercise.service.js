const repository = require('../repository/exercise.repository');

function findById(res,id){
    let exerciseexercise = repository.findById(id);
    res.send(exercise);

}

function findAll(res){
    let list = repository.findAll();
    let body = {
        content: list
    };

    res.send(body);

}

function save(res, entity){
    let exercise = repository.save(entity);
    res.send(exercise);


}

function deleteById(res, id){
    let exercise = repository.deleteById(id);
    res.send(exercise);
    
}

module.exports = {
    findById, findAll, save, deleteById
}