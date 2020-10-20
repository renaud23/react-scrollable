import { randomInt, getSentence } from "./random-entities";

const __MAX_CHILDREN__ = 30;
const __MIN_CHILDREN__ = 10;

function computeChildrenSize(children, size) {
  const [__inner_height, next] = children.reduce(
    function ([ih, ch], child) {
      const nch = computeSize(child);
      const { __inner_height: nih } = nch;

      return [ih + nih, [...ch, nch]];
    },
    [size, []]
  );

  return { __inner_height, children: next };
}

export function computeSize(node) {
  const { children, __height } = node;
  if (children) {
    const ch = computeChildrenSize(children, __height);
    return { ...node, ...ch };
  }
  return { ...node, __inner_height: __height };
}

/*** */

function getRandomChildren(how, depth) {
  if (depth > 0) {
    return new Array(how).fill(null).reduce(function (a) {
      const random = randomInt(10) > 5;
      const child = random ? getRandomTree(depth - 1) : getRandomLeaf();
      if (child) {
        return [...a, child];
      }
      return a;
    }, []);
  }
  return [];
}

function getRandomLeaf() {
  return {
    label: getSentence(),
    __height: 30,
    __width: 50,
  };
}

function getRandomTree(depth) {
  if (depth > 0) {
    const node = getRandomLeaf();
    const how =
      __MIN_CHILDREN__ + randomInt(__MAX_CHILDREN__ - __MIN_CHILDREN__);

    return {
      ...node,
      children: getRandomChildren(how, depth),
    };
  }
}

export default getRandomTree;
