/*Problem 11: [5 points]
Represents a 'attack' action.

Create a class named ActionAttack that extends Action.It has the following:
- constructor with three parameters that get passed to the super's constructor
- implement method validAction 
    call checkValidAttack from your rules class and return
    whether this move is valid 
- implement method performAction
    on an attack:
    - the Piece on the End Square is removed from the board
    - the Piece on the End Square is removed from the opponent's team
    - Piece on the Start Square is moved to the End Square
    - the Piece being attacked speaks
    - the turn of the game is changed to the other player
*/
import { Action } from "./Action";
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
export class ActionAttack extends Action {
    constructor(game: GameS25, locationStart: Location, locationEnd: Location) {
        super(game, locationStart, locationEnd);
    }
    validAction() {
        return this.game.rules.checkValidAttack(
            this.locationStart,
            this.locationEnd,
        );
    }
    performAction(): void {
        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.locationStart);
        let endSquare = board.getSquare(this.locationEnd);

        let attackPiece = startSquare.getPiece();
        let defendPiece = endSquare.getPiece();

        if (defendPiece != null) {
            endSquare.removePiece();
            let defendingTeam = this.game.getOpponentTeam();
            defendingTeam.removePieceFromTeam(defendPiece);
        }
        if (attackPiece != null) {
            startSquare.removePiece();
            endSquare.setPiece(attackPiece);
            attackPiece.updateAction("attack");
            attackPiece.speak();
        }
        this.game.changeTurn();
    }
}
