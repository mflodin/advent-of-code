import { lineParser, inputParser, connectionWalker } from "../12";
//
const input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

describe("lineParser", () => {
  it("should parse a line into a node and its connections", () => {
    let line = lineParser("0 <-> 2");
    expect(line.id).toBe(0);
    expect(line.connections).toEqual([2]);

    line = lineParser("1 <-> 1");
    expect(line.id).toBe(1);
    expect(line.connections).toEqual([1]);

    line = lineParser("2 <-> 0, 3, 4");
    expect(line.id).toBe(2);
    expect(line.connections).toEqual([0, 3, 4]);

    line = lineParser("3 <-> 2, 4");
    expect(line.id).toBe(3);
    expect(line.connections).toEqual([2, 4]);

    line = lineParser("4 <-> 2, 3, 6");
    expect(line.id).toBe(4);
    expect(line.connections).toEqual([2, 3, 6]);

    line = lineParser("5 <-> 6");
    expect(line.id).toBe(5);
    expect(line.connections).toEqual([6]);

    line = lineParser("6 <-> 4, 5");
    expect(line.id).toBe(6);
    expect(line.connections).toEqual([4, 5]);
  });
});

describe("inputParser", () => {
  it("should create pipes for each line of the input", () => {
    const pipes = inputParser(input);
    expect(pipes.length).toBe(7);
    expect(pipes[4].id).toBe(4);
    expect(pipes[4].connections).toEqual([2, 3, 6]);
  });
});

describe("connectionWalker", () => {
  it("should visit all connections of the starting node 0", () => {
    const connections = connectionWalker(inputParser(input), 0);
    expect(connections).toEqual([0, 2, 3, 4, 5, 6]);
  });

  it("should visit all connections of the starting node 1", () => {
    const connections = connectionWalker(inputParser(input), 1);
    expect(connections).toEqual([1]);
  });
});
