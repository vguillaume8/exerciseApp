const { User} = require('../model/user.model');

let users    = new Map()
let sequence = new Array()

sequence.push(0)

// Find a user by id
function findById(id) {

    id = parseInt(id)

    if (!users.has(id))
        throw new Error(`No entity by id: ${id}`)

    return users.get(id)
}

// Get all users
function findAll() {

    let values = []

    users.forEach( (v, k) => values.push(v)) 

    return values
}

// Save a new user
function save(user) {

    if (user.id) 
        throw new Error("User already exists by id: ${user.id}")

    let id = sequence.pop()

    sequence.push(id + 1)

    user.id = id

    users.set(id, user)

    return users.get(id);
}

// Delete a user by id
function deleteById(id) {
    id = parseInt(id);
    let user = findById(id);

    if (!user) 
        throw new Error(`No user for id: ${id}`);

    users.delete(id)

    return user;
}

module.exports = {
    findById, 
    findAll, 
    save, 
    deleteById
}