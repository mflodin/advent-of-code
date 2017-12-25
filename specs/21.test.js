import { generateRuleMap, Fractal, countPixels } from "../21";

const seed = ".#./..#/###";

const input = `../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`;

describe("generateRuleMap", () => {
  it("should generate a rule map from the input", () => {
    const map = generateRuleMap(input);

    expect(map["../.#"]).toBe("##./#../...");
    expect(map[".#./..#/###"]).toBe("#..#/..../..../#..#");
  });
  it("should generate the rotated rules too", () => {
    const map = generateRuleMap(input);

    expect(map["../#."]).toBe("##./#../...");
    expect(map[".#/.."]).toBe("##./#../...");
    expect(map["#./.."]).toBe("##./#../...");
    expect(map[".#./..#/###"]).toBe("#..#/..../..../#..#");
    expect(map["#../#.#/##."]).toBe("#..#/..../..../#..#");
    expect(map["###/#../.#."]).toBe("#..#/..../..../#..#");
    expect(map[".##/#.#/..#"]).toBe("#..#/..../..../#..#");
    expect(map[".#./#../###"]).toBe("#..#/..../..../#..#");
    expect(map["##./#.#/#.."]).toBe("#..#/..../..../#..#");
    expect(map["###/..#/.#."]).toBe("#..#/..../..../#..#");
    expect(map["..#/#.#/.##"]).toBe("#..#/..../..../#..#");
  });
});

describe("Fractal", () => {
  it("should start out with the state from the seed", () => {
    const fractal = new Fractal({ seed });
    expect(fractal.state).toEqual([
      [".", "#", "."],
      [".", ".", "#"],
      ["#", "#", "#"]
    ]);
  });

  it("should expand to a 4x4 grid on the first tick", () => {
    const fractal = new Fractal({ seed, ruleMap: generateRuleMap(input) });
    fractal.tick();
    expect(fractal.state).toEqual([
      ["#", ".", ".", "#"],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      ["#", ".", ".", "#"]
    ]);
  });

  it("should expand to a 6x6 grid on the second tick", () => {
    const fractal = new Fractal({ seed, ruleMap: generateRuleMap(input) });
    fractal.tick();
    fractal.tick();
    expect(fractal.state).toEqual([
      ["#", "#", ".", "#", "#", "."],
      ["#", ".", ".", "#", ".", "."],
      [".", ".", ".", ".", ".", "."],
      ["#", "#", ".", "#", "#", "."],
      ["#", ".", ".", "#", ".", "."],
      [".", ".", ".", ".", ".", "."]
    ]);
  });
});

describe("countPixels", () => {
  it("should count the pixels in the grid", () => {
    const threeByThree = [[".", "#", "."], [".", ".", "#"], ["#", "#", "#"]];
    expect(countPixels(threeByThree)).toBe(5);
    const fourByFour = [
      ["#", ".", ".", "#"],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      ["#", ".", ".", "#"]
    ];
    expect(countPixels(fourByFour)).toBe(4);
    const sixBySix = [
      ["#", "#", ".", "#", "#", "."],
      ["#", ".", ".", "#", ".", "."],
      [".", ".", ".", ".", ".", "."],
      ["#", "#", ".", "#", "#", "."],
      ["#", ".", ".", "#", ".", "."],
      [".", ".", ".", ".", ".", "."]
    ];
    expect(countPixels(sixBySix)).toBe(12);
  });
});
