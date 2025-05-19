/* 
Problem 8: [20 points]
Create a class named Rules.  
This will represent the set of rules for each type of Piece we have in the game.
- member field for a string message
- member field for game (which should be of type GameS25)  // already done for you
- constructor with one game parameter that sets this field // already done for you
- accessors 
    - getMessage
- methods below - all have two Location parameters and return a boolean
    checkValidMove
    checkValidAttack
    checkValidRecruit
    checkValidSpawn
    checkValidCrack
    These methods should check the rules described in the HW10 Canvas assignment
    and return true if the action can be taken and false otherwise. If the action
    is not valid - the message field should be updated with a message to the player
    explaining why the action is not valid.  
    For example: "The piece you are moving does not belong to your team."

Tips:  
Implement the code for a valid move first. 
*/
import { GameS25 } from "./GameS25";
import { Location } from "./Location";
import { Piece } from "./Piece";

export class Rules {
    message: string = "";
    constructor(protected game: GameS25) {}

    getMessage(): string {
        return this.message;
    }

    private checkInBounds(location: Location): boolean {
        if (
            !this.game
                .getGameBoard()
                .inBounds(location.getRow(), location.getCol())
        ) {
            this.message = "Location out of bounds";
            return false;
        }
        return true;
    }

    private containsAPiece(location: Location): boolean {
        if (!this.checkInBounds(location)) return false;

        const square = this.game.getGameBoard().getSquare(location);
        const piece = square.getPiece();
        const currentTeam = this.game.getCurrentTeam();

        if (piece === null) {
            this.message = "No piece at location";
            return false;
        }
        if (piece.getTeamColor() !== currentTeam.getTeamColor()) {
            this.message = "Piece belongs to opponent team";
            return false;
        }
        return true;
    }

    private checkCommonRequirements(location: Location): boolean {
        return this.checkInBounds(location) && this.containsAPiece(location);
    }

    private allowed(piece: Piece, actionType: string): boolean {
        return piece.allowableAction(actionType);
    }

    private isSquareEmpty(location: Location): boolean {
        if (!this.checkInBounds(location)) return false;
        const square = this.game.getGameBoard().getSquare(location);
        return square.getPiece() === null;
    }

    private containsOpponentPiece(location: Location): boolean {
        if (!this.checkInBounds(location)) return false;
        const square = this.game.getGameBoard().getSquare(location);
        const piece = square.getPiece();
        const opponentTeam = this.game.getOpponentTeam();

        if (piece === null) return false;
        return piece.getTeamColor() === opponentTeam.getTeamColor();
    }

    private containsCurrentTeamPiece(location: Location): boolean {
        if (!this.checkInBounds(location)) return false;
        const square = this.game.getGameBoard().getSquare(location);
        const piece = square.getPiece();
        const currentTeam = this.game.getCurrentTeam();

        if (piece === null) return false;
        return piece.getTeamColor() === currentTeam.getTeamColor();
    }
    //NEW RULE: added method to check if beyonder is
    //contained by three or more pieces
    private isBeyonderContained(
        piece: Piece,
        startLocation: Location,
    ): boolean {
        if (piece.getSymbol() !== "B") return false;

        let surroundingEnemies = 0;
        let row = startLocation.getRow();
        let col = startLocation.getCol();
        let directions = [
            [-1, 0], // Up
            [1, 0], // Down
            [0, -1], // Left
            [0, 1], // Right
        ];

        for (let [dr, dc] of directions) {
            let newRow = row + dr;
            let newCol = col + dc;
            if (this.game.getGameBoard().inBounds(newRow, newCol)) {
                let square = this.game
                    .getGameBoard()
                    .getSquare(new Location(newRow, newCol));
                let adjacentPiece = square.getPiece();
                if (
                    adjacentPiece !== null &&
                    adjacentPiece.getTeamColor() ===
                        this.game.getOpponentTeam().getTeamColor()
                ) {
                    surroundingEnemies++;
                }
            }
        }

        return surroundingEnemies >= 3;
    }
    //NEW RULE: Added method to update the beyonder cooldowns
    //at the start of each turn
    updatePieceStates(): void {
        let board = this.game.getGameBoard();
        let allSquares = board.getAllSquares();
        for (let row = 0; row < board.getNumRows(); row++) {
            for (let col = 0; col < board.getNumColumns(); col++) {
                let piece = allSquares[row][col].getPiece();
                if (piece !== null && piece.getSymbol() === "B") {
                    piece.updateAction("reduce-cooldown");
                }
            }
        }
    }

