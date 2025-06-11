import gameBoard from "./gameBoard.js"

export default class Player{

    constructor(name){
        this.name = name
        this.moveList = []
        this.gameBoard = new gameBoard();
        this.gamesWon = 0;
    }
}
