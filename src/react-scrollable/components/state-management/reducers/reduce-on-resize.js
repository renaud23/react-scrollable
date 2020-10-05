import { computeScrollbarSize, computeScrollbarPos } from "../common-reducers";

function reduceVertical(state, action) {
  const { payload } = action;
  const { height } = payload;
  const { viewportHeight, vertical } = state;
  if (height !== viewportHeight) {
    return {
      ...state,
      vertical: computeScrollbarPos(
        computeScrollbarSize({ ...vertical, size: height })
      ),
    };
  }

  return state;
}

function reduceHorizontal(state, action) {
  const { payload } = action;
  const { width } = payload;
  const { viewportWidth, horizontal } = state;
  if (width !== viewportWidth) {
    return {
      ...state,
      horizontal: computeScrollbarPos(
        computeScrollbarSize({ ...horizontal, size: width })
      ),
    };
  }
  return state;
}

function reduceBoth(state, action) {
  return reduceHorizontal(reduceVertical(state, action), action);
}

/**
 *
 * @param {*} state
 * @param {*} action
 */
function reduce(state, action) {
  const { payload } = action;
  const { width, height } = payload;
  const { viewportWidth, viewportHeight } = state;

  if (viewportWidth !== width && viewportHeight !== height) {
    return reduceBoth(state, action);
  } else if (viewportWidth !== width) {
    return reduceHorizontal(state, action);
  } else if (viewportHeight !== height) {
    return reduceVertical(state, action);
  }
  return state;
}

export default reduce;
