export class ScamCanvasData {

    #canvas: HTMLCanvasElement;
    #layerDepth: number;

    constructor(canvas: HTMLCanvasElement, layerDepth: number) {
        this.#canvas = canvas;
        this.#layerDepth = layerDepth;
    }

    get canvas() { return this.#canvas }
    set canvas(canvas: HTMLCanvasElement) {this.#canvas = canvas}

    get layerDepth() { return this.#layerDepth }
    set layerDepth(layerDepth: number) { this.#layerDepth = layerDepth }
}