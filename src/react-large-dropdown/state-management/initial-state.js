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
  expended: false,
  selectedIndex: undefined,

  //
  rowHeight: 20,
  rowWidth: 400,
  vertical: initializeScrollable(),
  horizontal: {},
  verticalScrollRequest: undefined,

  //
  search: "",
};

export default INITIAL;
