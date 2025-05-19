/*Problem 14: [5 points]
Represents a 'crack' action.

Create a class named ActionCrack that extends Action.It has the following:
- constructor with three parameters that get passed to the super's constructor
- implementation for method validAction 
    call checkValidCrack from your rules class and return
    whether this move is valid 
- implement method performAction
    on crack:
    - the End Square is cracked 
    - if the End Square is occupied
        - the Piece on the End Square is removed from the board and the opponent's team
    - the Start Square's Piece speaks
    - the turn of the game is changed to the other player
*/
import { Action } from "./Action";
import { Location } from "../elements/Location";
import { GameS25 } from "../elements/GameS25";
export class ActionCrack extends Action {
    constructor(game: GameS25, locationStart: Location, locationEnd: Location) {
        super(game, locationStart, locationEnd);
    }
    validAction() {
        return this.game.rules.checkValidCrack(
            this.locationStart,
            this.locationEnd,
        );
    }
    performAction() {
        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.locationStart);
        let endSquare = board.getSquare(this.locationEnd);
        let attackpiece = startSquare.getPiece();
        let defendpiece = endSquare.getPiece();
        let defendTeam = this.game.getOpponentTeam();

        //endSquare.crackThisSquare();
        if (defendpiece != null) {
            endSquare.removePiece();
            defendTeam.removePieceFromTeam(defendpiece);
        }
        endSquare.crackThisSquare();
        if (attackpiece != null) {
            attackpiece.updateAction("crack");
            attackpiece.speak();
        }
        this.game.changeTurn();
    }
}
