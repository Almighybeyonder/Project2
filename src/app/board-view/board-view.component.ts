/*
import { WebzComponent, BindStyleToNumberAppendPx } from "@boots-edu/webz";
import html from "./board-view.component.html";
import css from "./board-view.component.css";
import { GameBoard } from "../../game/elements/GameBoard";
import { SquareViewComponent } from "../square-view/square-view.component";
import { Location } from "../../game/elements/Location";

export class BoardViewComponent extends WebzComponent {
    @BindStyleToNumberAppendPx("squares", "width")
    private gridWidth: number = 10;

    private squareViews: SquareViewComponent[][] = [];

    constructor(private boardData: GameBoard) {
        super(html, css);
        this.initializeBoard();
    }

    private initializeBoard(): void {
        const rows = this.boardData.getNumRows();
        const cols = this.boardData.getNumColumns();
        console.log("Board Dimensions - Rows:", rows, "Cols:", cols);
        let squareCount = 0;
        for (let row = 0; row < rows; row++) {
            this.squareViews.push([]);
            for (let col = 0; col < cols; col++) {
                const location = new Location(row, col);
                const squareData = this.boardData.getSquare(location);
                const squareView = new SquareViewComponent(
                    squareData,
                    location,
                );
                this.squareViews[row][col] = squareView;
                this.addComponent(squareView, "squares");
                squareCount++;
            }
        }
        console.log("Total Squares Created:", squareCount);
        const squareSize = this.squareViews[0][0].getSquareSize();
        const borderWidthPerSquare = 2; // 1px effective border per side
        this.gridWidth = cols * (squareSize + borderWidthPerSquare); // 5 * (50 + 2) = 260px
    }
}
*/
/*
import {
    WebzComponent,
    BindStyleToNumberAppendPx,
    Notifier,
} from "@boots-edu/webz";
import html from "./board-view.component.html";
import css from "./board-view.component.css";
import { GameBoard } from "../../game/elements/GameBoard";
import { SquareViewComponent } from "../square-view/square-view.component";
import { Location } from "../../game/elements/Location";

export class BoardViewComponent extends WebzComponent {
    @BindStyleToNumberAppendPx("squares", "width")
    private gridWidth: number = 10;

    private squareViews: SquareViewComponent[][] = [];
    public squareClicked: Notifier<Location> = new Notifier<Location>();

    constructor(private boardData: GameBoard) {
        super(html, css);
        this.initializeBoard();
    }

    private initializeBoard(): void {
        const rows = this.boardData.getNumRows();
        const cols = this.boardData.getNumColumns();
        console.log("Board Dimensions - Rows:", rows, "Cols:", cols);
        let squareCount = 0;
        for (let row = 0; row < rows; row++) {
            this.squareViews.push([]);
            for (let col = 0; col < cols; col++) {
                const location = new Location(row, col);
                const squareData = this.boardData.getSquare(location);
                const squareView = new SquareViewComponent(
                    squareData,
                    location,
                );
                this.squareViews[row][col] = squareView;
                this.addComponent(squareView, "squares");
                squareView.clickedSquare.subscribe(() => {
                    this.squareClicked.notify(location);
                });
                squareCount++;
            }
        }
        console.log("Total Squares Created:", squareCount);
        const squareSize = this.squareViews[0][0].getSquareSize();
        const borderWidthPerSquare = 2;
        this.gridWidth = cols * (squareSize + borderWidthPerSquare);
    }

    public redraw(): void {
        const rows = this.boardData.getNumRows();
        const cols = this.boardData.getNumColumns();
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const squareView = this.squareViews[row][col];
                const squareData = this.boardData.getSquare(
                    new Location(row, col),
                );
                squareView.setImage(squareData);
            }
        }
    }
}*/
import {
    WebzComponent,
    BindStyleToNumberAppendPx,
    Notifier,
} from "@boots-edu/webz";
import html from "./board-view.component.html";
import css from "./board-view.component.css";
import { GameBoard } from "../../game/elements/GameBoard";
import { SquareViewComponent } from "../square-view/square-view.component";
import { Location } from "../../game/elements/Location";

export class BoardViewComponent extends WebzComponent {
    @BindStyleToNumberAppendPx("squares", "width")
    private gridWidth: number = 10;

    private squareViews: SquareViewComponent[][] = [];
    public squareClicked: Notifier<Location> = new Notifier<Location>();

    constructor(private boardData: GameBoard) {
        super(html, css);
        this.initializeBoard();
    }

    private initializeBoard(): void {
        const rows = this.boardData.getNumRows();
        const cols = this.boardData.getNumColumns();
        for (let row = 0; row < rows; row++) {
            this.squareViews.push([]);
            for (let col = 0; col < cols; col++) {
                const location = new Location(row, col);
                const squareData = this.boardData.getSquare(location);
                const squareView = new SquareViewComponent(
                    squareData,
                    location,
                );
                this.squareViews[row][col] = squareView;
                this.addComponent(squareView, "squares");

                squareView.clickedSquare.subscribe(() => {
                    this.squareClicked.notify(location);
                });
            }
        }
        const squareSize = this.squareViews[0][0].getSquareSize();
        const borderWidthPerSquare = 2;
        this.gridWidth = cols * (squareSize + borderWidthPerSquare);
    }

    public redraw(): void {
        const rows = this.boardData.getNumRows();
        const cols = this.boardData.getNumColumns();
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const squareView = this.squareViews[row][col];
                const squareData = this.boardData.getSquare(
                    new Location(row, col),
                );
                squareView.setImage(squareData);
            }
        }
    }
}
