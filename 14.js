import { Hasher, runner } from "./10";

export function toBinary(hex) {
  return hex
    .split("")
    .map(c => ("0000" + parseInt(c, 16).toString(2)).slice(-4))
    .join("");
}

export function toGrid(input) {
  let rows = [];
  for (let i = 0; i < 128; i++) {
    const knotHash = runner({
      hasher: new Hasher(),
      string: input + "-" + i
    });
    rows.push(toBinary(knotHash));
  }

  return rows;
}

export function squareCounter(grid) {
  return grid
    .join("")
    .split("")
    .filter(d => d === "1").length;
}
