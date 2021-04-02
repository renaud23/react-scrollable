const NIVEAUX = {
  niveau1: "niveau1",
  niveau2: "niveau2",
  niveau3: "niveau3",
  niveau4: "niveau4",
  niveau5: "niveau5",
};

const STRUCTURE = [
  NIVEAUX.niveau1,
  NIVEAUX.niveau2,
  NIVEAUX.niveau3,
  NIVEAUX.niveau4,
  NIVEAUX.niveau5,
];

const NIVEAUX_TO_INDEX = Object.values(NIVEAUX).reduce(
  (a, niveau, index) => ({ ...a, [niveau]: index }),
  {}
);

export async function getJson(path) {
  const blob = await fetch(path);
  return blob.json();
}

function linkPoste(poste, node, graph) {
  const { children, niveau } = poste;
  const tab = new Array(5).fill(null).map(function (_, i) {
    return node[STRUCTURE[i]];
  });
  const index = NIVEAUX_TO_INDEX[niveau];
  let parent = index > 0 ? tab[index - 1] : undefined;
  if (index === STRUCTURE.length - 1) {
    return { ...poste, parent };
  }

  const nc =
    children.indexOf(tab[index + 1]) !== -1
      ? children
      : [...children, tab[index + 1]];

  return { ...poste, parent, children: nc };
}

function mergeNode(node, graph) {
  return Object.entries(node).reduce(function (next, [niveau, code]) {
    if (code in graph) {
      return { ...next, [code]: linkPoste(graph[code], node) };
    }

    return {
      ...next,
      [code]: linkPoste(
        { code, niveau, parent: undefined, children: [] },
        node
      ),
    };
  }, {});
}

export function createGraph(structure) {
  return structure.reduce(function (graph, node) {
    const next = mergeNode(node, graph);
    return { ...graph, ...next };
  }, {});
}

export function merge(graph, level) {
  return level.reduce(function (a, poste) {
    const { code } = poste;

    if (code in a) {
      return { ...a, [code]: { ...a[code], ...poste } };
    }
    return a;
  }, graph);
}

export async function buildNaf() {
  const structure = await getJson("/naf-structure.json");
  const niveaux = await getJson("/naf-niveau.json");

  return merge(createGraph(structure), niveaux);
}

export async function getNaf() {
  const pathname = "/react-scrollable";
  return getJson(`${pathname}/naf-rev2.json`);
}
