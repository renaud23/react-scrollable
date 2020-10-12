import {
  resolveScrollbar,
  resolveNb,
  resolveScrollPercent,
  computeSeuil,
} from "./commons-reducer";

function getWidth({ width }) {
  return width;
}

function getHeight({ __height }) {
  return __height;
}

function reduceSize(scrollbar, size, getSize) {
  if (scrollbar.size === undefined) {
    return resolveScrollbar({ ...scrollbar, size }, getSize);
  }
  const next = resolveScrollPercent({ ...scrollbar, size });
  const seuil = computeSeuil(next);

  return resolveNb(next, seuil);
}

function reduceWidth(state, size) {
  const { horizontal } = state;
  return { ...state, horizontal: reduceSize(horizontal, size, getWidth) };
}

function reduceHeight(state, size) {
  const { vertical } = state;
  return { ...state, vertical: reduceSize(vertical, size, getHeight) };
}

function reduceBoth(state, width, height) {
  return reduceHeight(reduceWidth(state, width), height);
}

function reduce(state, action) {
  const { payload } = action;
  const { width, height } = payload;
  const { horizontal, vertical, headerHeight } = state;
  const { size: viewportWidth } = horizontal;
  const { size: viewportHeight } = vertical;

  if (viewportWidth !== width && viewportHeight + headerHeight !== height) {
    return reduceBoth(state, width, height - headerHeight);
  }
  if (viewportWidth !== width) {
    return reduceWidth(state, width);
  }
  if (viewportHeight !== height) {
    return reduceHeight(state, height - headerHeight);
  }
  return state;
}

export default reduce;
