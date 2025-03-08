import { SageCanvasManagerBuilder } from "./canvas-manager/builder/SageCanvasManagerBuilder.ts";
import { ScamRunOptions } from "./consts/scam-consts/ScamRunOptions.ts";
const builder = new SageCanvasManagerBuilder();
const scam = builder
  .setRunMode(ScamRunOptions.SCAM_IMMEDIATELY) // Attach immediately!
  .setParentElement(document.getElementById("scam-container")!)
  .build();

console.log("SCaM is ALIVE!", scam);