/*import {
    WebzComponent,
    BindStyle,
    BindStyleToNumberAppendPx,
    BindVisibleToBoolean,BindAttribute
} from "@boots-edu/webz";
import html from "./square-view.component.html";
import css from "./square-view.component.css";
import { BoardSquare } from "../../game/elements/BoardSquare";
import { Location } from "../../game/elements/Location";

export class SquareViewComponent extends WebzComponent {
    @BindStyle("square", "backgroundColor")
    private squareColor: string = "black";

    @BindStyleToNumberAppendPx("square", "width")
    @BindStyleToNumberAppendPx("square", "height")
    private squareSize: number = 50;

    // Bind the image source
    @BindAttribute("image", "src", (imgName: string): string => {
        return "assets/" + imgName;
    })
    public imgName: string = "bluehen.png"; // Default image for testing

    // Bind the background color of the image
    @BindStyle("image", "backgroundColor")
    private imageBackgroundColor: string = "green"; // Initial team color

    // Bind the width and height of the image (same variable for square shape)
    @BindStyleToNumberAppendPx("image", "width")
    @BindStyleToNumberAppendPx("image", "height")
    private imageSize: number = 30; // 30x30px image

    // Bind the padding of the image
    @BindStyleToNumberAppendPx("image", "padding")
    private imagePadding: number = 10; // 10px padding

    // Ensure hasImage is true for testing (modify existing declaration if it exists)
    @BindVisibleToBoolean("image")
    private hasImage: boolean = true; // Set to true for testing

    private squareData: BoardSquare;
    private location: Location;

    constructor(squareData: BoardSquare, location: Location) {
        super(html, css);
        this.squareData = squareData;
        this.location = location;
        this.squareColor = this.squareData.getSquareColor(); // Set color based on BoardSquare
    }

    getSquareSize(): number {
        return this.squareSize;
    }
}
*/
/*
import {
    WebzComponent,
    BindStyle,
    BindStyleToNumberAppendPx,
    BindVisibleToBoolean,
    BindAttribute,
    Click,
    Notifier,
} from "@boots-edu/webz";
import html from "./square-view.component.html";
import css from "./square-view.component.css";
import { BoardSquare } from "../../game/elements/BoardSquare";
import { Location } from "../../game/elements/Location";

export class SquareViewComponent extends WebzComponent {
    @BindStyle("square", "backgroundColor")
    private squareColor: string = "black";

    @BindStyleToNumberAppendPx("square", "width")
    @BindStyleToNumberAppendPx("square", "height")
    private squareSize: number = 50;

    @BindAttribute("image", "src", (imgName: string): string => {
        return "assets/" + imgName;
    })
    public imgName: string = "";

    @BindStyle("image", "backgroundColor")
    private imageBackgroundColor: string = "transparent";

    @BindStyleToNumberAppendPx("image", "width")
    @BindStyleToNumberAppendPx("image", "height")
    private imageSize: number = 30;

    @BindStyleToNumberAppendPx("image", "padding")
    private imagePadding: number = 10;

    @BindVisibleToBoolean("image")
    private hasImage: boolean = false;

    private squareData: BoardSquare;
    public location: Location;
    public clickedSquare: Notifier<void> = new Notifier<void>();

    constructor(squareData: BoardSquare, location: Location) {
        super(html, css);
        this.squareData = squareData;
        this.location = location;
        this.setImage(this.squareData);
    }

    @Click("square")
    onclick(): void {
        this.clickedSquare.notify();
    }

    getSquareSize(): number {
        return this.squareSize;
    }

    public setImage(square: BoardSquare): void {
        this.squareData = square;
        this.squareColor = square.getSquareColor();
        if (square.isCracked()) {
            this.imgName = "cracked.png";
            this.hasImage = true;
            this.imageBackgroundColor = square.getSquareColor();
        } else if (square.getPiece() !== null) {
            const piece = square.getPiece()!;
            const pieceType = (piece.getSymbol() as string).toLowerCase();
            this.imgName = `${pieceType}.png`;
            this.hasImage = true;
            this.imageBackgroundColor = piece.getTeamColor() as string;
        } else {
            this.imgName = "";
            this.hasImage = false;
            this.imageBackgroundColor = "transparent";
        }
    }
}
*/
/*
import {
    WebzComponent,
    BindStyle,
    BindStyleToNumberAppendPx,
    BindVisibleToBoolean,
    BindAttribute,
    Click,
    Notifier,
} from "@boots-edu/webz";
import html from "./square-view.component.html";
import css from "./square-view.component.css";
import { BoardSquare } from "../../game/elements/BoardSquare";
import { Location } from "../../game/elements/Location";

export class SquareViewComponent extends WebzComponent {
    @BindStyle("square", "backgroundColor")
    private squareColor: string = "black";

    @BindStyleToNumberAppendPx("square", "width")
    @BindStyleToNumberAppendPx("square", "height")
    private squareSize: number = 50;

    @BindAttribute("image", "src", (imgName: string): string => {
        return "assets/" + imgName;
    })
    public imgName: string = "";

    @BindStyle("image", "backgroundColor")
    private imageBackgroundColor: string = "transparent";

    @BindStyleToNumberAppendPx("image", "width")
    @BindStyleToNumberAppendPx("image", "height")
    private imageSize: number = 50; // Adjusted to 50px to fill the square

    @BindStyleToNumberAppendPx("image", "padding")
    private imagePadding: number = 0; // Adjusted to 0px to remove extra space

    @BindVisibleToBoolean("image")
    private hasImage: boolean = false;

    private squareData: BoardSquare;
    public location: Location;
    public clickedSquare: Notifier<void> = new Notifier<void>();

    constructor(squareData: BoardSquare, location: Location) {
        super(html, css);
        this.squareData = squareData;
        this.location = location;
        this.setImage(this.squareData);
    }

    @Click("square")
    onclick(): void {
        this.clickedSquare.notify();
    }

    getSquareSize(): number {
        return this.squareSize;
    }

    public setImage(square: BoardSquare): void {
        this.squareData = square;
        this.squareColor = square.getSquareColor();
        if (square.isCracked()) {
            this.imgName = "cracked.png";
            this.hasImage = true;
            this.imageBackgroundColor = square.getSquareColor();
        } else if (square.getPiece() !== null) {
            const piece = square.getPiece()!;
            const pieceType = (piece.getSymbol() as string).toLowerCase();
            this.imgName = `${pieceType}.png`;
            this.hasImage = true;
            this.imageBackgroundColor = piece.getTeamColor() as string;
        } else {
            this.imgName = "";
            this.hasImage = false;
            this.imageBackgroundColor = "transparent";
        }
    }
}
*/
import {
    WebzComponent,
    BindStyle,
    BindStyleToNumberAppendPx,
    BindVisibleToBoolean,
    BindAttribute,
    Click,
    Notifier,
} from "@boots-edu/webz";
import html from "./square-view.component.html";
import css from "./square-view.component.css";
import { BoardSquare } from "../../game/elements/BoardSquare";
import { Location } from "../../game/elements/Location";

