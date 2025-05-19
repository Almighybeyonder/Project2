/*Problem 10: [5 points]
Represents a 'move' action.

Create a class named ActionMove that extends Action.It has the following:
- constructor with three parameters that get passed to the super's constructor
- implement method validAction 
    call checkValidMove from your rules class and return
    whether this move is valid 
- implement method performAction
    on a move:
    - if the end square is not cracked
        the Piece on the Start Square is moved to the End Square   
    - if the end square is cracked 
       the current team loses this piece (removed from board and team)   
    - the Piece speaks
    - the turn of the game is changed to the other player
*/
import { Action } from "./Action";
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
export class ActionMove extends Action {
    constructor(
        sameS25: GameS25,
        locationStart: Location,
        locationEnd: Location,
    ) {
        super(sameS25, locationStart, locationEnd);
    }
    validAction() {
        return this.game.rules.checkValidMove(
            this.locationStart,
            this.locationEnd,
        );
    }
    performAction() {
        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.locationStart);
        let endSquare = board.getSquare(this.locationEnd);
        let attackPiece = startSquare.getPiece();
        let teamNow = this.game.getCurrentTeam();
        if (attackPiece !== null) {
            if (endSquare.isCracked()) {
                startSquare.removePiece();
                teamNow.removePieceFromTeam(attackPiece);
            } else {
                startSquare.removePiece();
                endSquare.setPiece(attackPiece);
            }

            attackPiece.speak();
        }
        this.game.changeTurn();
    }
}
