import * as actions from "./actions";

export const INITIAL_STATE = {
  lineHeight: undefined,
  offsetChar: undefined,

  maxWidth: 0,
  maxHeight: 0,
  maxLineSize: undefined,
  maxLines: undefined,

  viewportWidth: undefined,
  viewportHeight: undefined,
  nbLines: undefined,

  verticalScrollPercent: 0,
  horizontalScrollPercent: 0,
};

function getMaxLength(text = []) {
  return text.reduce(function (a, { length }) {
    return Math.max(a, length);
  }, 0);
}

function reduceOnInit(state, action) {
  const { payload } = action;
  const { lines, lineHeight, offsetChar } = payload;

  const maxLineSize = getMaxLength(lines);
  const maxLines = lines.length;
  const maxHeight = maxLines * lineHeight;
  const maxWidth = maxLineSize * offsetChar;

  return {
    ...state,
    lineHeight,
    offsetChar,
    maxHeight,
    maxWidth,
    maxLineSize,
    maxLines,
  };
}

function reduceOnResize(state, action) {
  const { payload } = action;
  const { width, height } = payload;

  return { ...state, viewportWidth: width, viewportHeight: height };
}

function reduceOnVerticalScroll(state, action) {
  const { payload } = action;
  const { percent } = payload;

  return { ...state, verticalScrollPercent: percent };
}

function reduceOnRefreshViewportSize(state) {
  const { lineHeight, viewportHeight } = state;
  const nbLines = Math.ceil(viewportHeight / lineHeight);
  return { ...state, nbLines };
}

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actions.ON_INIT:
      return reduceOnInit(state, action);
    case actions.ON_RESIZE:
      return reduceOnResize(state, action);
    case actions.ON_REFRESH_VIEWPORT_SIZE:
      return reduceOnRefreshViewportSize(state, action);
    case actions.ON_VERTICAL_SCROLL:
      return reduceOnVerticalScroll(state, action);
    default:
      return state;
  }
}

export default (state, action) => {
  const next = reducer(state, action);
  // console.log({ action, prev: state, next });
  return next;
};
