import Ship from "./battleship"

const ship = new Ship(2)

test('Create Battle ship and see if it is destroyed', () => {
    expect(ship.isSunk()).toBeFalsy()
})

test('Attack twice and see if ship is destroyed', () => {
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBeTruthy()
})