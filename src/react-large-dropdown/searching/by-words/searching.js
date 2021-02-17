import tokenizer from "string-tokenizer";
import removeAccents from "remove-accents";
import prepare from "./prepare-string-indexation";

function indexKeys(index) {
  return Object.keys(index);
}

function match(tokens, key) {
  return tokens.reduce(function (state, token) {
    return state || key.startsWith(token);
  }, false);
}

function searching(search, items, index) {
  const { string } = tokenizer()
    .input(removeAccents(`${search}`).toLowerCase())
    .tokens({ string: /[\w]+/ })
    .resolve();
  if (string) {
    const tokens = Array.isArray(string) ? string : [string];

    if (index && tokens && tokens.length) {
      const candidats = indexKeys(index).reduce(function (keys, key) {
        if (match(tokens, key)) {
          return [...keys, key];
        }
        return keys;
      }, []);
      const propositions = candidats.reduce(function (a, key) {
        return [...a, ...index[key]];
      }, []);
      return propositions;
    }
  }
  return items;
}

export default searching;
