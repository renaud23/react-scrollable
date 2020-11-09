import { expandSelection, getSelection } from "../selection";

function getDelta(delta) {
  return delta !== 0 ? { delta } : undefined;
}

function reduce(state) {
  const { dragOutDirection, extent, anchor } = state;

  if (dragOutDirection && anchor) {
    const { dx, dy } = dragOutDirection;
    const deltaX = getDelta(dx);
    const deltaY = getDelta(dy);
    const nExtent = expandSelection(extent, deltaX, deltaY);
    return {
      ...state,
      extent: nExtent,
      selection: getSelection(anchor, nExtent),
      horizontalScrollRequest: deltaX,
      verticalScrollRequest: deltaY,
    };
  }
  return {
    ...state,
    horizontalScrollRequest: undefined,
    verticalScrollRequest: undefined,
  };
}

export default reduce;
