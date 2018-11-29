const { Exercise } = require('../model/exercise.model');

let exercises = new Map()
let sequence  = new Array()

sequence.push(0)

// Find a exercise by id
function findById(id) {

    id = parseInt(id)

    if (!exercises.has(id))
        throw new Error(`No entity by id: ${id}`)

    return exercises.get(id)
}

// Get all exercises
function findAll() {

    let values = []

    exercises.forEach( (v, k) => values.push(v)) 

    return values
}

// Save a new exercise
function save(exercise) {

    if (exercise.id) 
        throw new Error("exercise already exists by id: ${exercise.id}")

    let id = sequence.pop()

    sequence.push(id + 1)

    exercise.id = id

    exercises.set(id, exercise)

    return exercises.get(id);
}

// Delete a exercise by id
function deleteById(id) {
    id = parseInt(id)
    let exercise = findById(id);

    if (!exercise) 
        throw new Error(`No exercise for id: ${id}`);

    exercises.delete(id)

    return exercise;
}

function getAllUserExercises(id){
    let values = []

    exercises.forEach( (v, id) => values.push(v)) 

    return values

}

module.exports = {
    findById, 
    findAll, 
    save, 
    deleteById
}