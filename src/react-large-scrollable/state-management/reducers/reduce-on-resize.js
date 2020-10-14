import { resolveFromScrollPercent, resolveFromStart } from "./commons-reducers";

function resolveScrollable(scrollable, size) {
  const { size: prec } = scrollable;
  if (prec === undefined) {
    return resolveFromScrollPercent({ ...scrollable, size });
  }
  if (size !== prec) {
    return resolveFromStart({ ...scrollable, size });
  }

  return scrollable;
}

function resolveWidth(state, width) {
  const { horizontal } = state;
  return { ...state, horizontal: resolveScrollable(horizontal, width) };
}

function resolverHeight(state, height) {
  const { vertical } = state;
  return { ...state, vertical: resolveScrollable(vertical, height) };
}

function resolveBoth(state, width, height) {
  return resolveWidth(resolverHeight(state, height), width);
}

function reduce(state, action) {
  const { payload } = action;
  const { height, width } = payload;
  return resolveBoth(state, width, height);
}

export default reduce;
