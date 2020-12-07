import BINDED_KEYS from "./binded-key";

const BINDED_MAP = Object.values(BINDED_KEYS).reduce(function (a, k) {
  return { ...a, [k]: "undefined" };
}, {});

function is(key) {
  return key in BINDED_MAP;
}

export default is;
