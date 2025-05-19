import html from "./main.component.html";
import css from "./main.component.css";
import { WebzComponent } from "@boots-edu/webz";
import { Controller } from "../Controller";
import { TextViewComponent } from "./text-view/text-view.component";
import { GuiViewComponent } from "./gui-view/gui-view.component";
/**
 * @description MainComponent is the main component of the app
 * @extends WebzComponent
 *
 */
export class MainComponent extends WebzComponent {
    // Controller object is what we will use
    // to create the game from the data model
    private controller: Controller;

    constructor() {
        super(html, css);
        this.controller = new Controller(4, 5);
        this.setUpView(false);
    }
    setUpView(useTextView: boolean): void {
        if (useTextView) {
            const textViewComponent = new TextViewComponent(this.controller);
            this.addComponent(textViewComponent, "game");
        } else {
            const guiViewComponent = new GuiViewComponent(this.controller);
            this.addComponent(guiViewComponent, "game");
        }
    }
}
