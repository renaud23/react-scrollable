/* eslint-disable no-restricted-globals */
import "core-js/stable";
import { searchByPrefix } from "../search-tools";

self.onmessage = (e) => {
  const { search, items, attributs } = e.data;
  const rest = searchByPrefix(search, items, attributs);
  self.postMessage(rest);
};

export default function empty() {}
