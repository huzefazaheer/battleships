import createGameBoard from "./gameboard.js"

export default class Player{

    constructor(name){
        this.name = name
        this.gameBoard = createGameBoard()
    }

}