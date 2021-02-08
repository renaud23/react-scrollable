function getObjectValue(item) {
  const { label, value } = item;
  if (typeof label === "string") {
    return label;
  }
  if (value !== undefined) {
    return value;
  }
  return "";
}

function getValue(item) {
  const type = typeof item;
  switch (type) {
    case "number":
    case "boolean":
    case "string":
      return item;
    case "object":
      return getObjectValue(item);
    default:
      return "";
  }
}

export default getValue;
