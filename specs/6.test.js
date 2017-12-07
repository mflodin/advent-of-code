import { Defragger, toArray, findLargest, runner } from "../6";

describe("toArray", () => {
  it("should turn a string of number into an array", () => {
    expect(toArray("1 2  4\t6\n")).toEqual([1, 2, 4, 6]);
  });
});

describe("findLargest", () => {
  it("should return the index of the largest number in the array", () => {
    expect(findLargest([4, 2, 6, 9, 2, 4])).toEqual(3);
  });
  it("should return the index of the leftmost largest number in the array", () => {
    expect(findLargest([3, 1, 2, 3])).toEqual(0);
  });
});

describe("Defragger", () => {
  let array;

  beforeEach(() => {
    array = [0, 2, 7, 0];
  });
  it("should redistribute the largest bank first", () => {
    const defragger = new Defragger(array);
    defragger.defrag();

    expect(defragger.memory).toEqual([2, 4, 1, 2]);
    expect(defragger.steps).toBe(1);
  });
  it("should redistribute the second bank after that", () => {
    const defragger = new Defragger(array);
    defragger.defrag();
    defragger.defrag();

    expect(defragger.memory).toEqual([3, 1, 2, 3]);
    expect(defragger.steps).toBe(2);
  });
  it("should redistribute the second bank after that", () => {
    const defragger = new Defragger(array);
    defragger.defrag();
    defragger.defrag();
    defragger.defrag();

    expect(defragger.memory).toEqual([0, 2, 3, 4]);
    expect(defragger.steps).toBe(3);
  });
  it("should redistribute the second bank after that", () => {
    const defragger = new Defragger(array);
    defragger.defrag();
    defragger.defrag();
    defragger.defrag();
    defragger.defrag();

    expect(defragger.memory).toEqual([1, 3, 4, 1]);
    expect(defragger.steps).toBe(4);
  });
  it("should redistribute the second bank after that", () => {
    const defragger = new Defragger(array);
    defragger.defrag();
    defragger.defrag();
    defragger.defrag();
    defragger.defrag();
    defragger.defrag();

    expect(defragger.memory).toEqual([2, 4, 1, 2]);
    expect(defragger.steps).toBe(5);
  });
});

describe("runner", () => {
  it("should run defragger until it reaches a state it has seen before", () => {
    const result = runner(new Defragger([0, 2, 7, 0]));
    expect(result.steps).toBe(5);
    expect(result.memory).toEqual([2, 4, 1, 2]);
  });
  it("should say how big the loop is", () => {
    const result = runner(new Defragger([0, 2, 7, 0]));
    expect(result.loopSize).toBe(4);
  });
});
