import { WebzComponent, BindValue, WebzDialog } from "@boots-edu/webz";
import html from "./gui-view.component.html";
import css from "./gui-view.component.css";
import { Controller } from "../../Controller";
import { BoardViewComponent } from "../board-view/board-view.component";
import { ActionViewComponent } from "../action-view/action-view.component";
import { Location } from "../../game/elements/Location";

export class GuiViewComponent extends WebzComponent {
    @BindValue("turn") public turn: string = "";
    private controller: Controller;
    private boardView: BoardViewComponent;
    private actionView: ActionViewComponent;
    private startLocation: Location | null = null;
    private endLocation: Location | null = null;
    private actionType: string = "";

    constructor(controller: Controller) {
        super(html, css);
        this.controller = controller;
        this.turn = this.controller.getTurn();
        this.boardView = new BoardViewComponent(
            this.controller.getGame().getGameBoard(),
        );
        this.actionView = new ActionViewComponent();
        this.addComponent(this.boardView, "board-view");
        this.addComponent(this.actionView, "action-view");

        // Subscribe to square clicks from the board
        this.boardView.squareClicked.subscribe((location) => {
            this.handleClicks(location);
        });

        // Subscribe to action button clicks
        this.actionView.cancelNotifier.subscribe((type) => {
            this.handleClicks(type);
        });
        this.actionView.moveNotifier.subscribe((type) => {
            this.handleClicks(type);
        });
        this.actionView.attackNotifier.subscribe((type) => {
            this.handleClicks(type);
        });
        this.actionView.recruitNotifier.subscribe((type) => {
            this.handleClicks(type);
        });
        this.actionView.spawnNotifier.subscribe((type) => {
            this.handleClicks(type);
        });
        this.actionView.crackNotifier.subscribe((type) => {
            this.handleClicks(type);
        });
        this.actionView.annihilateNotifier.subscribe((type) => {
            this.handleClicks(type);
        });
    }

    private reset(): void {
        this.startLocation = null;
        this.endLocation = null;
        this.actionType = "";
    }

    private handleClicks(clicked: Location | string): void {
        if (clicked instanceof Location) {
            if (!this.startLocation) {
                this.startLocation = clicked;
            } else if (!this.endLocation) {
                this.endLocation = clicked;
            }
        } else {
            if (clicked === "cancel") {
                this.reset();
                return;
            }
            if (!this.actionType) {
                this.actionType = clicked;
            }
        }

        if (this.startLocation && this.endLocation && this.actionType) {
            const success = this.controller.carryOutAction(
                this.startLocation,
                this.endLocation,
                this.actionType,
            );
            if (!success) {
                WebzDialog.popup(this, this.controller.getStatus());
            } else {
                this.boardView.redraw();
                this.turn = this.controller.getTurn();
                if (this.controller.getGame().isGameEnded()) {
                    WebzDialog.popup(
                        this,
                        `Game Over! Winner: ${this.controller.getGame().getWinner()}`,
                    );
                }
            }
            this.reset();
        }
    }
}