export class SquareViewComponent extends WebzComponent {
    @BindStyle("square", "backgroundColor")
    private squareColor: string = "black";

    @BindStyleToNumberAppendPx("square", "width")
    @BindStyleToNumberAppendPx("square", "height")
    private squareSize: number = 50;

    @BindAttribute("image", "src", (imgName: string): string => {
        return "assets/" + imgName;
    })
    public imgName: string = "";

    @BindStyle("image", "backgroundColor")
    private imageBackgroundColor: string = "transparent";

    @BindStyleToNumberAppendPx("image", "width")
    @BindStyleToNumberAppendPx("image", "height")
    private imageSize: number = 50;

    @BindStyleToNumberAppendPx("image", "padding")
    private imagePadding: number = 0;

    @BindVisibleToBoolean("image")
    private hasImage: boolean = false;

    private squareData: BoardSquare;
    public location: Location;
    public clickedSquare: Notifier<void> = new Notifier<void>();

    constructor(squareData: BoardSquare, location: Location) {
        super(html, css);
        this.squareData = squareData;
        this.location = location;
        this.setImage(this.squareData);
    }

    @Click("square")
    onclick(): void {
        this.clickedSquare.notify();
    }

    getSquareSize(): number {
        return this.squareSize;
    }
    /*
    public setImage(square: BoardSquare): void {
        this.squareData = square;
        this.squareColor = square.getSquareColor();
        if (square.isCracked()) {
            this.imgName = "cracked.png";
            this.hasImage = true;
            this.imageBackgroundColor = square.getSquareColor();
        } else if (square.getPiece() !== null) {
            const piece = square.getPiece()!;
            const pieceType = (piece.getSymbol() as string).toLowerCase();
            this.imgName = `${pieceType}.png`;
            this.hasImage = true;
            this.imageBackgroundColor = piece.getTeamColor() as string;
        } else {
            this.imgName = "";
            this.hasImage = false;
            this.imageBackgroundColor = "transparent";
        }
    }
*/
    // square-view.component.ts
    public setImage(square: BoardSquare): void {
        this.squareData = square;
        this.squareColor = square.getSquareColor();
        if (square.isCracked()) {
            this.imgName = "cracked1.png";
            this.hasImage = true;
            this.imageBackgroundColor = square.getSquareColor();
        } else if (square.getPiece() !== null) {
            const piece = square.getPiece()!;
            const symbol = piece.getSymbol().toLowerCase();
            switch (symbol) {
                case "b":
                    this.imgName = "beyonder1.png";
                    break;
                case "h":
                    this.imgName = "bluehen1.png";
                    break;
                case "m":
                    this.imgName = "minion1.png";
                    break;
                case "s":
                    this.imgName = "scrat1.png";
                    break;
                default:
                    this.imgName = "";
            }
            this.hasImage = true;
            this.imageBackgroundColor = piece.getTeamColor();
        } else {
            this.imgName = "";
            this.hasImage = false;
            this.imageBackgroundColor = "transparent";
        }
    }
}

/*
public setImage(square: BoardSquare): void {
    this.squareData = square;
    this.squareColor = square.getSquareColor();
    if (square.isCracked()) {
        this.imgName = "cracked1.png";
        this.hasImage = true;
        this.imageBackgroundColor = square.getSquareColor();
    } else if (square.getPiece() !== null) {
        const piece = square.getPiece()!;
        const symbol = piece.getSymbol().toLowerCase();
        // Map symbols to actual image filenames
        switch (symbol) {
            case "b":
                this.imgName = "beyonder1.png";
                break;
            case "h":
                this.imgName = "bluehen1.png";
                break;
            case "m":
                this.imgName = "minion1.png";
                break;
            case "s":
                this.imgName = "scrat1.png";
                break;
            default:
                this.imgName = "";
        }
        this.hasImage = true;
        this.imageBackgroundColor = piece.getTeamColor() as string;
    } else {
        this.imgName = "";
        this.hasImage = false;
        this.imageBackgroundColor = "transparent";
    }
}
    */
