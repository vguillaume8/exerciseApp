function save(user) {

    if (user.id) 
        throw new Error("User already exists by id: ${user.id}")

    let id = sequence.pop()

    sequence.push(id + 1)

    user.id = id

    users.set(id, user)

    return users.get(id);
}

module.exports = {
 
    save
}