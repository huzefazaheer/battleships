const Ship = require('./battleship')

test('Create Battle ship and destroy it', () => {
    const ship = new Ship(2)

    expect(ship.isSunk()).toBeFalsy()
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBeTruthy()
})