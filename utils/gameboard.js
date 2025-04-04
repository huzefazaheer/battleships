export default function createGameBoard() {
    let Board = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
    let missedAttacks = []
    let hitAttacks = []
    let totalShips = 0

    function placeShip(y, x, ship, isRotated = false){

        if (isRotated == false){
            for(let i = 0; i < ship.length; i++){
                checkCoords(y, x + i)
                checkIfFree(y, x + i)
                Board[y][x+i] = ship
            }
        }else {
            for(let i = 0; i < ship.length; i++){
                checkCoords(y + i, x)
                checkIfFree(y + i, x)
                Board[y+i][x] = ship
            }
        }


        totalShips ++
    }

    function receiveAttack(y, x){
        checkCoords(y, x)
        checkIfHit(y, x)

        if (hasShip(y, x)){
            const ship = Board[y][x]
            ship.hit()
            if (ship.isSunk()){
                totalShips --
            }
            Board[y][x] = 1
            console.log(hitAttacks)
            return true
        }else {
            missedAttacks.push([y, x])
            Board[y][x] = -1
            return false
        }

        
    }

    function checkCoords(a, b){
        if(a > 9 || a < 0 || b > 9 || b < 0){
            throw new Error("Invalid coordinates")
        }
    }

    function checkIfFree(y, x){
        if (Board[y][x] != 0){
            throw new Error('Already occupied square')
        }
    }

    function checkIfHit(y, x){
        if (Board[y][x] == 1){
            throw new Error('Already hit square')
        }
    }

    function hasShip(y, x){
        if (Board[y][x] == 0) return false
        else return true
    }

    function shipsRemaining(){
        return totalShips
    }

    return {
        Board, receiveAttack, placeShip, missedAttacks, shipsRemaining
    }
}