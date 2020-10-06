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
  startLine: undefined,
  defaultStartLine: 0,
  marginTop: 0,
  marginLeft: 0,
};

function computeVerticalPos(state) {
  const {
    verticalScrollPercent,
    maxHeight,
    viewportHeight,
    lineHeight,
  } = state;
  const scrollTop = verticalScrollPercent * (maxHeight - viewportHeight);
  const startLine = Math.trunc(scrollTop / lineHeight) || 0;
  const endTop = scrollTop + viewportHeight;
  const endLine = Math.ceil(endTop / lineHeight);
  const nbLines = endLine - startLine;
  const marginTop = startLine * lineHeight - scrollTop;
  return { ...state, startLine, nbLines, marginTop };
}

function computeHorizontalPos(state) {
  const { horizontalScrollPercent, maxWidth, viewportWidth } = state;
  const marginLeft = horizontalScrollPercent * (maxWidth - viewportWidth) * -1;

  return { ...state, marginLeft };
}

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
  const maxWidth = Math.ceil(maxLineSize * offsetChar);
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

  return computeVerticalPos({ ...state, verticalScrollPercent: percent });
}

function reduceOnHorizontalScroll(state, action) {
  const { payload } = action;
  const { percent } = payload;

  return computeHorizontalPos({ ...state, horizontalScrollPercent: percent });
}

function reduceOnRefreshViewportSize(state) {
  return computeVerticalPos(state);
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
    case actions.ON_HORIZONTAL_SCROLL:
      return reduceOnHorizontalScroll(state, action);
    default:
      return state;
  }
}

export default (state, action) => {
  const next = reducer(state, action);
  // console.log({ action, prev: state, next });
  return next;
};
