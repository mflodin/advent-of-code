import { Hasher, runner } from "../10";
import {
  toBinary,
  toGrid,
  toNodeGrid,
  squareCounter,
  regionCounter,
  Cell,
  visitAdjecent
} from "../14";

const input = "flqrgnkx";

describe("toBinary", () => {
  it("should turn a0c2017 into 1010000011000010000000010111", () => {
    expect(toBinary("a0c2017")).toBe("1010000011000010000000010111");
  });
});

describe("hashrows", () => {
  it("should turn " + input + "-0 into 11010100", () => {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: input + "-0"
    });

    expect(toBinary(knotHash).slice(0, 8)).toBe("11010100");
  });

  it("should turn " + input + "-1 into 01010101", () => {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: input + "-1"
    });

    expect(toBinary(knotHash).slice(0, 8)).toBe("01010101");
  });

  it("should turn " + input + "-2 into 00001010", () => {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: input + "-2"
    });

    expect(toBinary(knotHash).slice(0, 8)).toBe("00001010");
  });

  it("should turn " + input + "-3 into 10101101", () => {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: input + "-3"
    });

    expect(toBinary(knotHash).slice(0, 8)).toBe("10101101");
  });

  it("should turn " + input + "-4 into 01101000", () => {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: input + "-4"
    });

    expect(toBinary(knotHash).slice(0, 8)).toBe("01101000");
  });

  it("should turn " + input + "-5 into 11001001", () => {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: input + "-5"
    });

    expect(toBinary(knotHash).slice(0, 8)).toBe("11001001");
  });

  it("should turn " + input + "-6 into 01000100", () => {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: input + "-6"
    });

    expect(toBinary(knotHash).slice(0, 8)).toBe("01000100");
  });

  it("should turn " + input + "-7 into 11010110", () => {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: input + "-7"
    });

    expect(toBinary(knotHash).slice(0, 8)).toBe("11010110");
  });
});

xdescribe("toGrid", () => {
  it("should create a grid with 128 rows", () => {
    expect(toGrid(input).length).toBe(128);
  });
  it("should create a grid where each row has length 128", () => {
    toGrid(input).forEach(row => {
      expect(row.length).toBe(128);
    });
  });
});

describe("squareCounter", () => {
  it("should count all the used squares in the grid", () => {
    const grid = [
      "11010100",
      "01010101",
      "00001010",
      "10101101",
      "01101000",
      "11001001",
      "01000100",
      "11010110"
    ];
    expect(squareCounter(grid)).toBe(29);
  });

  it("should count all the used squares in the full grid", () => {
    const grid = toGrid(input);
    // console.log(grid);
    expect(squareCounter([grid[0]])).toBe(74);
    expect(squareCounter([grid[1]])).toBe(72);
    expect(squareCounter([grid[127]])).toBe(62);
    expect(squareCounter(grid)).toBe(8108);
  });
});

describe("regionCounter", () => {
  it("should count all the regions in the grid", () => {
    const grid = [
      "11010100",
      "01010101",
      "00001010",
      "10101101",
      "01101000",
      "11001001",
      "01000100",
      "11010110"
    ];
    expect(regionCounter(grid)).toBe(12);
  });
  it("should count all the regions in the full grid", () => {
    const grid = toGrid(input);
    // console.log(grid);
    expect(regionCounter(grid)).toBe(1242);
  });
});

describe("visitAdjecent", () => {
  it("should visit all adjecent cells", () => {
    const grid = toNodeGrid(["1101", "0111", "1000", "1010"]);

    visitAdjecent(grid[0][1], grid);

    expect(grid[0][0].visited).toBe(true, "[0][0]");
    expect(grid[0][1].visited).toBe(true, "[0][1]");
    expect(grid[0][2].visited).toBe(false, "[0][2]");
    expect(grid[0][3].visited).toBe(true, "[0][3]");

    expect(grid[1][0].visited).toBe(false, "[1][0]");
    expect(grid[1][1].visited).toBe(true, "[1][1]");
    expect(grid[1][2].visited).toBe(true, "[1][2]");
    expect(grid[1][3].visited).toBe(true, "[1][3]");

    expect(grid[2][0].visited).toBe(false, "[2][0]");
    expect(grid[2][1].visited).toBe(false, "[2][1]");
    expect(grid[2][2].visited).toBe(false, "[2][2]");
    expect(grid[2][3].visited).toBe(false, "[2][3]");

    expect(grid[3][0].visited).toBe(false, "[3][0]");
    expect(grid[3][1].visited).toBe(false, "[3][1]");
    expect(grid[3][2].visited).toBe(false, "[3][2]");
    expect(grid[3][3].visited).toBe(false, "[3][3]");
  });
});
