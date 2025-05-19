import { Piece } from "./Piece";
import { Location } from "./Location";
import { GameBoard } from "./GameBoard";
import { Team } from "./Team";

export class Beyonder extends Piece {
    private annihilationCooldown: number = 0;

    constructor(
        symbol: string = "B",
        teamColor: string = "Silver",
        hidden: boolean = false,
        original: boolean = true,
    ) {
        super(symbol, teamColor, hidden, original);
        this.allowableActions.push("move", "attack", "annihilate", "spawn");
    }

    isContained(
        board: GameBoard,
        opponentTeam: Team,
        location: Location,
    ): boolean {
        let surroundingEnemies = 0;
        let row = location.getRow();
        let col = location.getCol();
        let directions = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
        ];

        for (let [dr, dc] of directions) {
            let newRow = row + dr;
            let newCol = col + dc;
            if (board.inBounds(newRow, newCol)) {
                let square = board.getSquare(new Location(newRow, newCol));
                let piece = square.getPiece();
                if (
                    piece !== null &&
                    piece.getTeamColor() === opponentTeam.getTeamColor()
                ) {
                    surroundingEnemies++;
                }
            }
        }

        return surroundingEnemies >= 3;
    }

    canPerformAction(action: string): boolean {
        if (action === "annihilate") {
            return (
                this.annihilationCooldown === 0 && this.allowableAction(action)
            );
        }
        return this.allowableAction(action);
    }

    updateAction(action: string): void {
        if (action === "annihilate") {
            this.annihilationCooldown = 1;
        } else if (action === "reduce-cooldown") {
            if (this.annihilationCooldown > 0) {
                this.annihilationCooldown--;
            }
        }
    }

    validMovePath(start: Location, end: Location): boolean {
        let rowForStart = start.getRow();
        let colForStart = start.getCol();
        let rowForEnd = end.getRow();
        let colForEnd = end.getCol();
        let finalRow = rowForEnd - rowForStart;
        let finalCol = colForEnd - colForStart;
        return (
            (finalCol === 0 && (finalRow === 1 || finalRow === -1)) ||
            (finalRow === 0 && (finalCol === 1 || finalCol === -1))
        );
    }

    speak(): string {
        return "I am from beyond";
    }

    spawn(): Piece {
        this.numSpawns += 1;
        return new Beyonder(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
        );
    }

    canSpawn(): boolean {
        return this.original && this.numSpawns === 0;
    }
}
