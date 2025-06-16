const gameBoard = require('./gameBoard')

class Player{

    constructor(name){
        this.name = name
        this.moveList = []
        this.gameBoard = new gameBoard();
        this.gamesWon = 0;
        this.shipCount = 5;
    }
}

module.exports = Player;