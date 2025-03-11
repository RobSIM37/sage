// Allowed CSS position values
export type CanvasPosition = "absolute" | "relative" | "fixed" | "sticky" | "static";

// Allowed CSS unit values for positioning
export type CanvasMeasurement = "0" | `${number}px` | `${number}%` | `${number}vh` | `${number}vw` | "auto";

// Allowed CSS pointer-events values
export type CanvasPointerEvents = "auto" | "none";

export type CanvasStyleConfig = {
    position: CanvasPosition;
    top: CanvasMeasurement;
    left: CanvasMeasurement;
    width: CanvasMeasurement;
    height: CanvasMeasurement;
    pointerEvents: CanvasPointerEvents;
};