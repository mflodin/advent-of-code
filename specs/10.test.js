import {
  generateList,
  Hasher,
  toArray,
  fromAscii,
  padLengths,
  xor,
  runner
} from "../10";

const lengths = [3, 4, 1, 5];

describe("fromAscii", function() {
  it("should generate an array of lengths from each character of a string", function() {
    expect(fromAscii("1,2,3")).toEqual([49, 44, 50, 44, 51]);
  });
});

describe("padLengths", function() {
  it("should pad an array of lengths with the numbers [17, 31, 73, 47, 23]", function() {
    expect(padLengths([1, 2])).toEqual([1, 2, 17, 31, 73, 47, 23]);
  });
});

describe("xor", function() {
  it("should perform bitwise xor on 16 values", function() {
    expect(xor([65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22])).toBe(
      64
    );
  });
});

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

describe("runner", function() {
  it("should produce the answer to the first round", function() {
    const hasher = new Hasher(generateList(256));
    const knotHash = runner({
      hasher,
      lengths: toArray("63,144,180,149,1,255,167,84,125,65,188,0,2,254,229,24"),
      rounds: 1
    });
    const [a, b] = hasher.list;
    expect(a * b).toBe(4480);
  });

  it("The empty string becomes a2582a3a0e66e6e86e3812dcb672a272", function() {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: ""
    });
    expect(knotHash).toBe("a2582a3a0e66e6e86e3812dcb672a272");
  });

  it("AoC 2017 becomes 33efeb34ea91902bb2f59c9920caa6cd", function() {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: "AoC 2017"
    });
    expect(knotHash).toBe("33efeb34ea91902bb2f59c9920caa6cd");
  });

  it("1,2,3 becomes 3efbe78a8d82f29979031a4aa0b16a9d", function() {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: "1,2,3"
    });
    expect(knotHash).toBe("3efbe78a8d82f29979031a4aa0b16a9d");
  });

  it("1,2,4 becomes 63960835bcdc130f0b66d7ff4f6a5a8e", function() {
    const hasher = new Hasher();
    const knotHash = runner({
      hasher,
      string: "1,2,4"
    });
    expect(knotHash).toBe("63960835bcdc130f0b66d7ff4f6a5a8e");
  });
});
