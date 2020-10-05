const __TRACK_MIN_WIDTH__ = 10;

function compute(scrollbar) {
  const { size, max } = scrollbar;
  const pSize = Math.trunc((size / max) * size);
  const tSize = Math.max(pSize, __TRACK_MIN_WIDTH__);
  return { ...scrollbar, pSize, tSize };
}

export default compute;
