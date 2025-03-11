import { ScamCanvasData } from "../utility-objects/ScamCanvasData.ts";
import { ScamRunOptions } from "../../consts/scam-consts/ScamRunOptions.ts";
import { ScamConfig } from "../utility-objects/ScamConfig.ts";
import { SageCanvasManager } from "../SageCanvasManager.ts";
import { CanvasStyleConfig } from "../../consts/scam-consts/DefaultCanvasStyleTypes.ts";
import { ScamBuilderInit } from "../../consts/scam-consts/ScamBuilderInitType.ts";
import { ScamCanvasDescriptions } from "../../consts/scam-consts/ScamCanvasDescriptions.ts";

export class SageCanvasManagerBuilder {
    #canvasElements: Record<string, ScamCanvasData> = {};
    #parentElement: HTMLElement = document.body;
    #runMode: ScamRunOptions = ScamRunOptions.STRIKE_WHEN_THE_TIME_IS_RIGHT;
    #currentCanvasStyles: Partial<CSSStyleDeclaration> = {};

    constructor(init: ScamBuilderInit | null = null) {
        if(!init || Object.values(init).every(value => value === null)) {
            this.addCanvasToTop(ScamCanvasDescriptions.BACKGROUND, this.#prepareCanvas());
            this.addCanvasToTop(ScamCanvasDescriptions.STAGE, this.#prepareCanvas());
            this.addCanvasToTop(ScamCanvasDescriptions.UI, this.#prepareCanvas());
            return
        }

        init.canvasDataArr?.forEach(d => {
            d.description = this.#getUniqueDescription(d.description);
            d.layerDepth = this.#getUniqueLayerDepth(d.layerDepth);
            d.canvas = this.#getUniqueCanvas(d.canvas);

            this.#canvasElements[d.description] = d;
        })

        init.canvases?.forEach(c => {
            this.addCanvasToTop(this.#getUniqueDescription(), this.#getUniqueCanvas(c));
        })

        init.descriptions?.forEach(d => {
            this.addCanvasToTop(this.#getUniqueDescription(d), this.#prepareCanvas());
        })
    }

    /** Sets run mode for the SCaM */
    setRunMode(runMode: ScamRunOptions): this {
        this.#runMode = runMode;
        return this;
    }

    /** Sets a new parent element for all canvases */
    setParentElement(parent: HTMLElement): this {
        this.#parentElement = parent;
        return this;
    }

    setDefaultStyle<T extends keyof CanvasStyleConfig>(
        property: T,
        value: CanvasStyleConfig[T]
    ): this {
        this.#currentCanvasStyles[property] = value;
        Object.values(this.#canvasElements)
            .filter(d => d.systemCreated)
            .forEach(d => d.canvas.style[property] = value)
        return this;
    }

    /** Adds a canvas with a specified description and layer depth */
    addCanvas(description: string, layerDepth: number, preExistingCanvas: HTMLCanvasElement | null = null): this {
        const canvas = this.#prepareCanvas(preExistingCanvas);
        this.#canvasElements[description] = new ScamCanvasData(canvas, layerDepth, description, preExistingCanvas != undefined);
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

    useCanvasStyleAsTemplate(canvas: HTMLCanvasElement): this {
        // Extract styles into a plain object
        const newStyles = {} as Record<string, string>; // Index signature fixes TS error
    
        for (const prop of Object.keys(canvas.style)) {
            const value = canvas.style[prop as keyof CSSStyleDeclaration];
    
            if (typeof value === "string") {
                newStyles[prop] = value; // No more TypeScript complaints!
            }
        }
    
        // Store as the new default
        this.#currentCanvasStyles = newStyles as Partial<CanvasStyleConfig>;
    
        // Apply styles to all system-created canvases
        Object.values(this.#canvasElements)
            .filter(d => d.systemCreated)
            .forEach(d => Object.assign(d.canvas.style, newStyles));
    
        return this;
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
        Object.assign(canvas.style, this.#currentCanvasStyles);
    }

    /** Finds the highest layer depth */
    #getHighestLayer(): number {
        return Math.max(...Object.values(this.#canvasElements).map(el => el.layerDepth), 0);
    }

    /** Finds the lowest layer depth */
    #getLowestLayer(): number {
        return Math.min(...Object.values(this.#canvasElements).map(el => el.layerDepth), 0);
    }

    #getUniqueDescription(description: string | null = null):string {
        if (!description) description = "canvas";
    
        const baseDescription: string = description; // Keep the original name intact
        let count: number = 1;

        const keys: string[] = Object.keys(this.#canvasElements);

        while (keys.includes(description)) {
            description = `${baseDescription}${count}`;
            count++;
        }

        return description;
    }

    #getUniqueLayerDepth(layerDepth: number): number {
        while (Object.values(this.#canvasElements).map(c => c.layerDepth).includes(layerDepth)){
            layerDepth++
        }
        return layerDepth;
    }

    #getUniqueCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
        return Object.values(this.#canvasElements).map(c => c.canvas).includes(canvas) ? document.createElement("canvas") : canvas;
    }
}
