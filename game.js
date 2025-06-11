    import Player from "./utils/Player.js"
    import Ship from "./utils/Ship.js"

    let isHorizontal = true

    const carrier = new Ship("Carrier", 5);
    const battleship = new Ship("Battleship", 4);
    const cruiser = new Ship("Cruiser", 3);
    const submarine = new Ship("Submarine", 3);
    const destroyer = new Ship("Destroyer", 2);

    const ships = [carrier, battleship, cruiser, submarine, destroyer]

    const p1 = new Player("Player1");
    const p2 = new Player("Player2");

    async function placeUserShips(player){

        const rotateHandler = (e) => {
        if(e.key == "r"){
            isHorizontal == true ? isHorizontal = false : isHorizontal = true
            console.log("Rotation changed, isHorizontal", isHorizontal)
        }}
        document.addEventListener('keydown', rotateHandler)
    

        for(const ship of ships){
            let shipPlaced = false

            while(!shipPlaced){
                shipPlaced = false
                const playerCoords = await getPlayerPlaceCoords(player)
                try {
                    player.gameBoard.placeShip(ship, playerCoords, isHorizontal)
                    console.log("Placed",ship.name,"at coordinates: ", playerCoords[0], playerCoords[1])
                    shipPlaced = true
                } catch (error) {
                    console.log(error,"at", playerCoords[0], playerCoords[1])
                }
            }
        }

        document.removeEventListener('keydown', rotateHandler)

        return true 
        
    }

    function displayBoard(gameBoard){
        let domBoard

        if(gameBoard === p1.gameBoard) domBoard = document.getElementById("p1Board").children[0]
        else domBoard = document.getElementById("p2Board").children[0]

        for(let i = 0; i < 10; i++){
            const row = domBoard.children[i]
            for(let j = 0; j < 10; j++){
                const column = row.children[j]
                if(gameBoard.board[i][j] != 0){
                    column.classList.add("hasship");
                }
            }
        }
    }

    async function getPlayerPlaceCoords(player){
        let domBoard

        if(player === p1) domBoard = document.getElementById("p1Board").children[0]
        else domBoard = document.getElementById("p2Board").children[0]
        
        return new Promise(resolve => {
            const clickHandler = (e) => {
                let UID = e.target.id
                domBoard.removeEventListener("click", clickHandler)
                resolve(UID)
            }

            domBoard.addEventListener("click", clickHandler)
        })

    }

    await placeUserShips(p1);
    displayBoard(p1.gameBoard)
    await placeUserShips(p2)
    displayBoard(p2.gameBoard)