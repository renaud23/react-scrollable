import { createIndex, createSearchByWords } from "../by-words";

const NAF_FIELDS = [
  { name: "libelle", rules: [/[\w]+/], language: "French", min: 3 },
  { name: "code" },
];

export async function createNafRev2Index(nafRev2) {
  const index = await createIndex(NAF_FIELDS, nafRev2);
  return index;
}

async function blankSearch(_, items) {
  return items;
}

export function createSearchInNaf(index) {
  if (typeof index === "object") {
    return createSearchByWords(index);
  }
  return blankSearch;
}
