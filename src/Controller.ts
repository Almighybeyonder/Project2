import { GameBoard } from "./game/elements/GameBoard";
import { GameS25 } from "./game/elements/GameS25";
import { PieceBlueHen } from "./game/elements/PieceBlueHen";
import { PieceMinion } from "./game/elements/PieceMinion";
import { PieceScrat } from "./game/elements/PieceScrat";
import { Beyonder } from "./game/elements/Beyonder";
import { Team } from "./game/elements/Team";
import { ActionAttack } from "./game/actions/ActionAttack";
import { ActionMove } from "./game/actions/ActionMove";
import { ActionSpawn } from "./game/actions/ActionSpawn";
import { ActionCrack } from "./game/actions/ActionCrack";
import { ActionRecruit } from "./game/actions/ActionRecruit";
import { ActionAnnihilate } from "./game/actions/ActionAnnihilate";
import { Location } from "./game/elements/Location";

export class Controller {
    private game: GameS25;

    constructor(numberOfRows: number, numberOfColumns: number) {
        this.game = this.createGame(numberOfRows, numberOfColumns);
    }

    private createGame(numberOfRows: number, numberOfColumns: number) {
        let gameboard = new GameBoard(numberOfRows, numberOfColumns);
        //NEW PIECE: added piece beyonder to team A just like the rest of the pieces
        let greenhen = new PieceBlueHen("H", "green", false, true, 0);
        let greenminion = new PieceMinion("M", "green", false, true, 0);
        let greenscrat = new PieceScrat("S", "green", false, true, 0, 0);
        let greenBeyonder = new Beyonder("B", "green", false, true);
        let teamA = new Team("green", [
            greenhen,
            greenminion,
            greenscrat,
            greenBeyonder,
        ]);
        //NEW PIECE: added piece beyonder to team A just like the rest of the pieces
        let orangehen = new PieceBlueHen("H", "orange", false, true, 0);
        let orangeminion = new PieceMinion("M", "orange", false, true, 0);
        let orangescrat = new PieceScrat("S", "orange", false, true, 0, 0);
        let orangeBeyonder = new Beyonder("B", "orange", false, true);
        let teamB = new Team("orange", [
            orangehen,
            orangeminion,
            orangescrat,
            orangeBeyonder,
        ]);

        return new GameS25(gameboard, teamA, teamB, "green");
    }

    public getGame(): GameS25 {
        return this.game;
    }

    getTurn() {
        return this.game.getCurrentTeam().getTeamColor();
    }

    getStatus() {
        return this.game.getRules().getMessage();
    }

    carryOutAction(
        startSquare: Location,
        endSquare: Location,
        actionType: string,
    ): boolean {
        if (actionType === "move") {
            let move = new ActionMove(this.game, startSquare, endSquare);
            if (move.validAction()) {
                move.performAction();
                return true;
            }
        } else if (actionType === "attack") {
            let attack = new ActionAttack(this.game, startSquare, endSquare);
            if (attack.validAction()) {
                attack.performAction();
                return true;
            }
        } else if (actionType === "recruit") {
            let recruit = new ActionRecruit(this.game, startSquare, endSquare);
            if (recruit.validAction()) {
                recruit.performAction();
                return true;
            }
        } else if (actionType === "spawn") {
            let spawn = new ActionSpawn(this.game, startSquare, endSquare);
            if (spawn.validAction()) {
                spawn.performAction();
                return true;
            }
        } else if (actionType === "crack") {
            let crack = new ActionCrack(this.game, startSquare, endSquare);
            if (crack.validAction()) {
                crack.performAction();
                return true;
            }
            // NEW ACTION: THIS WAS ADDED AS FOR THE ANNIHILATE ACTION PERFORMED
            //by BEYONDER
        } else if (actionType === "annihilate") {
            let annihilate = new ActionAnnihilate(
                this.game,
                startSquare,
                startSquare,
            );
            if (annihilate.validAction()) {
                annihilate.performAction();
                return true;
            }
        } else {
            throw new Error("wtf happened");
        }
        return false;
    }
}

/*Problem 15: [15 points] - This class will be graded manually by the TAs
Create a new class named Controller. 
This class will interact with the game elements and actions,
and the view used to capture user input.
It should have the following members:
- member field to represnt the game - GameS25 object
- constructor with two parameters:
    - number of rows for the gameboard
    - number of columns for the gameboard
    - calls createGame and assigns it’s return value to the GameS25 property
- method createGame has two parameters: number of rows and number of columns
    and returns a GameS25 object
    this method should create a GameS25 with the following:
        - the GameBoard property should have the number of rows and columns passed in
        - the teamA object should have with 3 Piece objects: 
            a PieceBluehen, a PieceMinion, a PieceScrat
            the color of the team is your choice (don't choose black or white)
        - the teamB object should also have 3 Piece objects: 
            a PieceBluehen, a PieceMinion, a PieceScrat
             the color of the team is your choice (don't choose black or white or 
             the color you chose for teamA)
        - the turn should be set to the color of teamA
    -Note: you can create helper functions as you see fit
- accessor 
    - getGame
- method getTurn 
    has no parameters and returns a string
    indicating whose turn it is
- method getStatus
    has no parameters and returns a string
    with the current message in the Rules instance
    Note: Use the UML diagram to see how to access the Rules
    member message field
- method carryOutAction that three parameters in this order:
    - a start square location, an end square location, and a string for action type
    - this method should create the appropriate action based on action type:
        "move" -> ActionMove
        "attack" -> ActionAttack
        "recruit" -> ActionRecruit
        "spawn" -> ActionSpawn
        "crack" -> ActionCrack
    - the method should check if the action is valid and if so it should perform the action
        (use your methods created in the Action classes!)
    - this method should return whether or not this action was valid

Once you have finished this method, you should be able to use: 
    npm run start 
to play your game with a text based interface.
Play your game to check if it is behaving as described in class.
*/
