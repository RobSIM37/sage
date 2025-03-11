import { ScamCanvasData } from "../../canvas-manager/utility-objects/ScamCanvasData.ts";

export type ScamBuilderInit = {
    canvasDataArr?: ScamCanvasData[] | null;
    canvases?: HTMLCanvasElement[] | null;
    descriptions?: string[] | null;
};