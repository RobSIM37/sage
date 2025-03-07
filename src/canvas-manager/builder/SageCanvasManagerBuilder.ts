import { ScamCanvasDescription } from "../../consts/ScamCanvasDescription";
import { ScamCanvasData } from "../utility-objects/ScamCanvasData";

export class SageCanvasManagerBuilder {
    
    #canvasElements: Record<string, ScamCanvasData> = {};
    
    constructor(preExistingCanvas: HTMLCanvasElement | null = null) {
        if (preExistingCanvas) {
            this.#canvasElements[ScamCanvasDescription.STAGE] = new ScamCanvasData(preExistingCanvas, 0);
        } else {
            this.#canvasElements[ScamCanvasDescription.BACKGROUND] = new ScamCanvasData(document.createElement("canvas"), -1);
            this.#canvasElements[ScamCanvasDescription.STAGE] = new ScamCanvasData(document.createElement("canvas"), 0);
            this.#canvasElements[ScamCanvasDescription.UI] = new ScamCanvasData(document.createElement("canvas"), 1);

            Object.values(this.#canvasElements).forEach((canvasData: ScamCanvasData) => {
                canvasData.canvas.style.position = "absolute";
                canvasData.canvas.style.top = "0";
                canvasData.canvas.style.left = "0";
                canvasData.canvas.style.width = "100%";
                canvasData.canvas.style.height = "100%";
                canvasData.canvas.style.pointerEvents = "none"; // UI might change this later
            });
    
            // Ensure UI canvas allows interaction
            this.#canvasElements[ScamCanvasDescription.UI].canvas.style.pointerEvents = "auto";
        }
    }
}