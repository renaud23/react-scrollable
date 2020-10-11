import { randomInt, getRandomWord, getSentence } from "./random-entities";

const __MIN_WIDTH__ = 100;

const __TYPES__ = ["string", "sentence", "number", "euro"];

function getRandomValue(type, i) {
  switch (type) {
    case "sentence":
      return getSentence();
    case "string":
      return `${i + 1} - ${getRandomWord()}`;
    case "number":
      return randomInt(10000);
    case "euro":
      return randomInt(1000);
    default:
      return 0;
  }
}

function generate(nbCols, nbRows) {
  const header = new Array(nbCols).fill(null).map(function (_, i) {
    return {
      path: `column${i + 1}`,
      width: __MIN_WIDTH__ + randomInt(100),
      label: `column${i + 1}`,
      type: __TYPES__[randomInt(__TYPES__.length)],
      resizable: true,
    };
  });
  const rows = new Array(nbRows).fill(null).map(function (_, i) {
    return header.reduce(
      function (a, { path, type }, j) {
        return {
          ...a,
          [path]: {
            type,
            value: getRandomValue(type, i),
          },
        };
      },
      { __height: 30 + randomInt(60) }
    );
  });
  return { header, rows };
}

export default generate;
