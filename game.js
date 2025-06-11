    import Player from "./utils/Player.js"
    import Ship from "./utils/Ship.js"

    const hp1name = document.querySelector(".p1name")
    const hp2name = document.querySelector(".p2name")


    let isHorizontal = true
    let gameFinised = false

    const carrier = new Ship("Carrier", 5);
    const battleship = new Ship("Battleship", 4);
    const cruiser = new Ship("Cruiser", 3);
    const submarine = new Ship("Submarine", 3);
    const destroyer = new Ship("Destroyer", 2);

    const ships = [carrier, battleship, cruiser, submarine, destroyer]

    async function getInputFromPrompt(text){
        const prompt = document.querySelector(".prompt")
        const button = document.getElementById("btn")
        const inputPrompt = document.querySelector(".pinput")
        const headingPrompt = document.querySelector(".promptheading")
        headingPrompt.innerText = text
        prompt.classList.remove("prompthidden")
        return new Promise(resolve => {
            const buttonListener = (e) => {
            let val = inputPrompt.value
            prompt.classList.add("prompthidden")
            button.removeEventListener("click", buttonListener)
            resolve(val)
        }
            button.addEventListener("click", buttonListener)
        })
    }

    let p1_name = await getInputFromPrompt("Enter player 1 name")
    let p2_name = await getInputFromPrompt("Enter player 2 name")


    const p1 = new Player(p1_name);
    const p2 = new Player(p2_name);

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

    function displayBoard(player){
        const domBoard = getPlayerBoardDOM(player)

        for(let i = 0; i < 10; i++){
            const row = domBoard.children[i]
            for(let j = 0; j < 10; j++){
                const column = row.children[j]
                if(player.gameBoard.board[i][j] != 0){
                    column.classList.add("hasship");
                }
            }
        }
    }

    async function getPlayerPlaceCoords(player){
        const domBoard = getPlayerBoardDOM(player)
        
        return new Promise(resolve => {
            const clickHandler = (e) => {
                let UID = e.target.id
                domBoard.removeEventListener("click", clickHandler)
                resolve(UID)
            }

            domBoard.addEventListener("click", clickHandler)
        })

    }

    function getPlayerBoardDOM(player){
        let domBoard
        if(player === p1) domBoard = document.getElementById("p1Board").children[0]
        else domBoard = document.getElementById("p2Board").children[0]
        return domBoard
    }

    function toggleGameBoard(player){
        const domBoard = getPlayerBoardDOM(player)
        if(domBoard.classList.contains("gameboardhidden")) domBoard.classList.remove("gameboardhidden")
        else domBoard.classList.add("gameboardhidden")
    }

    async function playTurn(player){
        const playerCoords = await getPlayerPlaceCoords(player)
        try{
            player.gameBoard[playerCoords[0]][playerCoords[1]].hit()
            console.log("hit")
        }catch (e){
            console.log("error")
            playTurn(player)
        }
    }

    hp1name.innerText = p1.name
    hp2name.innerText = p2.name

    toggleGameBoard(p1)
    await placeUserShips(p1);
    displayBoard(p1.gameBoard)
    await placeUserShips(p2)
    displayBoard(p2.gameBoard)
    console.log("Attacking Phase")

    // while(!gameFinised){
    //     playTurn(p1)
    //     playTurn(p2)
    // }