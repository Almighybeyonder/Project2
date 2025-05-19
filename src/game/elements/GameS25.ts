/*Problem 7: [8 points]
Create a class named GameS25 that extends Game. 
This will represent the game that we build for our Homework 10 
this semester.
This class should have the following members:
- a member field for the Rules of this game
- constructor with the same number of parameters as its
   superclass. It should:
   - call the super class constructor
   - set the rules field to a new Rules object
           =  new Rules(this)
- acessor methods:
    - getRules    
- implement isGameEnded method
    - for our game - the game has ended when either one or both teams
        has no pieces left
- implement getWinner method
    - for our game the winner is the one that still has pieces - if both
        teams have no pieces - return "Tie"

*/
import { Game } from "./Game";
import { Team } from "./Team";
import { GameBoard } from "./GameBoard";
import { Rules } from "./Rules";

export class GameS25 extends Game {
    rules: Rules;

    constructor(gameBoard: GameBoard, teamA: Team, teamB: Team, turn: string) {
        super(gameBoard, teamA, teamB, turn);
        this.rules = new Rules(this);
    }

    getRules() {
        return this.rules;
    }
    // NEW OBJECTIVE: Game ends when the original beyonder is
    //eliminated
    isGameEnded(): boolean {
        let teamAPieces = this.teamA.getTeamPieces();
        let teamBPieces = this.teamB.getTeamPieces();
        let teamAHasBeyonder = false;
        let teamBHasBeyonder = false;

        for (let piece of teamAPieces) {
            if (piece.getSymbol() === "B" && piece.isOriginal()) {
                teamAHasBeyonder = true;
                break;
            }
        }

        for (let piece of teamBPieces) {
            if (piece.getSymbol() === "B" && piece.isOriginal()) {
                teamBHasBeyonder = true;
                break;
            }
        }

        return !teamAHasBeyonder || !teamBHasBeyonder;
    }
    //NEW OBJECTIVE: WInner is the team that still has their
    //original beyonder
    getWinner(): string {
        let teamAPieces = this.teamA.getTeamPieces();
        let teamBPieces = this.teamB.getTeamPieces();
        let teamAHasBeyonder = false;
        let teamBHasBeyonder = false;

        for (let piece of teamAPieces) {
            if (piece.getSymbol() === "B" && piece.isOriginal()) {
                teamAHasBeyonder = true;
                break;
            }
        }

        for (let piece of teamBPieces) {
            if (piece.getSymbol() === "B" && piece.isOriginal()) {
                teamBHasBeyonder = true;
                break;
            }
        }

        if (!teamAHasBeyonder && !teamBHasBeyonder) {
            return "Tie";
        }

        if (!teamAHasBeyonder) {
            return this.teamB.getTeamColor();
        }

        if (!teamBHasBeyonder) {
            return this.teamA.getTeamColor();
        }

        throw new Error("Game isn't over");
    }
    //NEW RULE: update the beyonder cooldown after each turn
    changeTurn() {
        super.changeTurn();
        this.rules.updatePieceStates();
    }
}
