import { spinlockGenerator, runner } from "../17";

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
});
