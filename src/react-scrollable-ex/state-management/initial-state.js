function initalize() {
  return {
    ref: undefined,
    max: undefined,

    size: undefined,
    trackSize: undefined,
    trackPos: 0,

    percent: 0,
    focused: false,
  };
}

const INITIAL = {
  idContent: undefined,
  viewportWidth: undefined,
  viewportHeight: undefined,
  horizontal: initalize(),
  vertical: initalize(),
};

export default INITIAL;
