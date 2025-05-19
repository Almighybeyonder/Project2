/*Problem 12: [5 points]
Represents a 'recruit' action.

Create a class named ActionRecruit that extends Action.It has the following:
- constructor with three parameters that get passed to the super's constructor
- implementation for method validAction 
    call checkValidRecruit from your rules class and return
    whether this move is valid 
- implement method performAction
    on an recruit:
    - the Piece on the End Square is removed from the opponent's team
    - the Piece on the End Square is added to the current player's team
    - the Piece being recruited speaks
    - the turn of the game is changed to the other player
*/
import { Action } from "./Action";
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
export class ActionRecruit extends Action {
    constructor(
        sameS25: GameS25,
        locationStart: Location,
        locationEnd: Location,
    ) {
        super(sameS25, locationStart, locationEnd);
    }
    validAction() {
        return this.game.rules.checkValidRecruit(
            this.locationStart,
            this.locationEnd,
        );
    }
    performAction(): void {
        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.locationStart);
        let endSquare = board.getSquare(this.locationEnd);
        let attackPiece = startSquare.getPiece();
        let teamNow = this.game.getCurrentTeam();
        let defendpiece = endSquare.getPiece();
        let defendTeam = this.game.getOpponentTeam();
        if (defendpiece != null) {
            defendTeam.removePieceFromTeam(defendpiece);
            teamNow.addPieceToTeam(defendpiece);
            defendpiece.setTeamColor(teamNow.getTeamColor());
            defendpiece.speak();
        }
        if (attackPiece != null) {
            attackPiece.updateAction("recruit");
        }
        this.game.changeTurn();
    }
}
