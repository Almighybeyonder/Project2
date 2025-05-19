/*
Add your BoardSquare class code from HW10 Part A
*/
//import { Piece } from "./Piece";

/*Problem 1: [10 points]
We are going to represent each square on our game board with 
a class named BoardSquare. In your final project, you may choose
to extend the BoardSquare class, so set your access modifiers
accordingly.


Create a class named BoardSquare with the following:
- member field of type Piece to represent the Piece that is located 
    in this square - this field can either hold a Piece or null
- member field of type string to represent color of the board square
- member field represent whether the square is 'cracked' or not
- constructor with one parameter - color
     - sets the color
     – the square should not have a Piece by default 
     - the square should not be cracked by default
- accessors 
    - getPiece, getSquareColor, isCracked
- accessor
    - isEmpty - returns true if there is no piece on this board square
- mutator 
    – setPiece - with a Piece parameter 
        -sets the Piece member field AND updates the empty property        
- mutator
    - crackThisSquare 
        - sets the field reprsenting a crack to true
- mutator 
    – removePiece which has no parameters and 
       returns the Piece that is on this square
    -  update the Piece to null and update the empty member field
       (Note: Think about how you can return the Piece while also 
       setting the piece property to null)
- toString() method with no parameters and returns a string
    - if the Square is cracked should return "--XXX--"
    - if no Piece on this square should return:  "-------" (7 dashes)
    - if there is a Piece on this square should return: "-"  
      followed by the Piece’s toString() followed by "-" 
*/
import { Piece } from "./Piece";
export class BoardSquare {
    piece: Piece | null = null;
    color: string;
    _isCracked: boolean = false;
    // how do i know if private/protected/public?
    constructor(c: string) {
        this.color = c;
    }
    getPiece() {
        return this.piece;
    }
    getSquareColor() {
        return this.color;
    }
    isCracked() {
        return this._isCracked;
    }
    isEmpty(): boolean {
        return this.piece === null;
    }
    setPiece(piecePlacedHere: Piece) {
        this.piece = piecePlacedHere;
    }
    crackThisSquare() {
        this._isCracked = true;
    }
    removePiece() {
        let removedPiece = this.piece;
        //assigns the piece to a vraiable
        this.piece = null;
        //deleted the piece
        return removedPiece;
        //returns the piece that was deleted for the convencinec of us
    }
    toString() {
        if (this.isCracked()) {
            return "--XXX--";
        }
        if (this.getPiece() === null) {
            return "-------";
        }
        if (this.getPiece() !== null) {
            return "-" + this.getPiece()?.toString() + "-";
        }
    }
    //
}
