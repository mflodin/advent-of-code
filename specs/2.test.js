import { min, max, diff, checksum } from "../2";

const table = `5 1 9 5
7 5 3
2 4 6 8`;

describe("min", () => {
  it("should return the smallest value", () => {
    expect(min([1, 2, 3, 4])).toBe(1);
    expect(min([1, 2, 0, 4])).toBe(0);
  });
});

describe("max", () => {
  it("should return the smallest value", () => {
    expect(max([1, 2, 3, 4])).toBe(4);
    expect(max([1, 8, 0, 4])).toBe(8);
  });
});

describe("Part one", function() {
  it("should return 8 for row 1", function() {
    expect(diff(table.split("\n")[0])).toBe(8);
  });

  it("should return 4 for 123425", function() {
    expect(diff(table.split("\n")[1])).toBe(4);
  });

  it("should return 12 for 123123", function() {
    expect(diff(table.split("\n")[2])).toBe(6);
  });

  it("should return 18 for the table", function() {
    expect(checksum(table)).toBe(18);
  });
});
