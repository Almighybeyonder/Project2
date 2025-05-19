/* Add your GameBoard code from Part A
 */
//ADDED TEAM and Piece
import { Piece } from "./Piece";
import { Team } from "./Team";
import { Location } from "./Location";
import { BoardSquare } from "./BoardSquare";
export class GameBoard {
    numberOfRows: number;
    numberOfColumns: number;
    actualSizeOfBoard: BoardSquare[][];
    constructor(nOR: number, nOC: number) {
        this.numberOfRows = nOR;
        this.numberOfColumns = nOC;
        this.actualSizeOfBoard = [];
        this.setUpEmptyBoard();
    }
    getNumRows() {
        return this.numberOfRows;
    }
    getNumColumns() {
        return this.numberOfColumns;
    }
    getAllSquares() {
        return this.actualSizeOfBoard;
    }
    getSquare(location: Location): BoardSquare {
        return this.actualSizeOfBoard[location.getRow()][location.getCol()];
    }
    inBounds(row: number, column: number): boolean {
        if (
            this.numberOfRows > row &&
            this.numberOfColumns > column &&
            row >= 0 &&
            column >= 0
        ) {
            return true;
        } else {
            return false;
        }
    }
    private setUpEmptyBoard() {
        for (let row = 0; row < this.numberOfRows; row++) {
            let rowArray = [];
            for (let col = 0; col < this.numberOfColumns; col++) {
                let color = "black";
                if (
                    (row % 2 === 0 && col % 2 !== 0) ||
                    (row % 2 !== 0 && col % 2 === 0)
                ) {
                    color = "white";
                }
                rowArray.push(new BoardSquare(color));
            }
            this.actualSizeOfBoard.push(rowArray);
        }
    }
    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    isBoardFull(): boolean {
        for (let row = 0; row < this.actualSizeOfBoard.length; row++) {
            for (let col = 0; col < this.actualSizeOfBoard[row].length; col++) {
                if (this.actualSizeOfBoard[row][col].isEmpty()) {
                    return false;
                }
            }
        }
        return true;
    }
    /*
    findRandomEmptySquare() {
        let row: number;
        let col: number;
        while (true) {
            row = GameBoard.getRandomInt(0, this.numberOfRows - 1);
            col = GameBoard.getRandomInt(0, this.numberOfColumns - 1);
            if (this.actualSizeOfBoard[row][col].isEmpty()) {
                return this.actualSizeOfBoard[row][col];
            }
        }
    }
*/
    findRandomEmptySquare(): BoardSquare {
        let row: number;
        let col: number;
        let square: BoardSquare | null = null;
        while (square === null) {
            row = GameBoard.getRandomInt(0, this.numberOfRows - 1);
            col = GameBoard.getRandomInt(0, this.numberOfColumns - 1);
            if (this.actualSizeOfBoard[row][col].isEmpty()) {
                square = this.actualSizeOfBoard[row][col];
            }
        }
        return square;
    }

    toString(): string {
        let boardString: string = "";
        boardString = boardString.concat("Col :" + "       ");

        for (let col = 0; col < this.numberOfColumns; col++) {
            boardString = boardString.concat(col + "        ");
        }
        boardString = boardString.concat("\n");
        for (let row = 0; row < this.numberOfRows; row++) {
            boardString = boardString.concat("Row : " + row + "   ");
            for (let col = 0; col < this.numberOfColumns; col++) {
                boardString = boardString.concat(
                    this.actualSizeOfBoard[row][col].toString() + "  ",
                );
            }
            boardString = boardString.concat("\n");
        }
        return boardString;
    }
    //NEW PIECE
    isSurrounded(piece: Piece, enemies: Team): boolean {
        let foundRow = -1;
        let foundCol = -1;

        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfColumns; col++) {
                if (this.actualSizeOfBoard[row][col].getPiece() === piece) {
                    foundRow = row;
                    foundCol = col;
                    break;
                }
            }
            if (foundRow !== -1) break;
        }

        if (
            foundRow === -1 ||
            foundRow === 0 ||
            foundRow === this.numberOfRows - 1 ||
            foundCol === 0 ||
            foundCol === this.numberOfColumns - 1
        ) {
            return false;
        }

        const adjacentPositions = [
            [foundRow - 1, foundCol], // up
            [foundRow + 1, foundCol], // down
            [foundRow, foundCol - 1], // left
            [foundRow, foundCol + 1], // right
        ];

        let enemyCount = 0;
        let enemyTeamPieces = enemies.getTeamPieces();

        for (let [row, col] of adjacentPositions) {
            let adjacentPiece = this.actualSizeOfBoard[row][col].getPiece();
            if (
                adjacentPiece !== null &&
                enemyTeamPieces.includes(adjacentPiece)
            ) {
                enemyCount++;
            }
        }

        return enemyCount >= 3;
    }
}
