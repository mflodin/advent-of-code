import { judge, generator, toBinary, matches } from "../15";

describe("generator", () => {
  it("should produce the correct sequence for seed 65", () => {
    let gen = generator({ seed: 65, factor: 16807 });
    expect(gen.next().value).toBe(1092455);
    expect(gen.next().value).toBe(1181022009);
    expect(gen.next().value).toBe(245556042);
    expect(gen.next().value).toBe(1744312007);
    expect(gen.next().value).toBe(1352636452);
  });

  it("should produce the correct sequence for seed 8921", () => {
    let gen = generator({ seed: 8921, factor: 48271 });
    expect(gen.next().value).toBe(430625591);
    expect(gen.next().value).toBe(1233683848);
    expect(gen.next().value).toBe(1431495498);
    expect(gen.next().value).toBe(137874439);
    expect(gen.next().value).toBe(285222916);
  });

  it("should produce the correct sequence for seed 65 with multiples of 4", () => {
    let gen = generator({ seed: 65, factor: 16807, multiple: 4 });
    expect(gen.next().value).toBe(1352636452);
    expect(gen.next().value).toBe(1992081072);
    expect(gen.next().value).toBe(530830436);
    expect(gen.next().value).toBe(1980017072);
    expect(gen.next().value).toBe(740335192);
  });

  it("should produce the correct sequence for seed 8921 with multiples of 8", () => {
    let gen = generator({ seed: 8921, factor: 48271, multiple: 8 });
    expect(gen.next().value).toBe(1233683848);
    expect(gen.next().value).toBe(862516352);
    expect(gen.next().value).toBe(1159784568);
    expect(gen.next().value).toBe(1616057672);
    expect(gen.next().value).toBe(412269392);
  });
});

describe("toBinary", () => {
  it("should convert decimal to binary string", () => {
    expect(toBinary(1092455)).toBe("00000000000100001010101101100111");
    expect(toBinary(1181022009)).toBe("01000110011001001111011100111001");
    expect(toBinary(245556042)).toBe("00001110101000101110001101001010");
    expect(toBinary(1744312007)).toBe("01100111111110000001011011000111");
    expect(toBinary(1352636452)).toBe("01010000100111111001100000100100");
    expect(toBinary(430625591)).toBe("00011001101010101101001100110111");
    expect(toBinary(1233683848)).toBe("01001001100010001000010110001000");
    expect(toBinary(1431495498)).toBe("01010101010100101110001101001010");
    expect(toBinary(137874439)).toBe("00001000001101111100110000000111");
    expect(toBinary(285222916)).toBe("00010001000000000010100000000100");
  });
});

describe("judge", () => {
  it("should count the matches", () => {
    const a = generator({ seed: 65, factor: 16807 });
    const b = generator({ seed: 8921, factor: 48271 });
    const rounds = 5;
    const matches = judge({ a, b, rounds });
    expect(matches).toBe(1);
  });
  it("should count the matches with new criteria", () => {
    const a = generator({ seed: 65, factor: 16807, multiple: 4 });
    const b = generator({ seed: 8921, factor: 48271, multiple: 8 });
    const rounds = 1056;
    const matches = judge({ a, b, rounds });
    expect(matches).toBe(1);
  });
});

describe("matches", () => {
  it("should match the lowest 16 bits", () => {
    expect(matches(1092455, 430625591)).toBe(false);
    expect(matches(1181022009, 1233683848)).toBe(false);
    expect(matches(245556042, 1431495498)).toBe(true);
    expect(matches(1744312007, 137874439)).toBe(false);
    expect(matches(1352636452, 285222916)).toBe(false);
  });
});
