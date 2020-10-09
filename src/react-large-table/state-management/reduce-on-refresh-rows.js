import { computeTreeSize } from "./commons-reducer.js";

function cumulHeight(tab, height) {
  const last = tab[tab.length - 1];
  return [...tab, height + last];
}

function cumulMaxHeight(max, height) {
  return max + height;
}

function resolve(state) {
  const { rows } = state;
  return rows.reduce(
    function ({ maxHeight, cumulRowsHeight }, row, i) {
      const { __height } = row;

      return {
        maxHeight: cumulMaxHeight(maxHeight, __height),
        cumulRowsHeight: cumulHeight(cumulRowsHeight, __height),
      };
    },
    {
      maxHeight: 0,
      cumulRowsHeight: [0],
    }
  );
}

function reduce(state) {
  const { maxHeight, cumulRowsHeight } = resolve(state);
  const rowsTreeSize = computeTreeSize(cumulRowsHeight);
  return { ...state, maxHeight, cumulRowsHeight, rowsTreeSize };
}

export default reduce;
