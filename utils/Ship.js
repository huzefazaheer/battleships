class Ship{

    constructor(name, health){
        this.name = name;
        this.health = health;
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