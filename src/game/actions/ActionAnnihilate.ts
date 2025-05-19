import { Action } from "./Action";
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
//import { Team } from "../elements/Team";

export class ActionAnnihilate extends Action {
    constructor(game: GameS25, locationStart: Location, locationEnd: Location) {
        super(game, locationStart, locationEnd);
    }

    validAction(): boolean {
        return this.game.getRules().checkValidAnnihilation(this.locationStart);
    }

    performAction(): void {
        let board = this.game.getGameBoard();
        let startSquare = board.getSquare(this.locationStart);
        let piece = startSquare.getPiece();
        let opponentTeam = this.game.getOpponentTeam();
        let currentTeam = this.game.getCurrentTeam();

        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                let newRow = this.locationStart.getRow() + r;
                let newCol = this.locationStart.getCol() + c;

                if (board.inBounds(newRow, newCol)) {
                    if (r === 0 && c === 0) continue; // Skip start square
                    let square = board.getSquare(new Location(newRow, newCol));
                    let targetPiece = square.getPiece();
                    if (targetPiece !== null) {
                        if (
                            targetPiece.getTeamColor() ===
                            opponentTeam.getTeamColor()
                        ) {
                            opponentTeam.removePieceFromTeam(targetPiece);
                        } else if (
                            targetPiece.getTeamColor() ===
                            currentTeam.getTeamColor()
                        ) {
                            currentTeam.removePieceFromTeam(targetPiece);
                        }
                        square.removePiece();
                    }
                    square.crackThisSquare();
                }
            }
        }

        if (piece !== null) {
            piece.updateAction("annihilate");
            piece.speak();
        }

        this.game.changeTurn();
    }
}
