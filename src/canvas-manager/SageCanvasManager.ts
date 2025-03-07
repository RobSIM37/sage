import { ScamRunOptions } from "../consts/scam-consts/ScamRunOptions";
import { ScamCanvasData } from "./utility-objects/ScamCanvasData";
import { ScamConfig } from "./utility-objects/ScamConfig";

export class SageCanvasManager {
    #canvasElements: Record<string, ScamCanvasData>;
    #parentElement: HTMLElement;
    #runMode: ScamRunOptions;

    constructor(config: ScamConfig) {
        this.#canvasElements = config.getCanvases();
        this.#parentElement = config.getParentElement();
        this.#runMode = config.getRunMode();

        console.log("SCaM initialized!", { 
            parent: this.#parentElement, 
            runMode: this.#runMode, 
            canvases: Object.keys(this.#canvasElements) 
        });
    }
}
