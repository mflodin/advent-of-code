import { spinlockGenerator, runner, fastRunner, calculateIndex } from "../17";

const steps = 3;

describe("spinlockGenerator", () => {
  it("should step forward n times and insert the next value", () => {
    const spinlock = spinlockGenerator(steps);
    expect(spinlock.next().value).toEqual([0, 1]);
    expect(spinlock.next().value).toEqual([0, 2, 1]);
    expect(spinlock.next().value).toEqual([0, 2, 3, 1]);
    expect(spinlock.next().value).toEqual([0, 2, 4, 3, 1]);
    expect(spinlock.next().value).toEqual([0, 5, 2, 4, 3, 1]);
    expect(spinlock.next().value).toEqual([0, 5, 2, 4, 3, 6, 1]);
    expect(spinlock.next().value).toEqual([0, 5, 7, 2, 4, 3, 6, 1]);
    expect(spinlock.next().value).toEqual([0, 5, 7, 2, 4, 3, 8, 6, 1]);
    expect(spinlock.next().value).toEqual([0, 9, 5, 7, 2, 4, 3, 8, 6, 1]);
  });
});

describe("runner", () => {
  it("should find the value directly after the last inserted value", () => {
    const value = runner({
      spinlock: spinlockGenerator(steps),
      iterations: 2017
    });
    expect(value).toBe(638);
  });

  it("should find the value directly after provided findNextTo (2017 iterations)", () => {
    const value = runner({
      spinlock: spinlockGenerator(steps),
      iterations: 2017,
      findNextTo: 0
    });
    expect(value).toBe(1226);
  });

  it("should find the value directly after provided findNextTo (9 iterations)", () => {
    const value = runner({
      spinlock: spinlockGenerator(steps),
      iterations: 9,
      findNextTo: 0
    });
    expect(value).toBe(9);
  });
});

describe("fastRunner", () => {
  it("should find the value directly after 0 (2017 iterations)", () => {
    const value = fastRunner({
      stepSize: steps,
      iterations: 2017
    });
    expect(value).toBe(1226);
  });

  it("should find the value directly after 0 (9 iterations)", () => {
    const value = fastRunner({
      stepSize: steps,
      iterations: 9,
      findNextTo: 0
    });
    expect(value).toBe(9);
  });
});
