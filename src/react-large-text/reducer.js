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

  verticalScrollPercentRequest: undefined,
  horizontalScrollPercentRequest: undefined,
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
  if (viewportWidth < maxWidth) {
    const marginLeft = horizontalScrollPercent * (maxWidth - viewportWidth);
    return { ...state, marginLeft: -marginLeft };
  }
  return { ...state, marginLeft: 0 };
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
  return computeHorizontalPos(computeVerticalPos(state));
}

function reduceOnArrowDown(state) {
  const { startLine, maxLines, nbLines } = state;
  const next = Math.min(startLine + 1, maxLines - nbLines);
  const verticalScrollPercentRequest = {
    percent: next / (maxLines - nbLines),
  };
  return {
    ...state,
    startLine: next,
    verticalScrollPercentRequest,
    marginTop: 0,
  };
}

function reduceOnArrowUp(state) {
  const { startLine, maxLines, nbLines } = state;
  const next = Math.max(startLine - 1, 0);
  const verticalScrollPercentRequest = {
    percent: next / (maxLines - nbLines),
  };
  return {
    ...state,
    startLine: next,
    verticalScrollPercentRequest,
    marginTop: 0,
  };
}

function reduceOnArrowLeft(state, action) {
  const { marginLeft, maxWidth, viewportWidth, offsetChar } = state;
  const how = offsetChar / (maxWidth - viewportWidth);
  const percent = Math.max(
    (Math.abs(marginLeft) || 0) / (maxWidth - viewportWidth) - how,
    0
  );
  return {
    ...state,
    marginLeft: -percent * (maxWidth - viewportWidth),
    horizontalScrollPercentRequest: { percent },
  };
}

function reduceOnArrowRight(state) {
  const { marginLeft, maxWidth, viewportWidth, offsetChar } = state;
  const how = offsetChar / (maxWidth - viewportWidth);

  const percent = Math.min(
    (Math.abs(marginLeft) || 0) / (maxWidth - viewportWidth) + how,
    1.0
  );
  return {
    ...state,
    marginLeft: -percent * (maxWidth - viewportWidth),
    horizontalScrollPercentRequest: { percent },
  };
}

function reduceOnPageUp(state, action) {
  const { startLine, maxLines, nbLines } = state;
  const next = Math.max(startLine - nbLines, 0);
  const verticalScrollPercentRequest = { percent: next / (maxLines - nbLines) };
  return {
    ...state,
    startLine: next,
    verticalScrollPercentRequest,
    marginTop: 0,
  };
}

function reduceOnPageDown(state, action) {
  const { startLine, maxLines, nbLines } = state;
  const next = Math.min(startLine + nbLines, maxLines - nbLines);
  const verticalScrollPercentRequest = { percent: next / (maxLines - nbLines) };
  return {
    ...state,
    startLine: next,
    verticalScrollPercentRequest,
    marginTop: 0,
  };
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
    case actions.ON_ARROW_DOWN:
      return reduceOnArrowDown(state, action);
    case actions.ON_ARROW_UP:
      return reduceOnArrowUp(state, action);
    case actions.ON_ARROW_LEFT:
      return reduceOnArrowLeft(state, action);
    case actions.ON_ARROW_RIGHT:
      return reduceOnArrowRight(state, action);
    case actions.ON_PAGE_UP:
      return reduceOnPageUp(state, action);
    case actions.ON_PAGE_DOWN:
      return reduceOnPageDown(state, action);

    default:
      return state;
  }
}

export default (state, action) => {
  const next = reducer(state, action);
  // console.log({ action, prev: state, next });
  return next;
};
