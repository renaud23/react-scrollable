function initialize() {
  return { max: undefined, maxSize: undefined, cumulsSize: undefined };
}

const INITIAL_STATE = {
  rows: undefined,
  horizontal: initialize(),
  vertical: initialize(),
};

export default INITIAL_STATE;
