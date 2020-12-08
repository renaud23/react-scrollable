import { resolveFromStart, moveStart } from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { delta } = payload;
  const { vertical } = state;
  const start = moveStart(vertical, delta);

  return { ...state, vertical: resolveFromStart({ ...vertical, start }) };
}

export default reduce;
