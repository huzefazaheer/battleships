export default class Ship{

    constructor (length){
        this.length = length
        this.health = length
        this.hitCount = 0
    }

    hit() {
        this.hitCount ++
    }

    isSunk(){
        if (this.hitCount == this.health) return true
        else return false
    }

}