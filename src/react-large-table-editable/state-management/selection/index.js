const _ANY_ = "any";

export function createRange(start, stop) {
  return [start, stop];
}

export function isInRange(index, range) {
  const [start, stop] = range;
  return index >= start && index <= stop;
}

export function selectRow(index) {
  return {
    rule: {
      row: index,
      column: _ANY_,
    },
  };
}

export function selectColumn(index) {
  return { rule: { column: index, row: _ANY_ } };
}

function matchOne(one, index) {
  if (one === undefined || index === undefined) {
    return false;
  }
  if (Array.isArray(one) && one.length === 2) {
    return isInRange(index, one);
  }
  if (typeof one === "string" && one === _ANY_) {
    return true;
  }
  if (typeof one === "number" && one === index) {
    return true;
  }

  return false;
}

function matchCell({ row, column }, i, j) {
  const [sx, ex] = column;
  const [sy, ey] = row;
  if (j >= sx && j <= ex && i >= sy && i <= ey) {
    return true;
  }
  return false;
}

export function matchRule({ rule } = {}, i, j) {
  if (rule) {
    const { row, column, cell } = rule;
    if (cell) {
      return matchCell(cell, i, j);
    }
    const matchRow = matchOne(row, i);
    const matchCol = matchOne(column, j);

    return matchRow || matchCol;
  }
  return false;
}

/* */

function getOrderedRange(anchor, extent) {
  const min = Math.min(anchor, extent);
  const max = Math.max(anchor, extent);

  return createRange(min, max);
}

function getCellSelection(anchor, extent) {
  return {
    rule: {
      type: "cell",
      cell: {
        row: getOrderedRange(anchor.row, extent.row),
        column: getOrderedRange(anchor.column, extent.column),
      },
    },
  };
}

function getRowSelection(anchor, extent) {
  return {
    rule: { type: "row", row: getOrderedRange(anchor.row, extent.row) },
  };
}

function getHeadSelection(anchor, extent) {
  return {
    rule: {
      type: "head",
      column: getOrderedRange(anchor.column, extent.column),
    },
  };
}

export function getSelection(anchor, extent) {
  if (extent && anchor) {
    const { type } = anchor;
    if (type === "cell") {
      return getCellSelection(anchor, extent);
    } else if (type === "head") {
      return getHeadSelection(anchor, extent);
    } else if (type === "row") {
      return getRowSelection(anchor, extent);
    }
  }
  return undefined;
}
