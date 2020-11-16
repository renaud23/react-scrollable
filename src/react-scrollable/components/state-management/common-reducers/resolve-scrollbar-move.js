import computeScrollbarScrollPercent from "./compute-scrollbar-scroll-percent";

const __DELTA__ = 100;

function getDirection(delta) {
  if (delta !== undefined && delta !== 0) {
    return Math.abs(delta) / delta;
  }
  return 0;
}

function resolve(scrollbar, delta = 0, ref = __DELTA__) {
  if (delta !== 0) {
    const { tPos, size, tSize, max } = scrollbar;
    const next = Math.min(
      Math.max(tPos + getDirection(delta) * ref * (size / (1 + max)), 0),
      size - tSize
    );
    return computeScrollbarScrollPercent({ ...scrollbar, tPos: next });
  }
  return scrollbar;
}

export default resolve;
