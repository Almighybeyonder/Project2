/*import {
    BindValue,
    BindValueToNumber,
    Change,
    Click,
    Input,
    ValueEvent,
    WebzComponent,
} from "@boots-edu/webz";
import html from "./text-view.component.html";
import css from "./text-view.component.css";
import { Controller } from "../../Controller";
import { Location } from "../../game/elements/Location";

export class TextViewComponent extends WebzComponent {
    @BindValueToNumber("start-row")
    private startRow: number = 0;

    @BindValueToNumber("start-col")
    private startCol: number = 0;

    @BindValueToNumber("end-row")
    private endRow: number = 0;

    @BindValueToNumber("end-col")
    private endCol: number = 0;

    @BindValue("operation-select")
    operationSelect: string = "move";

    @BindValue("message")
    private message: string = "Start Game";

    @BindValue("game-board")
    private gameString: string = "Board Goes Here";

    constructor(private controller: Controller) {
        super(html, css);
        // set the string representation of the game board
        this.displayGame();
        this.message = "Ready to Play!";
    }

    // Events - when user enters values in the textboxes
    @Input("start-row")
    onStartRowChange(evt: ValueEvent) {
        this.startRow = +evt.value;
    }

    @Input("start-col")
    onStartColChange(evt: ValueEvent) {
        this.startCol = +evt.value;
    }

    @Input("end-row")
    onEndRowChange(evt: ValueEvent) {
        this.endRow = +evt.value;
    }

    @Input("end-col")
    onEndColChange(evt: ValueEvent) {
        this.endCol = +evt.value;
    }
    // Event - when user makes selection from selection box
    @Change("operation-select")
    onOperationSelectChange(event: ValueEvent) {
        this.operationSelect = event.value;
    }

    // Event - when user clicks Go button
    @Click("go")
    onGo() {
        this.controller.carryOutAction(
            new Location(this.startRow, this.startCol),
            new Location(this.endRow, this.endCol),
            this.operationSelect,
        );

        // Update the 'View' with the current status
        // of the game
        // set the string representation of the game board
        this.displayGame();
        // Display whether Game is Over
        if (this.controller.getGame().isGameEnded()) {
            this.message = "Game Over" + this.controller.getGame().getWinner();
        } else {
            this.message = this.controller.getGame().getRules().getMessage();
        }
    }

    displayGame(): void {
        this.gameString = this.controller.getGame().toString();
    }
}*/
import {
    BindValue,
    BindValueToNumber,
    Change,
    Click,
    Input,
    ValueEvent,
    WebzComponent,
} from "@boots-edu/webz";
import html from "./text-view.component.html";
import css from "./text-view.component.css";
import { Controller } from "../../Controller";
import { Location } from "../../game/elements/Location";

export class TextViewComponent extends WebzComponent {
    @BindValueToNumber("start-row")
    private startRow: number = 0;

    @BindValueToNumber("start-col")
    private startCol: number = 0;

    @BindValueToNumber("end-row")
    private endRow: number = 0;

    @BindValueToNumber("end-col")
    private endCol: number = 0;

    @BindValue("operation-select")
    operationSelect: string = "move";

    @BindValue("message")
    private message: string = "Start Game";

    @BindValue("game-board")
    private gameString: string = "Board Goes Here";

    constructor(private controller: Controller) {
        super(html, css);
        //tring representation of the game board
        this.displayGame();
        this.message = "Ready to Play!";
    }

    // Events - enters values in the textboxes
    @Input("start-row")
    onStartRowChange(evt: ValueEvent) {
        this.startRow = +evt.value;
    }

    @Input("start-col")
    onStartColChange(evt: ValueEvent) {
        this.startCol = +evt.value;
    }

    @Input("end-row")
    onEndRowChange(evt: ValueEvent) {
        this.endRow = +evt.value;
    }

    @Input("end-col")
    onEndColChange(evt: ValueEvent) {
        this.endCol = +evt.value;
    }
    // Event - makes selection from selection box
    @Change("operation-select")
    onOperationSelectChange(event: ValueEvent) {
        this.operationSelect = event.value;
    }

    // Event - user clicks Go button
    @Click("go")
    onGo() {
        // NEW PIECE: Validate start location
        if (this.startRow < 0 || this.startCol < 0) {
            this.message = "Invalid start location.";
            return;
        }
        let startLocation = new Location(this.startRow, this.startCol);
        let game = this.controller.getGame();
        let board = game.getGameBoard();
        let square = board.getSquare(startLocation);
        let piece = square.getPiece();
        let currentTeam = game.getCurrentTeam();
        if (
            piece === null ||
            piece.getTeamColor() !== currentTeam.getTeamColor()
        ) {
            this.message = "No valid piece at start location.";
            return;
        }

        // NEW ACTION: Use start location for annihilation
        let endLocation = startLocation;
        if (this.operationSelect !== "annihilate") {
            endLocation = new Location(this.endRow, this.endCol);
        }

        // NEW PIECE: Check action validity
        let rules = game.getRules();
        let isValid = false;
        if (this.operationSelect === "move") {
            isValid = rules.checkValidMove(startLocation, endLocation);
        } else if (this.operationSelect === "attack") {
            isValid = rules.checkValidAttack(startLocation, endLocation);
        } else if (this.operationSelect === "recruit") {
            isValid = rules.checkValidRecruit(startLocation, endLocation);
        } else if (this.operationSelect === "spawn") {
            isValid = rules.checkValidSpawn(startLocation, endLocation);
        } else if (this.operationSelect === "crack") {
            isValid = rules.checkValidCrack(startLocation, endLocation);
        } else if (this.operationSelect === "annihilate") {
            // NEW ACTION: Validate annihilation
            isValid = rules.checkValidAnnihilation(startLocation);
        }

        // NEW RULE: Handle valid and invalid actions
        if (isValid) {
            // Execute action
            this.controller.carryOutAction(
                startLocation,
                endLocation,
                this.operationSelect,
            );
            // Update the 'View' with the current status
            // of the game
            this.displayGame();
            // Display whether Game is Over
            if (this.controller.getGame().isGameEnded()) {
                // NEW OBJECTIVE: Show winner
                this.message =
                    "Game Over! Winner: " +
                    this.controller.getGame().getWinner();
            } else {
                let successMessage = rules.getMessage();
                if (successMessage === "") {
                    successMessage =
                        "Action " +
                        this.operationSelect +
                        " successful! Turn: " +
                        this.controller.getTurn();
                }
                this.message = successMessage;
            }
        } else {
            // Show containment or other errors
            let errorMessage = rules.getMessage();
            if (errorMessage === "") {
                errorMessage = "Invalid action.";
            }
            this.message = errorMessage;
        }
    }

    displayGame(): void {
        this.gameString = this.controller.getGame().toString();
    }
}
