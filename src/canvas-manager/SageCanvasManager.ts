import { ScamRunOptions } from "../consts/scam-consts/ScamRunOptions.ts";
import { ScamCanvasData } from "./utility-objects/ScamCanvasData.ts";
import { ScamConfig } from "./utility-objects/ScamConfig.ts";

export class SageCanvasManager {
    #canvasElements: Record<string, ScamCanvasData>;
    #parentElement: HTMLElement;
    #runMode: ScamRunOptions;
    #isScamRunning: boolean = false; // Prevent duplicate attachments

    constructor(config: ScamConfig) {
        this.#canvasElements = config.getCanvases();
        this.#parentElement = config.getParentElement();
        this.#runMode = config.getRunMode();

        console.log("SCaM initialized!", { 
            parent: this.#parentElement, 
            runMode: this.#runMode, 
            canvases: Object.keys(this.#canvasElements) 
        });

        if (this.#runMode === ScamRunOptions.SCAM_IMMEDIATELY) {
            this.runScam();
        }
    }

    /** Attaches canvases in the correct order */
    runScam(): void {
        if (this.#isScamRunning) {
            console.warn("SCaM is already running! Ignoring duplicate call.");
            return;
        }

        console.log("SCaM is now running! Attaching canvases to:", this.#parentElement);
        Object.values(this.#canvasElements)
            .sort((a, b) => a.layerDepth - b.layerDepth) // Ensure correct render order
            .forEach((canvasData) => {
                console.log("Appending canvas:", canvasData);
                this.#parentElement.appendChild(canvasData.canvas);
            });

        this.#isScamRunning = true; // Prevent duplicate calls
    }
}
