export function parseMoves(input) {
  return input
    .replace("\n", "")
    .split(",")
    .map(parseMove);
}

export function dance({ moves, line }) {
  let newLine = line;
  moves.forEach(({ move, n, a, b }) => {
    newLine = move({ line: newLine, a, b, n });
  });
  return newLine;
}

export function spin({ n, line }) {
  return line.slice(-n) + line.slice(0, line.length - n);
}

export function exchange({ a, b, line }) {
  let arr = line.split("");
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
  return arr.join("");
}

export function partner({ a, b, line }) {
  return exchange({ line, a: line.indexOf(a), b: line.indexOf(b) });
}

export function parseMove(text) {
  switch (text[0]) {
    case "s":
      return {
        move: spin,
        n: Number(text.substr(1))
      };
    case "x": {
      const [a, b] = text
        .substr(1)
        .split("/")
        .map(n => Number(n));
      return {
        move: exchange,
        a,
        b
      };
    }
    case "p": {
      const [a, b] = text.substr(1).split("/");
      return {
        move: partner,
        a,
        b
      };
    }
    default:
      throw Error("unknown move " + text);
  }
}
