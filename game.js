    import Player from "./utils/Player.js"
    import Ship from "./utils/Ship.js"

    const carrier = new Ship("Carrier", 5);
    const battleship = new Ship("Battleship", 4);
    const cruiser = new Ship("Cruiser", 3);
    const submarine = new Ship("Submarine", 3);
    const destroyer = new Ship("Destroyer", 2);

    const p1 = new Player("Player1");
    const p2 = new Player("Player2");

    placeUserShips(p1);
    placeUserShips(p2)

    function placeUserShips(player){
        while(!player.carrierPlaced){
            let coords = [0,0]
            coords[0] = parseInt(prompt(player.name + ", Enter x coordinate for carrier"), 10);
            coords[1] = parseInt(prompt(player.name + ", Enter x coordinate for carrier"), 10);
            let inp = prompt(player.name + ", Do you want carrier to be vertically placed");
            let isV = false;
            inp === "t" ? isV = true : isV = false;
            try {
                player.gameBoard.placeShip(carrier, coords, isV)
                player.carrierPlaced = true
            } catch (error) {
                console.log(error, coords)
            }
        }
        
    }

    console.log(p1.gameBoard.board)