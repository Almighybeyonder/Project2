import { GameBoard } from "./GameBoard";
import { Team } from "./Team";
//import { Piece } from "./Piece";

export abstract class Game {
    protected GameBoard: GameBoard;
    protected teamA: Team;
    protected teamB: Team;
    protected turn: string;

    constructor(GameBoard: GameBoard, teamA: Team, teamB: Team, turn: string) {
        this.GameBoard = GameBoard;
        this.teamA = teamA;
        this.teamB = teamB;
        this.turn = turn;
        this.initializeGameBoard();
    }

    private initializeGameBoard() {
        let teamArrayA = this.teamA.getTeamPieces();
        let teamArrayB = this.teamB.getTeamPieces();
        let length1 = teamArrayA.length;
        let length2 = teamArrayB.length;
        for (let i = 0; i < length1; i++) {
            let emptySquare = this.GameBoard.findRandomEmptySquare();
            emptySquare.setPiece(teamArrayA[i]);
        }
        for (let i = 0; i < length2; i++) {
            let emptySquare = this.GameBoard.findRandomEmptySquare();
            emptySquare.setPiece(teamArrayB[i]);
        }
    }

    getGameBoard() {
        return this.GameBoard;
    }
    /*
    getCurrentTeam() {
        let teamArrayA = this.teamA.getTeamPieces();
        let teamArrayB = this.teamB.getTeamPieces();
        let length1 = teamArrayA.length;
        let length2 = teamArrayB.length;
        let howLong = length1 + length2;
        for (let i = 0; i < howLong; i++) {
            if (i % 2 === 1) {
                return this.teamA;
            } else {
                return this.teamB;
            }
        }
    }
    */

    getCurrentTeam() {
        if (this.turn === this.teamA.getTeamColor()) {
            return this.teamA;
        } else {
            return this.teamB;
        }
    }
    getOpponentTeam() {
        if (this.turn === this.teamA.getTeamColor()) {
            return this.teamB;
        } else {
            return this.teamA;
        }
    }
    /*
    getOpponentTeam() {
        let teamArrayA = this.teamA.getTeamPieces();
        let teamArrayB = this.teamB.getTeamPieces();
        let length1 = teamArrayA.length;
        let length2 = teamArrayB.length;
        let howLong = length1 + length2;
        for (let i = 0; i < howLong; i++) {
            if (i % 2 === 0) {
                return this.teamB;
            } else {
                return this.teamA;
            }
        }
        return this.teamB;
    }
    */
    isTurn(team: Team) {
        if (team.getTeamColor() === this.turn) {
            return true;
        } else {
            return false;
        }
    }
    changeTurn() {
        if (this.turn === this.teamA.getTeamColor()) {
            this.turn = this.teamB.getTeamColor();
        } else {
            this.turn = this.teamA.getTeamColor();
        }
    }
    abstract isGameEnded(): boolean;

    abstract getWinner(): string;

    toString(): string {
        let retString: string = "";
        retString = retString.concat("Game Board:\n");
        retString = retString.concat("--------------");
        retString = retString.concat("\n" + this.getGameBoard().toString());
        retString = retString.concat(
            "\n" + this.getCurrentTeam().toString() + "\n",
        );
        retString = retString.concat(
            "\n" + this.getOpponentTeam().toString() + "\n",
        );
        retString = retString.concat(
            "\nIt is Team " +
                this.getCurrentTeam().getTeamColor() +
                "'s turn\n",
        );
        return retString.toString();
    }
}

/*Problem 6: [10 points]
Create a new abstract class named Game. 
This class should have the following members:
- a member field for the GameBoard
- a member field for team A
- a member field for team B
- a member field (turn) that will hold the color of the team who’s turn it is
       this field will be changed after each player takes a turn
- a private method name initializeGameBoard that has no two parameters 
   and doesn't return a value. This method should
   set up both Team’s pieces randomly on the board
   Hint: use your findRandomEmptySquare method in your GameBoard class
   You should write your algorithm for this method before coding it!!

- constructor with the 4 parameters listed above -
    it should set these fields and call initializeGameBoard
    to set up the GameBoard with pieces on it

- acessor methods:
    - getGameBoard
    - getCurrentTeam - returns the Team (not just the color) 
             of the team whose turn it is 
    - getOpponentTeam - returns the Team (not just the color) 
          of the team whose turn it isn’t 
    - isTurn that has one Team parameter and returns a 
          boolean representing whether it is the Team’s turn    
- mutator method 
    – changeTurn – that sets the member field turn to switch to the other Team’s color
- abstract method
    - isGameEnded with no parameters and returns a boolean
- abstract method
    - getWinner with no parameters and returns a string

- toString mehod is already defined for you here:

 toString(): string {
        let retString: string = "";
        retString = retString.concat("Game Board:\n");
        retString = retString.concat("--------------");
        retString = retString.concat("\n" + this.getGameBoard().toString());
        retString = retString.concat(
            "\n" + this.getCurrentTeam().toString() + "\n",
        );
        retString = retString.concat(
            "\n" + this.getOpponentTeam().toString() + "\n",
        );
        retString = retString.concat(
            "\nIt is Team " +
                this.getCurrentTeam().getTeamColor() +
                "'s turn\n",
        );
        return retString.toString();
    }
*/
