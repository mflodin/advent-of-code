import { getStartPosition, mazerunner, parse } from "../19";
import { read } from "../utils";

const input = [
  "     |          ",
  "     |  +--+    ",
  "     A  |  C    ",
  " F---|----E|--+ ",
  "     |  |  |  D ",
  "     +B-+  +--+ ",
  ""
].join("\n");

describe("getStartPosition", () => {
  it("should return the x,y coords for the starting point", () => {
    const maze = [[" ", " ", "|", " "], [" ", "-", "+", " "]];
    expect(getStartPosition(maze)).toEqual({ x: 2, y: 0 });
  });
});

describe("parse", () => {
  it("should parse the input into a maze", () => {
    debugger;
    const maze = parse(input);
    expect(maze).toEqual([
      "     |          ",
      "     |  +--+    ",
      "     A  |  C    ",
      " F---|----E|--+ ",
      "     |  |  |  D ",
      "     +B-+  +--+ "
    ]);
  });
});

describe("mazerunner", () => {
  it("should run through the entire maze and keep track of all letters it finds", () => {
    expect(mazerunner(input)).toBe("ABCDEF");
  });
});
