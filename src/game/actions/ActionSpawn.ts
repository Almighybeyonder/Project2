/*Problem 13: [5 points]
Represents a 'spawn' action.

Create a class named ActionSpawn that extends Action. It has the following:
- constructor with three parameters that get passed to the super's constructor
- implementation for method validAction 
    call checkValidSpawn from your rules class and return
    whether this move is valid 
- implement method performAction
    on a spawn:
    - the Piece on the Start Square is spawned
    - if the end square is not cracked
        - the spawn is placed on the end square and added to the current team   
    - if the end square is cracked 
       - the current team loses this piece it doesn't get added to the board or the team 
        Note: you should still spawn it so it counts toward number of spawns 
    - the Piece being spawned speaks
    - the turn of the game is changed to the other player
*/
import { Action } from "./Action";
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
export class ActionSpawn extends Action {
    constructor(
        sameS25: GameS25,
        locationStart: Location,
        locationEnd: Location,
    ) {
        super(sameS25, locationStart, locationEnd);
    }
    validAction() {
        return this.game.rules.checkValidSpawn(
            this.locationStart,
            this.locationEnd,
        );
    }
    performAction(): void {
        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.locationStart);
        let endSquare = board.getSquare(this.locationEnd);
        let spawnPiece = startSquare.getPiece();
        let teamNow = this.game.getCurrentTeam();
        //let defendpiece = endSquare.getPiece();
        //let defendTeam = this.game.getOpponentTeam();

        if (spawnPiece !== null) {
            let newPiece = spawnPiece.spawn();
            if (endSquare.isCracked()) {
                newPiece;
            } else {
                endSquare.setPiece(newPiece);
                teamNow.addPieceToTeam(newPiece);
            }
            spawnPiece.updateAction("spawn"); // Added for consistency
            newPiece.speak();
        }
        this.game.changeTurn();
    }
}
