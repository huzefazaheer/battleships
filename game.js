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

            //fix boo boo code
            let previewCells = []
            const domBoard = getPlayerBoardDOM(player)
            let _id
            if(player === p1) _id = "1"
            else _id = "2"

            const mouseoverListener = (e) => {
                previewCells.push(e.target.id) 
                e.target.classList.add("previewplacement")
                if(isHorizontal){
                    console.log(ship.health)
                    for(let i = 0; i < ship.health; i++){
                        let x = parseInt(e.target.id[0], 10)
                        let y = parseInt(e.target.id[1], 10) + i
                        if(y > 9) break
                        let newid = x.toString() + y.toString() + _id
                        previewCells.push(newid)
                        document.getElementById(newid).classList.add('previewplacement')
                    }
                }else{
                    for(let i = 0; i < ship.health; i++){
                        let x = parseInt(e.target.id[0], 10) + i
                        let y = parseInt(e.target.id[1], 10)
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
        try{
            const playerCoords = await getPlayerPlaceCoords(player)
            let item = player.gameBoard.board[playerCoords[0]][playerCoords[1]]
            console.log(item)
            if(item == -1) throw new Error("Already Hit")
            if(item == 0){
                document.getElementById(playerCoords).classList.add("misshit")
                console.log("miss")
            }else {
                console.log("hit")
                item.hit()
                document.getElementById(playerCoords).classList.add("shiphit")
                if(item.isSunk()) {
                    player.shipCount -= 1
                    console.log(item.name,"sunk")
                    
                }
                if(getWinner() == null) playTurn(player);
                
            }
            player.gameBoard.board[playerCoords[0]][playerCoords[1]] = -1
        }catch (e){
            console.log(e)
            if(e=="Error: Already Hit") playTurn(player)
        }
    }

    function getWinner(){
        if(p1.shipCount == 0) return p2
        else if(p2.shipCount == 0) return p1
        else return null
    }

    hp1name.innerText = p1.name
    hp2name.innerText = p2.name

    togglePlayer1DOM()
    await placeUserShips(p1);
    displayBoard(p1)
    await sleep(1000)
    togglePlayer1DOM()
    togglePlayer2DOM()
    await placeUserShips(p2)
    displayBoard(p2)
    await sleep(1000)
    togglePlayer1DOM()
    console.log("Attacking Phase")

    let winner = null
    while(winner == null){
        winner = getWinner()
        if(winner != null) break
        await playTurn(p2)
        winner = getWinner()
        if(winner != null) break
        await playTurn(p1)
        winner = getWinner()
        if(winner != null) break
    }

    console.log("Winner is ", winner.name)

    function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

