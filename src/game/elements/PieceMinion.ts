/* HW10 Problem 3

In the constructor, add "move", "recruit" and "spawn"
to the allowable actions array.

Override the updateAction method with the following
logic:
-  if the action is "recruit", then call increaseNumRecruits
*/

import { Piece } from "./Piece";
///imported Location
import { Location } from "./Location";
export class PieceMinion extends Piece {
    private numRecruits: number;

    public static readonly MAX_NUM_SPAWNED: number = 3;

    constructor(
        symbol: string = "M",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numRecruits: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numRecruits = numRecruits;
        this.allowableActions.push("move", "recruit", "spawn");
    }

    getNumRecruits(): number {
        return this.numRecruits;
    }
    updateAction(action: string): void {
        if (action === "recruit") {
            this.increaseNumRecruits();
        }
    }
    increaseNumRecruits(): void {
        this.numRecruits += 1;
    }

    canSpawn(): boolean {
        return this.original && this.numSpawns <= PieceMinion.MAX_NUM_SPAWNED;
    }

    speak(): string {
        return "Bello!";
    }
    /////
    validMovePath(start: Location, end: Location): boolean {
        let rowForStart = start.getRow();
        let colForStart = start.getCol();
        let rowForEnd = end.getRow();
        let colForEnd = end.getCol();
        let finalRow = rowForEnd - rowForStart;
        let finalCol = colForEnd - colForStart;
        return Math.abs(finalRow) === 1 && Math.abs(finalCol) === 1;
    }

    spawn(): PieceMinion {
        this.numSpawns += 1;
        return new PieceMinion(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
            0,
        );
    }
}
