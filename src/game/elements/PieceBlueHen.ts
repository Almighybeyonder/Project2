/* HW10 Problem 3

In the constructor, add "move", "attack" and "spawn"
to the allowable actions array.

Implement the updateAction method with the following
logic:
-  if the action is "attack", then call increaseNumAttacks
*/

import { Piece } from "./Piece";
import { Location } from "./Location";
export class PieceBlueHen extends Piece {
    public static readonly MAX_NUM_ATTACKS: number = 3;
    private flies: boolean = true;
    private numAttacks: number;

    constructor(
        symbol: string = "H",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numAttacks: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numAttacks = numAttacks;
        // add a call to updateFly
        this.updateFly();
        this.allowableActions.push("move", "attack", "spawn");
    }
    updateAction(action: string): void {
        if (action === "attack") {
            this.increaseNumAttacks();
        }
    }
    getNumAttacks(): number {
        return this.numAttacks;
    }

    increaseNumAttacks(): void {
        this.numAttacks += 1;
        // Put call to updateFly here
        this.updateFly();
    }

    private updateFly(): void {
        this.flies = this.numAttacks <= PieceBlueHen.MAX_NUM_ATTACKS;
    }

    speak(): string {
        return "Go UD!";
    }

    spawn(): PieceBlueHen {
        this.numSpawns += 1;
        return new PieceBlueHen(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
            0,
        );
    }
    // addded start, and end,
    //added everything inside the code
    ///////////////////////
    validMovePath(start: Location, end: Location): boolean {
        let rowForStart = start.getRow();
        let colForStart = start.getCol();
        let rowForEnd = end.getRow();
        let colForEnd = end.getCol();
        let finalRow = rowForEnd - rowForStart;
        let finalCol = colForEnd - colForStart;
        if (this.flies) {
            return true;
        } else {
            return finalCol === 0 && (finalRow === 1 || finalRow === -1);
        }
    }

    canSpawn(): boolean {
        return this.original && this.numSpawns === 0;
    }
}
