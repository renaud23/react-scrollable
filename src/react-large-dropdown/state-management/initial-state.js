function initializeScrollable() {
  return {
    start: undefined,
    nb: undefined,
    size: undefined,
    maxSize: undefined,
  };
}

const INITIAL = {
  list: [],
  displayedItems: [],
  writable: false,
  disabled: false,
  focused: false,
  activeIndex: undefined,

  //
  rowHeight: 20,
  rowWidth: 400,
  vertical: initializeScrollable(),
  horizontal: {},

  //
  // vertical: initializeScrollable(),
  // verticalScroll: { start: undefined, nb: undefined },
  // horizontal: initializeScrollable(),
  // offsetChar: 10,
  //
  search: undefined,
};

export default INITIAL;
