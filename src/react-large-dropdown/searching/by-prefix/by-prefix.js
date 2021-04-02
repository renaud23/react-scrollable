import ByPrefixWorker from "./by-prefix.worker";
import { isWorkerCompatible, searchByPrefix } from "../search-tools";

export default function search(search, items = [], attributs) {
  return new Promise(function (resolve) {
    if (isWorkerCompatible()) {
      const worker = new ByPrefixWorker();
      worker.postMessage({ search, items, attributs });
      worker.addEventListener("message", function (e) {
        const { data } = e;
        resolve(data);
      });
    } else {
      resolve(searchByPrefix(search, items, attributs));
    }
  });
}
