class gameBoard{
    constructor(){
        this.board = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
    }

    placeShip(ship, Spos, isVert = false){
        let pos = []
        pos[0] = parseInt(Spos[0], 10)
        pos[1] = parseInt(Spos[1], 10)

        if(!isVert){
            if(ship.health+pos[0] > 9) throw new Error("Out of bounds")
            for(let i=pos[0]; i<ship.health+pos[0]; i++){
                if(this.board[i][pos[1]] != 0) throw new Error("Already occupied coordinate"+ this.board[i][0])
            }
            for(let i=pos[0]; i<ship.health+pos[0]; i++){
                this.board[i][pos[1]] = ship
            }
        }else{
            if(ship.health+pos[1] > 9) throw new Error("Out of bounds")
            for(let i=pos[1]; i<ship.health+pos[1]; i++){
                if(this.board[pos[0]][i] != 0) throw new Error("Already occupied coordinate"+ i)
            }
            for(let i=pos[1]; i<ship.health+pos[1]; i++){
                this.board[pos[0]][i] = ship
            }
        }
    }
}

module.exports = gameBoard;