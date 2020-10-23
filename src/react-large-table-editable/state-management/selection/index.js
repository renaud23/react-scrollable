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

export function matchRule({ rule } = {}, i, j) {
  if (rule) {
    const { row, column } = rule;
    let matchRow = matchOne(row, i);
    let matchCol = matchOne(column, j);

    return matchRow && matchCol;
  }
  return false;
}
