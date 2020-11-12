function initializeScrollable(
  fixed = false,
  fixedValue = fixed ? 30 : undefined
) {
  return {
    start: undefined, // current pos element
    max: undefined, // nb elements
    maxSize: undefined, // table max size in px
    cumulsSize: undefined, // cumuls px size
    scrollRequest: undefined, // scroll request delta in px
    size: undefined, // viewport size in px
    fixed, // fixed size for each element TODO
    fixedValue, // constant value fixed for each element TODO
  };
}

export default initializeScrollable;
