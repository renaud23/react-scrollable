import resolveScrollableData from "./refresh-scrollable-data";
import { getWidth } from "../../commons-table";

function reduce(state, action) {
  const { payload } = action;
  const { one, two } = payload;
  const { header } = state;
  const next = [...header];
  const three = header[one];
  next[one] = next[two];
  next[two] = three;

  return {
    ...state,
    header: next,
    horizontal: resolveScrollableData(next, getWidth),
  };
}

export default reduce;
