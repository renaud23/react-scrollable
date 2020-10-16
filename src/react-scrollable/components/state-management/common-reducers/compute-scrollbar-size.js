const __TRACK_MIN_WIDTH__ = 10;

function compute(scrollbar, viewportSize) {
  const { max, size } = scrollbar;
  const percent = viewportSize / max;
  const pSize = Math.trunc(percent * viewportSize);
  const tSize = Math.max(Math.trunc(percent * size), __TRACK_MIN_WIDTH__);
  // console.log({ pSize, tSize, max, size });
  return { ...scrollbar, pSize, tSize };
}

export default compute;
