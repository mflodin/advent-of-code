import { spin, exchange, partner, parseMove, parseMoves, dance } from "../16";

describe("spin", () => {
  it("should move the last n programs to the front", () => {
    expect(spin({ line: "abcde", n: 3 })).toBe("cdeab");
    expect(spin({ line: "abcde", n: 1 })).toBe("eabcd");
  });
});
describe("exchange", () => {
  it("should swap the programs by position", () => {
    expect(exchange({ line: "abcde", a: 3, b: 4 })).toBe("abced");
    expect(exchange({ line: "abcde", a: 1, b: 0 })).toBe("bacde");
  });
});
describe("partner", () => {
  it("should swap the partners by name", () => {
    expect(partner({ line: "abcde", a: "a", b: "d" })).toBe("dbcae");
    expect(partner({ line: "abcde", a: "c", b: "e" })).toBe("abedc");
  });
});

describe("parseMove", () => {
  it("should parse moves correctly", () => {
    expect(parseMove("s11")).toEqual({ move: spin, n: 11 });
    expect(parseMove("x33/45")).toEqual({ move: exchange, a: 33, b: 45 });
    expect(parseMove("pe/b")).toEqual({ move: partner, a: "e", b: "b" });
  });
});

describe("parseMoves", () => {
  it("should parse all the moves in the input", () => {
    const input = "s1,x3/4,pe/b\n";
    const moves = parseMoves(input);
    expect(moves[0]).toEqual({ move: spin, n: 1 });
    expect(moves[1]).toEqual({ move: exchange, a: 3, b: 4 });
    expect(moves[2]).toEqual({ move: partner, a: "e", b: "b" });
  });
});

describe("dance", () => {
  it("should perform all the moves in the input", () => {
    const input = "s1,x3/4,pe/b\n";
    expect(dance({ moves: parseMoves(input), line: "abcde" })).toBe("baedc");
  });
});
