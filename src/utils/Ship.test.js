const Ship = require ('./Ship')

const crusier = new Ship("Cruiser", 3)

test("Damage ship", () => {
    crusier.hit()
    expect(crusier.health).toBe(2)
})


test("Sink ship", () => {
    crusier.hit()
    crusier.hit()
    expect(crusier.isSunk).toBeTruthy()
})