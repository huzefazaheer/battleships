class Ship{

    constructor(name, health, isVert = false){
        this.name = name;
        this.health = health;
        this.isVert = isVert;
    }

    hit(){
        if(!this.isSunk()){
            this.health --;
        }
    }

    isSunk(){
        shipSunk = false;
        this.health == 0 ? shipSunk = true : false;
        return shipSunk;
    }

}

module.exports = Ship;