    import Player from "./utils/Player.js"
    import Ship from "./utils/Ship.js"

    const hp1name = document.querySelector(".p1name")
    const hp2name = document.querySelector(".p2name")


    let isHorizontal = true

    let carrier
    let battleship
    let cruiser
    let submarine
    let destroyer

    let ships

    function showWinScreen(text){
        const prompt = document.querySelector(".winscreen")
        const headingPrompt = document.querySelector(".winheading")
        const button = document.getElementById("btnwin")
        headingPrompt.innerText = text
        prompt.classList.remove("prompthidden")
        const buttonListener = (e) => {
            button.removeEventListener("click", buttonListener)
            prompt.classList.add("prompthidden")
            console.log("restart")
            playGame()
        }
        button.addEventListener("click", buttonListener)
    }

    async function getInputFromPrompt(text){
        const prompt = document.querySelector(".prompt")
        const button = document.getElementById("btn")
        const inputPrompt = document.querySelector(".pinput")
        const headingPrompt = document.querySelector(".promptheading")
        headingPrompt.innerText = text
        inputPrompt.value = ""
        prompt.classList.remove("prompthidden")
        return new Promise(resolve => {
            const enterHandler = (e) => {
            if(e.key == "Enter"){
                let val = inputPrompt.value
                if(val!=""){
                prompt.classList.add("prompthidden")
                button.removeEventListener("click", buttonListener)
                document.removeEventListener('keydown', enterHandler)
                resolve(val)
            }
            }}
            document.addEventListener('keydown', enterHandler)
            const buttonListener = (e) => {
            let val = inputPrompt.value
            if(val!=""){
                prompt.classList.add("prompthidden")
                button.removeEventListener("click", buttonListener)
                document.removeEventListener('keydown', enterHandler)
                resolve(val)
            }
        }
            button.addEventListener("click", buttonListener)
        })
    }

    let p1
    let p2

    async function placeUserShips(player){

        const rotateHandler = (e) => {
        if(e.key == "r"){
            isHorizontal == true ? isHorizontal = false : isHorizontal = true
            console.log("Rotation changed, isHorizontal", isHorizontal)
        }}
        
        document.addEventListener('keydown', rotateHandler)
    

        for(const ship of ships){
            setHint(player.name, "Place your ship.  Placing "+ ship.name)

            //fix boo boo code
            let previewCells = []
            const domBoard = getPlayerBoardDOM(player)
            let _id
            if(player === p1) _id = "1"
            else _id = "2"

            const mouseoverListener = (e) => {
                if(isHorizontal){
                    // console.log(ship.health)
                    for(let i = 0; i < ship.health; i++){
                        let x = parseInt(e.target.id[0], 10)
                        let y = parseInt(e.target.id[1], 10) + i
                        if(player.gameBoard.board[x][y] != 0) break
                        if(y > 9) break
                        let newid = x.toString() + y.toString() + _id
                        previewCells.push(newid)
                        document.getElementById(newid).classList.add('previewplacement')
                    }
                }else{
                    for(let i = 0; i < ship.health; i++){
                        let x = parseInt(e.target.id[0], 10) + i
                        let y = parseInt(e.target.id[1], 10)
                        if(player.gameBoard.board[x][y] != 0) break
                        if(x > 9) break
                        let newid = x.toString() + y.toString() + _id
                        previewCells.push(newid)
                        document.getElementById(newid).classList.add('previewplacement')
                    }
                }
            }
            domBoard.addEventListener("mouseover", mouseoverListener)

            const mouseoutListener = (e) => {
                // console.log(previewCells)
                for(const id of previewCells){
                    document.getElementById(id).classList.remove("previewplacement")
                }
                previewCells = []
            }
            domBoard.addEventListener("mouseout", mouseoutListener)

            let shipPlaced = false

            while(!shipPlaced){
                shipPlaced = false
                const playerCoords = await getPlayerPlaceCoords(player)
                try {
                    player.gameBoard.placeShip(ship, playerCoords, isHorizontal)
                    console.log("Placed",ship.name,"at coordinates: ", playerCoords[0], playerCoords[1])
                    shipPlaced = true
                    domBoard.removeEventListener("mouseout", mouseoutListener)
                    domBoard.removeEventListener("mouseover", mouseoverListener)
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

    function togglePlayer1DOM(){
        const playerGame = document.querySelector(".p1wrapper")
        if(playerGame.classList.contains("gameboardhidden")) playerGame.classList.remove("gameboardhidden")
        else playerGame.classList.add("gameboardhidden")
    }

    function togglePlayer2DOM(){
        const playerGame = document.querySelector(".p2wrapper")
        if(playerGame.classList.contains("gameboardhidden")) playerGame.classList.remove("gameboardhidden")
        else playerGame.classList.add("gameboardhidden")
    }

    async function playTurn(player){

        const hintHandler = (e) => {
        if(e.key == "p"){
            toggleShipsHint()
        }}
        
        document.addEventListener('keydown', hintHandler)

        console.log(player.name + " is doing their turn")
        let otherPlayer
        if(player===p1) otherPlayer = p2
        else otherPlayer = p1

        setHint(otherPlayer.name, "Select a coordinate to shoot")

        let attackResult
        try{
            const playerCoords = await getPlayerPlaceCoords(player)
            let item = player.gameBoard.board[playerCoords[0]][playerCoords[1]]
            console.log("selected  " + item)
            if(item == -1) {
                attackResult = "invalid"
                setHint(otherPlayer.name, "This square has already been attacked")
                await sleep(1000)
            }
            else if(item == 0){
                document.getElementById(playerCoords).classList.add("misshit")
                attackResult = "miss"
                console.log("miss")
                setHint(otherPlayer.name, "You have missed")
                await sleep(1000)
            }else {
                console.log("hit")
                document.getElementById(playerCoords).classList.add("shiphit")
                setHint(otherPlayer.name, "You have hit a ship")
                await sleep(1000)
                attackResult = "hit"
                item.hit()
                console.log(player.gameBoard.board[playerCoords[0]][playerCoords[1]])
                if(item.isSunk()) {
                    player.shipCount -= 1
                    console.log(item.name,"sunk")
                    setHint(otherPlayer.name, "You have sunk the " + item.name)
                    await sleep(1000)
                }
            }
            player.gameBoard.board[playerCoords[0]][playerCoords[1]] = -1
            document.removeEventListener('keydown', hintHandler)
            if((attackResult == "hit" || attackResult == "invalid") && getWinner() == null) await playTurn(player) 
        }catch (e){
            console.log(e)
        }
    }

    function getWinner(){
        if(p1.shipCount == 0) {return p2}
        else if(p2.shipCount == 0) return p1
        else return null
    }

    function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let isToggled = true
function toggleShipsHint(){
    const domBoard1 = getPlayerBoardDOM(p1)
    const domBoard2 = getPlayerBoardDOM(p2)

    for(let i = 0; i < 10; i++){
        const row = domBoard1.children[i]
        for(let j = 0; j < 10; j++){
            const column = row.children[j]
            if(p1.gameBoard.board[i][j] != 0){
                if(!isToggled){
                    column.classList.remove("hasship");
                    column.classList.remove("previewplacement");
                }else{
                    column.classList.add("hasship");
                    column.classList.add("previewplacement")
                }
            }
        }
    }

    for(let i = 0; i < 10; i++){
        const row = domBoard2.children[i]
        for(let j = 0; j < 10; j++){
            const column = row.children[j]
            if(p2.gameBoard.board[i][j] != 0){
                if(!isToggled){
                    column.classList.remove("hasship");
                    column.classList.remove("previewplacement");
                }else{
                    column.classList.add("hasship");
                    column.classList.add("previewplacement")
                }
            }
        }
    }

    isToggled == false ? isToggled = true : isToggled = false
}

function resetBoard(player){
    const domBoard = getPlayerBoardDOM(player)
    for(let i = 0; i < 10; i++){
            const row = domBoard.children[i]
            for(let j = 0; j < 10; j++){
                const column = row.children[j]
                if(player.gameBoard.board[i][j] != 0){
                    if(column.classList.contains("shiphit"))column.classList.remove("shiphit")
                    if(column.classList.contains("hasship"))column.classList.remove("hasship")
                    if(column.classList.contains("previewplacement"))column.classList.remove("previewplacement")
                    if(column.classList.contains("misshit"))column.classList.remove("misshit")
                }
            }
        }
}

function toggleHint(){
    const hintDOM = document.querySelector(".hintscreen")
    if(hintDOM.classList.contains("prompthidden")) hintDOM.classList.remove("prompthidden")
    else hintDOM.classList.add("prompthidden")
}

function setHint(heading, text){
    const hintH = document.querySelector(".hinth4")
    const hinttxt = document.querySelector(".hinttxt")
    hintH.innerText = heading
    hinttxt.innerText = text
}

async function playGame(){
    carrier = new Ship("Carrier", 5);
    battleship = new Ship("Battleship", 4);
    cruiser = new Ship("Cruiser", 3);
    submarine = new Ship("Submarine", 3);
    destroyer = new Ship("Destroyer", 2);

    ships = [carrier, battleship, cruiser, submarine, destroyer]


    let p1_name = await getInputFromPrompt("Enter player 1 name")
    let p2_name = await getInputFromPrompt("Enter player 2 name")

    p1 = new Player(p1_name);
    p2 = new Player(p2_name);

    hp1name.innerText = p1.name
    hp2name.innerText = p2.name

    toggleHint()
    setHint(p1.name, "Place your ships")
    togglePlayer1DOM()
    await placeUserShips(p1);
    displayBoard(p1)
    await sleep(1000)
    togglePlayer1DOM()
    togglePlayer2DOM()
    setHint(p2.name, "Place your ships")
    await placeUserShips(p2)
    displayBoard(p2)
    await sleep(1000)
    togglePlayer1DOM()
    console.log("Attacking Phase")
    toggleShipsHint()
    toggleHint()

    let winner = null
    toggleHint()
    while(winner == null){
        winner = getWinner()
        if(winner != null) break
        else await playTurn(p2)
        winner = getWinner()
        if(winner != null) break
        else await playTurn(p1)
        winner = getWinner()
        if(winner != null) break
    }

    toggleHint()
    showWinScreen(winner.name + " has won the game")
    resetBoard(p1)
    resetBoard(p2)
    togglePlayer1DOM()
    togglePlayer2DOM()
}

 playGame()
