import { generateList, Hasher, toArray } from "../10";

const lengths = [3, 4, 1, 5];

describe("toArray", function() {
  it("should generate an array of lengths from a string", function() {
    expect(toArray("3,4,1,5\n")).toEqual(lengths);
  });
});

describe("generateList", function() {
  it("should generate a list of sequential numbers from 0 of length n", function() {
    expect(generateList(5)).toEqual([0, 1, 2, 3, 4]);
  });
});

describe("Hasher", function() {
  it("should start at position 0", function() {
    const hasher = new Hasher();
    expect(hasher.position).toBe(0);
  });
  it("should start with a skip size of 0", function() {
    const hasher = new Hasher();
    expect(hasher.skipSize).toBe(0);
  });
  it("a length of 0 should not affect the list", function() {
    const list = generateList(5);
    const hasher = new Hasher(list);
    hasher.hash(0);
    expect(hasher.list).toEqual(list);
    expect(hasher.position).toBe(0);
    expect(hasher.skipSize).toBe(1);
  });
  it("a length of 1 should not affect the list", function() {
    const list = generateList(5);
    const hasher = new Hasher(list);
    hasher.hash(1);
    expect(hasher.list).toEqual(list);
    expect(hasher.position).toBe(1);
    expect(hasher.skipSize).toBe(1);
  });
  it("should reverse a subsequence of the list of the length supplied to the hash function", function() {
    const hasher = new Hasher(generateList(5));
    hasher.hash(lengths[0]);
    expect(hasher.list).toEqual([2, 1, 0, 3, 4]);
    expect(hasher.position).toBe(3);
    expect(hasher.skipSize).toBe(1);

    hasher.hash(lengths[1]);
    expect(hasher.list).toEqual([4, 3, 0, 1, 2]);
    expect(hasher.position).toBe(3);
    expect(hasher.skipSize).toBe(2);

    hasher.hash(lengths[2]);
    expect(hasher.list).toEqual([4, 3, 0, 1, 2]);
    expect(hasher.position).toBe(1);
    expect(hasher.skipSize).toBe(3);

    hasher.hash(lengths[3]);
    expect(hasher.list).toEqual([3, 4, 2, 1, 0]);
    expect(hasher.position).toBe(4);
    expect(hasher.skipSize).toBe(4);
  });
});
