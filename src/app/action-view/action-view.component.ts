/*import { WebzComponent, Click, Notifier } from "@boots-edu/webz";
import html from "./action-view.component.html";
import css from "./action-view.component.css";

export class ActionViewComponent extends WebzComponent {
    public cancelNotifier: Notifier<string> = new Notifier<string>();
    public moveNotifier: Notifier<string> = new Notifier<string>();
    public attackNotifier: Notifier<string> = new Notifier<string>();
    public recruitNotifier: Notifier<string> = new Notifier<string>();
    public spawnNotifier: Notifier<string> = new Notifier<string>();
    public crackNotifier: Notifier<string> = new Notifier<string>();
    public annihilateNotifier: Notifier<string> = new Notifier<string>();

    constructor() {
        super(html, css);
    }

    @Click("cancel")
    onCancel(): void {
        this.cancelNotifier.notify("cancel");
    }

    @Click("move")
    onMove(): void {
        this.moveNotifier.notify("move");
    }

    @Click("attack")
    onAttack(): void {
        this.attackNotifier.notify("attack");
    }

    @Click("recruit")
    onRecruit(): void {
        this.recruitNotifier.notify("recruit");
    }

    @Click("spawn")
    onSpawn(): void {
        this.spawnNotifier.notify("spawn");
    }

    @Click("crack")
    onCrack(): void {
        this.crackNotifier.notify("crack");
    }

    @Click("annihilate")
    onAnnihilate(): void {
        this.annihilateNotifier.notify("annihilate");
    }
}
*/
import { WebzComponent, Click, Notifier } from "@boots-edu/webz";
import html from "./action-view.component.html";
import css from "./action-view.component.css";

export class ActionViewComponent extends WebzComponent {
    public cancelNotifier: Notifier<string> = new Notifier<string>();
    public moveNotifier: Notifier<string> = new Notifier<string>();
    public attackNotifier: Notifier<string> = new Notifier<string>();
    public recruitNotifier: Notifier<string> = new Notifier<string>();
    public spawnNotifier: Notifier<string> = new Notifier<string>();
    public crackNotifier: Notifier<string> = new Notifier<string>();
    public annihilateNotifier: Notifier<string> = new Notifier<string>();

    constructor() {
        super(html, css);
    }

    @Click("cancel")
    onCancel(): void {
        this.cancelNotifier.notify("cancel");
    }

    @Click("move")
    onMove(): void {
        this.moveNotifier.notify("move");
    }

    @Click("attack")
    onAttack(): void {
        this.attackNotifier.notify("attack");
    }

    @Click("recruit")
    onRecruit(): void {
        this.recruitNotifier.notify("recruit");
    }

    @Click("spawn")
    onSpawn(): void {
        this.spawnNotifier.notify("spawn");
    }

    @Click("crack")
    onCrack(): void {
        this.crackNotifier.notify("crack");
    }

    @Click("annihilate")
    onAnnihilate(): void {
        this.annihilateNotifier.notify("annihilate");
    }
}
