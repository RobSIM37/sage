export enum ScamRunOptions {
    SCAM_IMMEDIATELY = "ScamImmediately", // Attach canvases in the constructor
    STRIKE_WHEN_THE_TIME_IS_RIGHT = "StrikeWhenTheTimeIsRight", // Attach on first render (Default)
    THE_LONG_CON = "TheLongCon" // Requires manual `runScam()`
}