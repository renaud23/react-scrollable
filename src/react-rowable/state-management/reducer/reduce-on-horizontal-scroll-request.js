import { resolveFromStart, moveStart } from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { delta } = payload;
  const { horizontal } = state;
  const start = moveStart(horizontal, delta);

  return { ...state, horizontal: resolveFromStart({ ...horizontal, start }) };
}

export default reduce;
