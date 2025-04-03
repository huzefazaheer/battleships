import { getUser1, getUser2, drawGame, checkForWinner } from "./game.js";

const p1 = getUser1()
const p2 = getUser2()

console.log(checkForWinner(p1, p2), ' has won this game')
drawGame(p1, p2)