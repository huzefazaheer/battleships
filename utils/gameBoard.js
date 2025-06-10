class gameBoard{
    constructor(){
        this.board = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
    }

    placeShip(ship, pos, isVert = false){
        if(!isVert){
            if(ship.health+pos[0] > 10) throw new Error("Out of bounds")
            for(i=pos[0]; i<ship.health+pos[0]; i++){
                if(this.board[i][pos[1]] != 0) throw new Error("Already occupied coordinate")
            }
            for(i=pos[0]; i<ship.health+pos[0]; i++){
                this.board[i][pos[1]] = ship
            }
        }else{
            if(ship.health+pos[1] > 10) throw new Error("Out of bounds")
            for(i=pos[0]; i<ship.health+pos[0]; i++){
                if(this.board[pos[0]][i] != 0) throw new Error("Already occupied coordinate")
            }
            for(i=pos[1]; i<ship.health+pos[1]; i++){
                this.board[pos[0]][i] = ship
            }
        }
    }
}

module.exports = gameBoard