import Ship from "./utils/battleship.js"
import Player from "./utils/player.js"

console.log("Js loaded!")

let p1 = new Player('Huzefa')
let p2 = new Player('Ibi')

p1.gameBoard.placeShip(3, 3, new Ship(5), true)
p1.gameBoard.placeShip(0, 0, new Ship(4))
p1.gameBoard.placeShip(8, 6, new Ship(3))
p1.gameBoard.placeShip(5, 6, new Ship(3))
p1.gameBoard.placeShip(6, 0, new Ship(2), true)

p2.gameBoard.placeShip(2, 2, new Ship(5))
p2.gameBoard.placeShip(6, 2, new Ship(4), true)
p2.gameBoard.placeShip(7, 6, new Ship(3), true)
// p2.gameBoard.placeShip(7, 6, new Ship(3))
p2.gameBoard.placeShip(6, 9, new Ship(2), true)

const gameWrapper = document.querySelector('.gameWrapper')

// const p1name = document.createElement('p')
// p1name.textContent = p1.name

function drawGame(){

    gameWrapper.innerHTML = ''

    const table = document.createElement('table')

    for (let i = 0; i < 10; i++){

        let tableRow = document.createElement('tr')
    
        for (let j = 0; j < 10; j++){
            let data = document.createElement('td')
            if (p1.gameBoard.Board[i][j] != 0){
                data.textContent = p1.gameBoard.Board[i][j].health - p1.gameBoard.Board[i][j].hitCount
                data.classList.add('shiphit')
            }else data.textContent = 0
            if (data.textContent == 'NaN') data.textContent = 'x'
            tableRow.appendChild(data)
            data.addEventListener('click', () => {
                console.log(i, j)
                p1.gameBoard.receiveAttack(i, j)
                drawGame()
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
                p2.gameBoard.receiveAttack(i, j)
                drawGame()
            })
        }
    
        table2.appendChild(tableRow)
    }
    
    gameWrapper.appendChild(table)
    gameWrapper.appendChild(table2)
}

drawGame()

//TODO: Modularise