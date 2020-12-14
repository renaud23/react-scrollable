function initalize() {
  return {
    ref: undefined,
    max: undefined,

    refSize: undefined, // content size
    size: undefined, // size of scrollbar
    trackSize: undefined,
    trackPos: 0,

    percent: 0,
    focused: false,
  };
}

const INITIAL = {
  drag: false,
  idContent: undefined,
  viewportWidth: undefined,
  viewportHeight: undefined,
  horizontal: initalize(),
  vertical: initalize(),
};

export default INITIAL;
