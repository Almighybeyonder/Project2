/* PieceScrat - Problem 4

Create a PieceScrat class that extends the Piece class.
It should have the following:
- constant MAX_CRACKS to represent the maximum number of squares it can crack and 
  set it to 2
- member field to represent whether this piece can crack a square or not  (true/false)
- member field to represent the number of attacks its made
- member field to represent the number of recruits its made
- member field to reprsent the number of cracks its made

- constructor with the parameters required by the superclass plus two
    new paratmeters: one for number of attacks and number of recruits (in that order)
     - calls the super class' constructor (symbol should be set to 'S' by default)     -
     - sets the number of attacks 
     - sets the number of recruits
     - sets the number of squares it cracked to 0
     - adds add "move", "attack" ,"recruit", "spawn", and "crack"
        to the allowable actions array.
- accessors 
    - getNumAttacks, getNumRecruits, getNumCracks
- mutator 
    – increaseNumAttacks - increments number of attacks by 1   
- mutator
    - increaseNumRecruits - increments number of recruits by 1
- mutator
    - increaseNumCracks - increments number of cracks by 1
- implement the speak method:
    - scrat should yell "Aaaahhhh!"
- implement the validMovePath method
    - for now it will return true
- implement the spawn method 
    - it should increase the number of spawns for 
    the object doing the spawning and then return a new PieceScrat
    with the following:
        - symbol - should match values of spawned object but should be lowercase
        - teamColor - should match values of spawned object
        - hidden - should match values of spawned object
        - original - should be set to false
- implement the canSpawn method
    - the piece can spawn as long as it is original and has
    - less than the maximum cracks allowed
- implement the updateAction method
    
*/
//import { setUncaughtExceptionCaptureCallback } from "process";
import { Location } from "./Location";
import { Piece } from "./Piece";
export class PieceScrat extends Piece {
    MAX_CRACKS: number = 2;
    canItCrack: boolean;
    numberOfAttacks: number;
    numberOfRecruits: number;
    numberOfCracks: number;

    constructor(
        symbol: string = "S",
        teamColor: string,
        hidden: boolean,
        original: boolean,
        numberOfAttacks: number,
        numberOfRecruits: number,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numberOfAttacks = numberOfAttacks;
        this.numberOfRecruits = numberOfRecruits;
        this.canItCrack = true;
        this.numberOfCracks = 0;
        this.allowableActions.push(
            "move",
            "attack",
            "recruit",
            "spawn",
            "crack",
        );
    }
    getNumAttacks() {
        return this.numberOfAttacks;
    }
    getNumRecruits() {
        return this.numberOfRecruits;
    }
    getNumCracks() {
        return this.numberOfCracks;
    }
    increaseNumAttacks() {
        return (this.numberOfAttacks += 1);
    }
    increaseNumRecruits() {
        return (this.numberOfRecruits += 1);
    }
    increaseNumCracks() {
        return (this.numberOfCracks += 1);
    }
    speak() {
        return "Aaaahhhh!";
    }
    /////
    validMovePath(start: Location, end: Location) {
        let rowForStart = start.getRow();
        let colForStart = start.getCol();
        let rowForEnd = end.getRow();
        let colForEnd = end.getCol();
        let finalRow = rowForEnd - rowForStart;
        let finalCol = colForEnd - colForStart;
        return (
            (finalCol === 0 && (finalRow === 2 || finalRow === -2)) ||
            (finalRow === 0 && (finalCol === 2 || finalCol === -2)) ||
            ((finalRow === 2 || finalRow === -2) &&
                (finalCol === 2 || finalCol === -2))
        );
    }
    spawn(): PieceScrat {
        this.numSpawns += 1;
        return new PieceScrat(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
            0,
            0,
        );
    }
    canSpawn() {
        return this.getNumCracks() < this.MAX_CRACKS && this.isOriginal();
    }
    updateAction(action: string): void {
        if (action === "attack") {
            this.increaseNumAttacks();
        } else if (action === "recruit") {
            this.increaseNumRecruits();
        } else if (action === "crack") {
            this.increaseNumCracks();
        }
    }
}
//NEWPIECE
