import { ScamCanvasDescription } from "../../consts/scam-consts/ScamCanvasDescription";
import { ScamCanvasData } from "../utility-objects/ScamCanvasData";
import { ScamRunOptions } from "../../consts/scam-consts/ScamRunOptions";
import { DEFAULT_CANVAS_STYLES } from "../../consts/scam-consts/DefaultCanvasStyles";
import { ScamConfig } from "../utility-objects/ScamConfig";
import { SageCanvasManager } from "../SageCanvasManager";

export class SageCanvasManagerBuilder {
    #canvasElements: Record<string, ScamCanvasData> = {};
    #parentElement: HTMLElement = document.body;
    #runMode: ScamRunOptions = ScamRunOptions.STRIKE_WHEN_THE_TIME_IS_RIGHT;

    constructor(preExistingCanvas: HTMLCanvasElement | null = null) {
        if (preExistingCanvas) {
            // Single-canvas mode: Only stage is created
            this.addCanvas(ScamCanvasDescription.STAGE, 0, preExistingCanvas);
        } else {
            // Multi-canvas mode: Background, Stage, and UI layers
            this.addCanvas(ScamCanvasDescription.BACKGROUND, -1)
                .addCanvas(ScamCanvasDescription.STAGE, 0)
                .addCanvas(ScamCanvasDescription.UI, 1);
            
            // Ensure UI canvas allows interaction
            this.#canvasElements[ScamCanvasDescription.UI].canvas.style.pointerEvents = "auto";
        }
    }

    /** Sets a new parent element for all canvases */
    setParentElement(parent: HTMLElement): this {
        this.#parentElement = parent;
        return this;
    }
    /** Adds a canvas with a specified description and layer depth */
    addCanvas(description: string, layerDepth: number, preExistingCanvas: HTMLCanvasElement | null = null): this {
        const canvas = this.#prepareCanvas(preExistingCanvas);
        this.#canvasElements[description] = new ScamCanvasData(canvas, layerDepth);
        return this;
    }

    /** Adds a canvas on top of all existing layers */
    addCanvasToTop(description: string, preExistingCanvas: HTMLCanvasElement | null = null): this {
        const highestLayer = this.#getHighestLayer() + 1;
        return this.addCanvas(description, highestLayer, preExistingCanvas);
    }

    /** Adds a canvas below all existing layers */
    addCanvasToBottom(description: string, preExistingCanvas: HTMLCanvasElement | null = null): this {
        const lowestLayer = this.#getLowestLayer() - 1;
        return this.addCanvas(description, lowestLayer, preExistingCanvas);
    }

    /** FINAL STEP: Builds the ScamConfig for SCaM proper */
    build(): SageCanvasManager {
        const config: ScamConfig = new ScamConfig()
            .setCanvases(this.#canvasElements)
            .setParentElement(this.#parentElement)
            .setRunMode(this.#runMode);

        return new SageCanvasManager(config);
    }

    /** Ensures canvas exists, reuses if provided, or creates a new one (with default styles applied) */
    #prepareCanvas(preExistingCanvas: HTMLCanvasElement | null = null): HTMLCanvasElement {
        if (preExistingCanvas) return preExistingCanvas;

        const canvas = document.createElement("canvas");
        this.#applyDefaultCanvasStyles(canvas);
        return canvas;
    }

    /** Applies default styles so all canvases are positioned and sized correctly */
    #applyDefaultCanvasStyles(canvas: HTMLCanvasElement): void {
        Object.assign(canvas.style, DEFAULT_CANVAS_STYLES);
    }

    /** Finds the highest layer depth */
    #getHighestLayer(): number {
        return Math.max(...Object.values(this.#canvasElements).map(el => el.layerDepth), 0);
    }

    /** Finds the lowest layer depth */
    #getLowestLayer(): number {
        return Math.min(...Object.values(this.#canvasElements).map(el => el.layerDepth), 0);
    }
}
