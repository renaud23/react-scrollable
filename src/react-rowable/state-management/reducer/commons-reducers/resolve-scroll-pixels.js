import { validatePercent } from "../../../../commons-scrollable";

function resolve(scrollbar, pixels) {
  if (pixels !== undefined) {
    const { cumulsSize, start, size, maxSize, margin } = scrollbar;
    const percent = validatePercent(
      (cumulsSize[start] - margin + pixels) / (maxSize - size)
    );
    return { ...scrollbar, scrollRequest: { percent } };
  }
  return scrollbar;
}

export default resolve;
