import createGameBoard from "./gameboard"
import Ship from "./battleship"

export default gameBoard = createGameBoard()

test('Place ship at out of Bounds', () => {
    expect(() => gameBoard.placeShip(-1,-1,new Ship(2))).toThrow('Invalid coordinates')
})

test('Place ship at 0,0 which should be displayed', () => {

    const reqBoard = [[{"health": 2,"hitCount": 0,"length": 2},{"health": 2,"hitCount": 0,"length": 2},0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
    gameBoard.placeShip(0,0,new Ship(2))
    expect(gameBoard.Board).toEqual(reqBoard)
})

test('Coords already have a ship', () => {
    expect(() => gameBoard.placeShip(0,1,new Ship(2))).toThrow('Already occupied square')
})

test('Place ship at 1,1 vertically which should be displayed', () => {

    const reqBoard = [[{"health": 2,"hitCount": 0,"length": 2},{"health": 2,"hitCount": 0,"length": 2},0,0,0,0,0,0,0,0],[0,{"health": 2,"hitCount": 0,"length": 2},0,0,0,0,0,0,0,0],[0,{"health": 2,"hitCount": 0,"length": 2},0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
    gameBoard.placeShip(1,1,new Ship(2), true)
    expect(gameBoard.Board).toEqual(reqBoard)
})

test('Hit ship and damage it', () => {

    expect(gameBoard.receiveAttack(0,0)).toBeTruthy()
    expect(gameBoard.Board[0][0]).toEqual(1)
    expect(gameBoard.Board[0][1].hitCount).toEqual(1)
})

test('Check damage of unhit ship', () => {

    expect(gameBoard.Board[1][1].hitCount).toEqual(0)
    expect(gameBoard.Board[2][1].hitCount).toEqual(0)
})

test('Hit where there is no ship', () => {

    expect(gameBoard.receiveAttack(7,7)).toBeFalsy()
    expect(gameBoard.missedAttacks.length).toBe(1)
    expect(gameBoard.shipsRemaining()).toBe(2)
    expect(gameBoard.missedAttacks).toEqual([[7, 7]])
})

test('All ships are sunk', () => {
    gameBoard.receiveAttack(0, 1)
    gameBoard.receiveAttack(1, 1)
    gameBoard.receiveAttack(2, 1)

    expect(gameBoard.shipsRemaining()).toBe(0)
})