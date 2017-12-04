import { spiral, distance } from "../3";
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
