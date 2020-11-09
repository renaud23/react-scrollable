function getCoords(box) {
  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = Math.round(box.top + scrollTop - clientTop);
  var left = Math.round(box.left + scrollLeft - clientLeft);

  return { top, left, bottom: top + box.height, right: left + box.width };
}

function isBeetween(pos, min, max) {
  return pos >= min && pos <= max;
}

function getDelta(pos, min, max) {
  if (pos < min) {
    return pos - min;
  }
  if (pos > max) {
    return pos - max;
  }
  return 0;
}

function reduce(state, action) {
  const { tableRect } = state;
  if (tableRect) {
    const { payload } = action;
    const { clientX, clientY, offsetY } = payload;
    const rect = getCoords(tableRect);
    const { left, right, top, bottom } = rect;

    if (isBeetween(clientX, left, right)) {
      const dy = getDelta(offsetY, top, bottom);
      console.log(dy);
      return { ...state, dragOutDirection: { dx: 0, dy: 0 } };
    }

    if (isBeetween(clientY, top, bottom)) {
      return { ...state, dragOutDirection: { dx: 0, dy: 0 } };
    }
  }
  return state;
}

export default reduce;
