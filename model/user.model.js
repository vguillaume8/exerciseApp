
class User{

    constructor(name){
        this.name = name;
        this.exercises = [];

    }    

    get name(){
        return this._name;
    }

    set name(name){
        this._name = name;
    }

    get exercises(){
        return this._exercises;
    }

    set exercises(exercises) {
        this._exercises = exercises;
    }


}

module.exports = {
    User
};