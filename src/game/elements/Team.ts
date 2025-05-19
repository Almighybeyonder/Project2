/*Problem 5: [10 points]
We are going to represent one player’s set of game pieces
a class name Team. It will contain an array
of Piece objects and a team color for the pieces.

Create a new class named Team with the following members:
- member field of type string for the color of the team
- member field to represent all Pieces that the belongs to the team 
    this should be of an array of Pieces (since they will have more than
    one type of Piece)
- constructor with two parameters: 
    (parameters should be in the order listed above) that sets the two member fields
- accessor methods 
    – getTeamColor and getTeamPieces
- mutator method 
    – removePieceFromTeam with a parameter Piece and no return value
    this method removes the Piece from the array
- mutator method 
    – addPieceToTeam with one parameter Piece and no return value
    this method should add the Piece to the Team and set the Piece’s 
    color to the team color.
- toString method with no parameters and returns a string
    with the team color and all of the team’s Pieces’ toString values
    For a team with color of ‘Red’ and four pieces, 
    the toString should look similar to this:
    Team Red Pieces : 
    Red M   Red B   Red S
*/

import { Piece } from "./Piece";
export class Team {
    color: string;
    arrayOfPieces: Piece[];
    constructor(color: string, ArrayOfPieces: Piece[]) {
        this.color = color;
        this.arrayOfPieces = ArrayOfPieces;
    }
    getTeamColor() {
        return this.color;
    }
    getTeamPieces() {
        return this.arrayOfPieces;
    }
    removePieceFromTeam(removingPiece: Piece) {
        for (let i = 0; i < this.arrayOfPieces.length; i++) {
            if (this.arrayOfPieces[i] === removingPiece) {
                this.arrayOfPieces.splice(i, 1);
            }
        }
    }
    addPieceToTeam(addingPiece: Piece) {
        addingPiece.setTeamColor(this.color);
        this.arrayOfPieces.push(addingPiece);
    }
    ////////////////////////////// is this right?
    toString() {
        let emptyStringArray: string[] = [
            "Team" + " " + this.color + " " + "Pieces" + " " + ": " + "\n",
        ];
        for (let i = 0; i < this.arrayOfPieces.length; i++) {
            let goingInsidePiece = this.arrayOfPieces[i];
            emptyStringArray.push(
                this.color +
                    " " +
                    goingInsidePiece.getSymbol() +
                    " " +
                    " " +
                    " ",
            );
        }
        return emptyStringArray;
    }
}
