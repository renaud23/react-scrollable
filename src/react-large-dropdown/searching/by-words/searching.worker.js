/* eslint-disable no-restricted-globals */
import "core-js/stable";
import searching from "./searching";

self.onmessage = function (e) {
  const { search, items, index } = e.data;
  if (index && items) {
    const result = searching(search, items, index);
    self.postMessage(result);
  }
  self.postMessage([]);
};

export default () => null;
