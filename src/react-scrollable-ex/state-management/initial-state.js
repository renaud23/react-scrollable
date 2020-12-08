function initalize() {
  return {
    ref: undefined,
    max: undefined,
    sizeMax: undefined,

    size: undefined,
    trackSize: undefined,
    trackPos: 0,

    percent: 0,
    focused: false,
  };
}

const INITIAL = {
  viewportWidth: undefined,
  viewportHeight: undefined,
  horizontal: initalize(),
  vertical: initalize(),
};

export default INITIAL;