    checkValidMove(startLocation: Location, endLocation: Location): boolean {
        if (!this.checkCommonRequirements(startLocation)) return false;

        const piece = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        if (piece === null) return false;

        if (!this.allowed(piece, "move")) {
            this.message = "This piece cannot move";
            return false;
        }
        if (!this.isSquareEmpty(endLocation)) {
            this.message = "Target square must be empty";
            return false;
        }
        if (!piece.validMovePath(startLocation, endLocation)) {
            this.message = "Invalid move path for this piece";
            return false;
        }
        //NEW RULE : prevents Beyonder from moving if it is contained
        if (this.isBeyonderContained(piece, startLocation)) {
            this.message = "Beyonder is contained and cannot move";
            return false;
        }
        return true;
    }

    checkValidSpawn(startLocation: Location, endLocation: Location): boolean {
        if (!this.checkCommonRequirements(startLocation)) return false;

        let piece = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        if (piece === null) return false;

        if (!piece.canPerformAction("spawn")) {
            this.message = "This piece cannot spawn";
            return false;
        }
        if (!this.isSquareEmpty(endLocation)) {
            this.message = "Target square must be empty";
            return false;
        }
        if (!piece.validMovePath(startLocation, endLocation)) {
            this.message = "Invalid spawn path for this piece";
            return false;
        }
        return true;
    }

    checkValidAttack(startLocation: Location, endLocation: Location): boolean {
        if (!this.checkCommonRequirements(startLocation)) return false;

        const piece = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        if (piece === null) return false;

        if (!piece.canPerformAction("attack")) {
            this.message = "This piece cannot attack";
            return false;
        }
        if (!this.containsOpponentPiece(endLocation)) {
            this.message = "Target must be opponent's piece";
            return false;
        }
        if (!piece.validMovePath(startLocation, endLocation)) {
            this.message = "Invalid attack path for this piece";
            return false;
        }
        //NEW RULE: Prevent beyonder to attack if contained
        if (this.isBeyonderContained(piece, startLocation)) {
            this.message = "Beyonder is contained and cannot attack";
            return false;
        }
        return true;
    }

    checkValidRecruit(startLocation: Location, endLocation: Location): boolean {
        if (!this.checkCommonRequirements(startLocation)) return false;

        const piece = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        if (piece === null) return false;

        if (!piece.canPerformAction("recruit")) {
            this.message = "This piece cannot recruit";
            return false;
        }
        if (!this.containsOpponentPiece(endLocation)) {
            this.message = "Target must be opponent's piece";
            return false;
        }
        if (!piece.validMovePath(startLocation, endLocation)) {
            // Added for Requirement 1
            this.message = "Invalid recruit path for this piece";
            return false;
        }
        return true;
    }

    checkValidCrack(startLocation: Location, endLocation: Location): boolean {
        if (!this.checkCommonRequirements(startLocation)) return false;

        if (!this.checkInBounds(endLocation)) {
            this.message = "End location out of bounds";
            return false;
        }

        const piece = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        if (piece === null) return false;

        if (!piece.canPerformAction("crack")) {
            this.message = "This piece cannot crack";
            return false;
        }
        if (this.containsCurrentTeamPiece(endLocation)) {
            this.message = "Cannot crack your own piece";
            return false;
        }
        if (!piece.validMovePath(startLocation, endLocation)) {
            // Added for Requirement 1
            this.message = "Invalid crack path for this piece";
            return false;
        }
        return true;
    }
    // NEW ACTION: added method to make sure that the annihilation action for
    //beyonder is valid
    checkValidAnnihilation(startLocation: Location): boolean {
        if (!this.checkCommonRequirements(startLocation)) return false;

        let piece = this.game
            .getGameBoard()
            .getSquare(startLocation)
            .getPiece();
        if (piece === null) return false;

        if (!piece.canPerformAction("annihilate")) {
            this.message = "This piece cannot annihilate or is on cooldown";
            return false;
        }
        //NEW RULE: prevents beyonder from annihilating if contained
        if (this.isBeyonderContained(piece, startLocation)) {
            this.message = "Beyonder is contained and cannot annihilate";
            return false;
        }
        return true;
    }
}
