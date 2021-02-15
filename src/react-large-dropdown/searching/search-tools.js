import trimAccents from "remove-accents";

export function trimWhiteSpace(string) {
  return string.replace(/\s+/g, "");
}

export function prepare(string) {
  if (typeof string === "string") {
    const prepared = trimWhiteSpace(trimAccents(string));
    if (prepared.length) {
      return prepared.toLowerCase();
    }
  }
  return undefined;
}

function getAttributs(attributs) {
  if (Array.isArray(attributs) && attributs.length) {
    return attributs;
  }
  return ["label"];
}

function startsWith(prefix, item, attributs) {
  return attributs.reduce(function (state, attr) {
    if (attr in item && typeof item[attr] === "string") {
      return state || prepare(item[attr]).startsWith(prefix);
    }
    return state;
  }, false);
}

export function searchByPrefix(search, items = [], attributs) {
  const prefix = prepare(search);
  const attr = getAttributs(attributs);
  return items.reduce(function (stack, item) {
    if (startsWith(prefix, item, attr)) {
      return [...stack, item];
    }
    return stack;
  }, []);
}

export function isWorkerCompatible() {
  if (window.Worker) {
    return true;
  }
  return false;
}
