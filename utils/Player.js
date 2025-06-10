const gameBoard = require("./gameBoard")

class Player{

    constructor(name){
        this.name = name
        this.moveList = []
        this.gameBoard = new gameBoard();
        this.carrierPlaced = false;
        this.battleshipPlaced = false;
        this.cruiserPlaced = false;
        this.submarinePlaced = false;
        this.destroyerPlaced = false;
    }
}

module.exports = Player