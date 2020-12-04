const __DELTA__ = 100;

function getDirection(delta) {
  if (delta !== undefined && delta !== 0) {
    return Math.abs(delta) / delta;
  }
  return 0;
}

function resolve(scrollbar, delta = 0, ref = __DELTA__) {
  if (delta !== 0) {
    const { size, max } = scrollbar;
    return getDirection(delta) * ref * (size / (1 + max));
  }
  return delta;
}

export default resolve;
