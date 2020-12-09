const WORDS = [
  "sed",
  "ut",
  "perspiciatis",
  "unde",
  "omnis",
  "iste",
  "natus",
  "error",
  "sit",
  "voluptatem",
  "accusantium",
  "doloremque",
  "laudantium",
  "totam",
  "rem",
  "aperiam",
  "eaque",
  "ipsa",
  "quae",
  "ab",
  "illo",
  "inventore",
  "veritatis",
  "et",
  "quasi",
  "architecto",
  "beatae",
  "vitae",
  "dicta",
  "sunt",
  "explicabo",
];

export function getRandomWord() {
  return WORDS[randomInt(WORDS.length)];
}

export function randomInt(length) {
  return Math.trunc(Math.random() * length);
}

export function getSentence(sentence = "", current) {
  const next =
    randomInt(WORDS.length / 2) + current || randomInt(WORDS.length / 2);
  if (next < WORDS.length - 1) {
    return getSentence(`${sentence} ${WORDS[next]}`, next);
  }
  return sentence;
}

function getRandomText(n, m) {
  return new Array(n)
    .fill(null)
    .map(function (_) {
      return new Array(m).fill(null).reduce(function (p) {
        return `${getSentence().trim()}. ${p}`;
      }, `\r\n`);
    })
    .join();
}

export default getRandomText;
