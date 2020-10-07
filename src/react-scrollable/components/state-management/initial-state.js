const SCROLLBAR_INITIAL_STATE = {
  max: undefined,
  tPos: undefined,
  tSize: undefined,
  pSize: undefined,
  drag: false,
  scrollPercent: 0,
  clientPos: undefined,
};

const INITIAL_STATE = {
  init: true,
  refresh: true,
  horizontal: { ...SCROLLBAR_INITIAL_STATE },
  vertical: { ...SCROLLBAR_INITIAL_STATE },
};

export default INITIAL_STATE;
