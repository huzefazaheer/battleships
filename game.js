import Ship from "./utils/battleship.js"
import Player from "./utils/player.js"

console.log("Js loaded!")

let isAttackPhase = false

export function getUser1(){
    return new Player('Huzefa')
}

export function getUser2(){
    return new Player('Ibi')
}

export function checkForWinner(p1, p2){
    if(isAttackPhase){
        if(p1.gameBoard.shipsRemaining() == 0) return p2
        if(p2.gameBoard.shipsRemaining() == 0) return p1
    }
    return
}

function placeCarrier(player, y, x, vertical){
    if(player.carrierPlaced == false){
        player.gameBoard.placeShip(y, x, new Ship(5), vertical)
        player.carrierPlaced = true
        console.log(player.name, ' placed carrier on ', y, x)
        return true
    }else return false
}

function placeBattleship(player, y, x, vertical){
    if(player.battleshipPlaced == false){
        player.gameBoard.placeShip(y, x, new Ship(4), vertical)
        player.battleshipPlaced = true
        console.log(player.name, ' placed battleship on ', y, x)
        return true
    }else return false
}

function placeCruiser(player, y, x, vertical){
    if(player.cruiserPlaced == false){
        player.gameBoard.placeShip(y, x, new Ship(3), vertical)
        player.cruiserPlaced = true
        console.log(player.name, ' placed cruiser on ', y, x)
        return true
    }else return false
}

function placeSubmarine(player, y, x, vertical){
    if(player.submarinePlaced == false){
        player.gameBoard.placeShip(y, x, new Ship(3), vertical)
        player.submarinePlaced = true
        console.log(player.name, ' placed submarine on ', y, x)
        return true
    }else return false
}

function placeDestroyer(player, y, x, vertical){
    if(player.destroyerPlaced == false){
        player.gameBoard.placeShip(y, x, new Ship(2), vertical)
        player.destroyerPlaced = true
        console.log(player.name, ' placed destroyer on ', y, x)
        return true
    }else return false
}

function placeShips(player, i, j){
    while(player.allPlaced() == false){
            if (placeBattleship(player, i, j, isVert)) break
            if (placeCarrier(player, i, j, isVert)) break
            if (placeCruiser(player, i, j, isVert)) break
            if (placeSubmarine(player, i, j, isVert)) break
            if (placeDestroyer(player, i, j, isVert)) break
    }
}

export function drawGame(p1, p2){
    if (p1.allPlaced() && p2.allPlaced()) isAttackPhase = true

    const gameWrapper = document.querySelector('.gameWrapper')
    gameWrapper.innerHTML = ''

    const table = document.createElement('table')

    for (let i = 0; i < 10; i++){

        let tableRow = document.createElement('tr')
        tableRow.id = i
    
        for (let j = 0; j < 10; j++){
            let data = document.createElement('td')
            data.id = j
            if (p1.gameBoard.Board[i][j] != 0){
                data.textContent = p1.gameBoard.Board[i][j].health - p1.gameBoard.Board[i][j].hitCount
                data.classList.add('shiphit')
            }else data.textContent = 0
            if (data.textContent == 'NaN') data.textContent = 'x'
            tableRow.appendChild(data)
            data.addEventListener('click', () => {
                console.log(i, j)
                if(isAttackPhase == true){
                    p1.gameBoard.receiveAttack(i, j)
                }else{
                    placeShips(p1, i, j)
                }
                drawGame(p1, p2)
            })
        }
    
        table.appendChild(tableRow)
    }
    gameWrapper.appendChild(table)
    
    const table2 = document.createElement('table')
    
    for (let i = 0; i < 10; i++){
    
        let tableRow = document.createElement('tr')
    
        for (let j = 0; j < 10; j++){
            let data = document.createElement('td')
            let boat = 0
            if (p2.gameBoard.Board[i][j] != 0){
                data.textContent = p2.gameBoard.Board[i][j].health - p2.gameBoard.Board[i][j].hitCount
                data.classList.add('shiphit')
            }else data.textContent = 0
            if (data.textContent == 'NaN') data.textContent = 'x'
            tableRow.appendChild(data)
            data.addEventListener('click', () => {
                console.log(i, j)
                if(isAttackPhase ==true){
                    p2.gameBoard.receiveAttack(i, j)
                }else {
                    placeShips(p2, i, j)
                }
                drawGame(p1, p2)
            })
        }
    
        table2.appendChild(tableRow)
    }
    
    gameWrapper.appendChild(table)
    gameWrapper.appendChild(table2)

    if(checkForWinner(p1, p2) != undefined){
        gameWrapper.innerHTML = ''
        gameWrapper.textContent = checkForWinner(p1, p2).name + ' has won'
        return
    }
}

let isVert = false
document.onkeydown = (e) => {
    if(e.key == 'r' || e.key == 'R'){
        if(isVert) isVert = false
        else isVert = true
        console.log(isVert) 
    }
}   