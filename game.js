import Ship from "./utils/battleship.js"
import Player from "./utils/player.js"

console.log("Js loaded!")

let p1 = new Player('Huzefa')
let p2 = new Player('Ibi')

p1.gameBoard.placeShip(3, 3, new Ship(3), true)
p1.gameBoard.placeShip(0, 0, new Ship(2))

p2.gameBoard.placeShip(2, 2, new Ship(3))
p2.gameBoard.placeShip(4, 2, new Ship(2), true)

const table = document.createElement('table')
const gameWrapper = document.querySelector('.gameWrapper')

// const p1name = document.createElement('p')
// p1name.textContent = p1.name

for (let i = 0; i < 10; i++){

    let tableRow = document.createElement('tr')

    for (let j = 0; j < 10; j++){
        let data = document.createElement('span')
        if (p1.gameBoard.Board[i][j] != 0){
            data.textContent = p1.gameBoard.Board[i][j].health
        }else data.textContent = 0
        tableRow.appendChild(data)
    }

    table.appendChild(tableRow)
}
gameWrapper.appendChild(table)

const table2 = document.createElement('table')

for (let i = 0; i < 10; i++){

    let tableRow = document.createElement('tr')

    for (let j = 0; j < 10; j++){
        let data = document.createElement('span')
        if (p2.gameBoard.Board[i][j] != 0){
            data.textContent = p2.gameBoard.Board[i][j].health
        }else data.textContent = 0
        tableRow.appendChild(data)
    }

    table2.appendChild(tableRow)
}

gameWrapper.appendChild(table)
gameWrapper.appendChild(table2)