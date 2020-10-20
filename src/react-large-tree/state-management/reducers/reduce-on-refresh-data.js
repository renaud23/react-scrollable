import { getHeight, getChildren } from "../../commons-tree";
import { computeCumulsSize } from "../../../commons-scrollable";

function linearRows(node, level = 0, subIndex = 0, last = true, pattern = "") {
  const children = getChildren(node);
  if (children.length) {
    return children.reduce(
      function (a, child, i) {
        const isLast = i === children.length - 1;
        const pattern_ = `${pattern}${isLast ? "0" : "1"}`;
        return [...a, ...linearRows(child, level + 1, i, isLast, pattern_)];
      },
      [{ ...node, level, subIndex, last, pattern }]
    );
  }

  return [{ ...node, level, subIndex, last, pattern: `${pattern}` }];
}

function compute(root, getSize) {
  const rows = linearRows(root).map((r, i) => ({ ...r, index: i }));
  const cumulsSize = computeCumulsSize(rows, getSize);
  const max = rows.length;
  const maxSize = cumulsSize[max];
  return [rows, { maxSize, max, cumulsSize }];
}

function reduce(state, action) {
  const { payload } = action;
  const { root } = payload;
  const [rows, vertical] = compute(root, getHeight);
  return { ...state, vertical, rows };
}

export default reduce;
