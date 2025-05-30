/*Problem 9: [5 points]
Represents the actions a player can take.

Create an abstract class named Action with the following:
- member field to represent your GameS25
- member field for the location of the start square
- member field for the location of the end square
- constructor with three parameters that sets all the member fields
- abstract method validAction with no parameters and returns a boolean
- abstract method performAction with no parameters and no return
*/
import { GameS25 } from "../elements/GameS25";
import { Location } from "../elements/Location";
export abstract class Action {
    game: GameS25;
    locationStart: Location;
    locationEnd: Location;
    constructor(game: GameS25, locationStart: Location, locationEnd: Location) {
        this.game = game;
        this.locationStart = locationStart;
        this.locationEnd = locationEnd;
    }
    abstract validAction(): boolean;
    abstract performAction(): void;
}
