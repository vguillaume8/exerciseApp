function save(res, entity){
    let user = repository.save(entity);
    res.send(user);


}


module.exports = {
   save
}