import createGameBoard from "./gameboard.js"

export default class Player{

    constructor(name){
        this.name = name
        this.gameBoard = createGameBoard()
        this.carrierPlaced = false
        this.battleshipPlaced = false
        this.cruiserPlaced = false
        this.destroyerPlaced = false
        this.submarinePlaced = false
    }

    allPlaced(){
        if (this.carrierPlaced && this.battleshipPlaced && this.cruiserPlaced && this.destroyerPlaced && this.submarinePlaced){
            return true
        }else return false
    }

}