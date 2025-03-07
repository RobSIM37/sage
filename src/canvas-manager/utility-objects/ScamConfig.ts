import { ScamRunOptions } from "../../consts/scam-consts/ScamRunOptions";
import { ScamCanvasData } from "./ScamCanvasData";

export class ScamConfig {
    private canvasElements: Record<string, ScamCanvasData> = {};
    private parentElement: HTMLElement = document.body;
    private runMode: ScamRunOptions = ScamRunOptions.STRIKE_WHEN_THE_TIME_IS_RIGHT;

    /** Sets the canvas collection */
    setCanvases(canvasElements: Record<string, ScamCanvasData>): this {
        this.canvasElements = canvasElements;
        return this;
    }

    /** Sets a new parent element */
    setParentElement(parent: HTMLElement): this {
        this.parentElement = parent;
        return this;
    }

    /** Sets a new run mode */
    setRunMode(runMode: ScamRunOptions): this {
        this.runMode = runMode;
        return this;
    }

    /** Gets all canvases */
    getCanvases(): Record<string, ScamCanvasData> {
        return this.canvasElements;
    }

    /** Gets the parent element */
    getParentElement(): HTMLElement {
        return this.parentElement;
    }

    /** Gets the current run mode */
    getRunMode(): ScamRunOptions {
        return this.runMode;
    }
}
