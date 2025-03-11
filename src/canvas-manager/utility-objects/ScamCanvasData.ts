export class ScamCanvasData {

    #canvas: HTMLCanvasElement;
    #layerDepth: number;
    #description: string;
    #systemCreated: boolean;

    constructor(canvas: HTMLCanvasElement, layerDepth: number, description: string, systemCreated: boolean = true) {
        this.#canvas = canvas;
        this.#layerDepth = layerDepth;
        this.#description = description;
        this.#systemCreated = systemCreated;
    }

    get canvas() { return this.#canvas }
    set canvas(canvas: HTMLCanvasElement) {this.#canvas = canvas}

    get layerDepth() { return this.#layerDepth }
    set layerDepth(layerDepth: number) { this.#layerDepth = layerDepth }

    get description() { return this.#description }
    set description(description: string) { this.#description = description }

    get systemCreated() { return this.#systemCreated }
}