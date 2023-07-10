// todo: get rid of BeatLabelType here
export const BeatLabelType = {
  BEAT_INDEX: "beat-number",
  SECONDS: "seconds",
};

export const CONTENT_WIDTH = 1024;
export const SIDEBAR_WIDTH = 250;
export const MATRIX_ITEM_MARGIN = 5;
export const MATRIX_WIDTH = CONTENT_WIDTH - SIDEBAR_WIDTH - MATRIX_ITEM_MARGIN;
export const BORDER_RADIUS = 4;

export const PRIMARY_COLOR = "deepskyblue";
export const SECONDARY_COLOR = "crimson";

export const DEFAULT_BPM = 120;
export const MIN_BPM = 40;
export const MAX_BPM = 200;

export const DEFAULT_WAVEVIEW_RANGE = { small: 2, large: 4 };
export const MIN_WAVEVIEW_RANGE = { small: 0.5, large: 0.5 };
export const MAX_WAVEVIEW_RANGE = { small: 4, large: 8 };

export const SCHEDULE_INTERVAL = 1;
export const SCHEDULE_LOOKAHEAD = 1.5;

export const NUMBER_OF_ROWS = 4;
export const NUMBER_OF_COLUMNS = 4;
