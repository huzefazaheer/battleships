function createGameBoard() {
    let Board = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
    let missedAttacks = []

    function placeShip(x, y, ship){
        checkCoords(x)
        checkCoords(y)

        for(let i = 0; i < ship.length; i++){
            Board[y][x+i] = ship
        }
    }

    function receiveAttack(x, y){
        const ship = Board[x][y]
        ship.hit()
        return true
    }

    function checkCoords(a){
        if(a > 9 || a < 0){
            throw new Error("Invalid coordinates")
        }
    }

    return {
        Board, receiveAttack, placeShip
    }
}

module.exports = createGameBoard