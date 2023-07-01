export const BeatLabelType = {
  BEAT_INDEX: "beat-number",
  SECONDS: "seconds",
};

export const NUMBER_OF_ROWS = 4;
export const NUMBER_OF_COLUMNS = 4;

export const CONTENT_WIDTH = 980;
export const SIDEBAR_WIDTH = 250;
export const MATRIX_WIDTH = CONTENT_WIDTH - SIDEBAR_WIDTH;

export const MATRIX_ITEM_MARGIN = 10;
export const MATRIX_ITEM_WIDTH =
  MATRIX_WIDTH / (NUMBER_OF_COLUMNS + 1) - MATRIX_ITEM_MARGIN;

export const MATRIX_ITEM_PADDING = 10;
export const MATRIX_BUTTON_WIDTH = MATRIX_ITEM_WIDTH - 2 * MATRIX_ITEM_PADDING;

export const MAIN_COLOR = "deepskyblue";
