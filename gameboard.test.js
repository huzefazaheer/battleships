const createGameBoard = require('./gameboard')
const Ship = require('./battleship')
const gameBoard = createGameBoard()

test('Place ship at out of Bounds', () => {
    expect(() => gameBoard.placeShip(-1,-1,new Ship(2))).toThrow('Invalid coordinates')
})

test('Place ship at 0,0 which should be displayed', () => {

    const reqBoard = [[{"health": 2,"hitCount": 0,"length": 2},{"health": 2,"hitCount": 0,"length": 2},0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
    gameBoard.placeShip(0,0,new Ship(2))
    expect(gameBoard.Board).toEqual(reqBoard)
})

test('Hit ship and damage it', () => {

    gameBoard.placeShip(0,0,new Ship(2))
    expect(gameBoard.receiveAttack(0,0)).toBeTruthy()
    expect(gameBoard.Board[0][0].hitCount).toEqual(1)
    expect(gameBoard.Board[0][1].hitCount).toEqual(1)
})

test('Hit where there is no ship', () => {

    expect(gameBoard.receiveAttack(0,0)).toBeFalsy()
})