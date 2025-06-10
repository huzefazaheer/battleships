const Player = require("./Player")
const Ship = require("./Ship")

const p1 = new Player("player1");

const carrier = new Ship("Carrier", 5, false);
const cruiser = new Ship("Cruiser", 3, true);

test("Place valid carrier", () => {
    p1.gameBoard.placeShip(carrier, [2, 2])
    expect(p1.gameBoard.board[2][2]).toEqual(carrier);
    expect(p1.gameBoard.board[3][2]).toEqual(carrier);
    expect(p1.gameBoard.board[4][2]).toEqual(carrier);
    expect(p1.gameBoard.board[5][2]).toEqual(carrier);
})

test("Place valid cruiser vertically", () => {
    p1.gameBoard.placeShip(cruiser, [5, 5], true)
    expect(p1.gameBoard.board[5][5]).toEqual(cruiser);
    expect(p1.gameBoard.board[5][6]).toEqual(cruiser);
    expect(p1.gameBoard.board[5][7]).toEqual(cruiser);
})

test("Place ship out of bounds", () => { 
    expect(() => p1.gameBoard.placeShip(cruiser, [10, 10])).toThrow("Out of bounds");
})

test("Place ship where already placed", () => { 
    expect(() => p1.gameBoard.placeShip(cruiser, [2, 2]).toThrow("Already occupied coordinate"));
})