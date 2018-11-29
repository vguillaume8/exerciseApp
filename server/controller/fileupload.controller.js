function save(req, res, next) {
    console.log("Save Picture");

    return service.save(res, req.body);
}

module.exports = {
    save
}