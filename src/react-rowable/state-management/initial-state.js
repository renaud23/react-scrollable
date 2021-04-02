function initializeScrollable() {
  return {
    /* pixels unit */
    maxSize: 0,
    size: undefined,
    margin: undefined,
    cumulsSize: undefined,
    /* count unit */
    start: undefined,
    nb: undefined,
    max: undefined,
    /* percents unit */
    scrollPercent: 0,
    scrollRequest: undefined,
  };
}

const INITIAL = {
  horizontal: initializeScrollable(),
  vertical: initializeScrollable(),
};

export default INITIAL;
