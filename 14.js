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

export function Cell(value, x, y) {
  this.used = value === "1";
  this.visited = false;
  this.y = y;
  this.x = x;
}

export function toNodeGrid(grid) {
  // const rows = toGrid(input);
  let g = grid.map((row, i) => {
    return row.split("").map((cell, j) => new Cell(cell, j, i));
  });

  g.get = (x, y) => {
    return (g[y] && g[y][x]) || undefined;
  };

  return g;
}

export function squareCounter(grid) {
  return grid
    .join("")
    .split("")
    .filter(d => d === "1").length;
}

export function regionCounter(grid) {
  let regionCount = 0;
  const nodeGrid = toNodeGrid(grid);

  nodeGrid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell.visited) {
        return;
      }

      cell.visited = true;
      if (!cell.used) {
        return;
      }

      regionCount += 1;
      cell.region = regionCount;

      visitAdjecent(cell, nodeGrid);
    });
  });

  return regionCount;
}

export function visitAdjecent(cell, grid) {
  const { x, y, region } = cell;
  cell.visited = true;
  const toTheRight = grid.get(x + 1, y);
  if (toTheRight && toTheRight.used && !toTheRight.visited) {
    visitAdjecent(toTheRight, grid);
  }
  const below = grid.get(x, y + 1);
  if (below && below.used && !below.visited) {
    visitAdjecent(below, grid);
  }
  const toTheLeft = grid.get(x - 1, y);
  if (toTheLeft && toTheLeft.used && !toTheLeft.visited) {
    visitAdjecent(toTheLeft, grid);
  }
  const above = grid.get(x, y - 1);
  if (above && above.used && !above.visited) {
    visitAdjecent(above, grid);
  }
}
