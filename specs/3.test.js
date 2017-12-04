import { spiral, distance, sum } from "../3";
describe("spiral", () => {
  it("should return a correct spiral for 4", () => {
    let aSpiral = [];
    aSpiral[1] = [4, 3];
    aSpiral[0] = [1, 2];
    expect(spiral(4).res).toEqual(aSpiral);
  });

  it("should return a correct spiral for 10", () => {
    let aSpiral = [];
    aSpiral[1] = [4, 3];
    aSpiral[1][-1] = 5;
    aSpiral[0] = [1, 2];
    aSpiral[0][-1] = 6;
    aSpiral[-1] = [8, 9, 10];
    aSpiral[-1][-1] = 7;
    expect(spiral(10).res).toEqual(aSpiral);
  });

  it("should return a correct spiral for 25", () => {
    let aSpiral = [];
    aSpiral[2] = [15, 14, 13];
    aSpiral[2][-1] = 16;
    aSpiral[2][-2] = 17;
    aSpiral[1] = [4, 3, 12];
    aSpiral[1][-1] = 5;
    aSpiral[1][-2] = 18;
    aSpiral[0] = [1, 2, 11];
    aSpiral[0][-1] = 6;
    aSpiral[0][-2] = 19;
    aSpiral[-1] = [8, 9, 10];
    aSpiral[-1][-1] = 7;
    aSpiral[-1][-2] = 20;
    aSpiral[-2] = [23, 24, 25];
    aSpiral[-2][-1] = 22;
    aSpiral[-2][-2] = 21;
    expect(spiral(25).res).toEqual(aSpiral);
  });
});

describe("distance", () => {
  it("should return 0 for 1", () => {
    expect(distance(1)).toBe(0);
  });
  it("should return 3 for 12", () => {
    expect(distance(12)).toBe(3);
  });
  it("should return 2 for 23", () => {
    expect(distance(23)).toBe(2);
  });
  it("should return 31 for 1024", () => {
    expect(distance(1024)).toBe(31);
  });
});

describe("sum", () => {
  it("should return 1 for 1", () => {
    expect(sum(1)).toBe(1);
  });
  it("should return 1 for 2", () => {
    expect(sum(2)).toBe(1);
  });
  it("should return 2 for 23", () => {
    expect(sum(3)).toBe(2);
  });
  it("should return 4 for 4", () => {
    expect(sum(4)).toBe(4);
  });
  it("should return 5 for 5", () => {
    expect(sum(5)).toBe(5);
  });
  it("should return 10 for 6", () => {
    expect(sum(6)).toBe(10);
  });
  it("should return 11 for 7", () => {
    expect(sum(7)).toBe(11);
  });
  it("should return 147 for 17", () => {
    expect(sum(17)).toBe(147);
  });
  it("should return 806 for 23", () => {
    expect(sum(23)).toBe(806);
  });
});
