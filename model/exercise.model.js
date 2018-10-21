class Exercise{
    
    constructor(name,){
        this.name = name;
        this.details = new Map();

    }

    get name(){
        return this._name;
    }

    get details(){
        return this._details;
    }
}