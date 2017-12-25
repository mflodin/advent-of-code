import { Virus, parseMap } from "../22";

const startingMap = `..#
#..
...
`;

describe("Virus", () => {
  it("should start facing up", () => {
    const virus = new Virus();

    expect(virus.direction).toBe("up");
  });

  it("should be able to turn left", () => {
    const virus = new Virus();
    virus.turnLeft();
    expect(virus.direction).toBe("left");
    virus.turnLeft();
    expect(virus.direction).toBe("down");
    virus.turnLeft();
    expect(virus.direction).toBe("right");
    virus.turnLeft();
    expect(virus.direction).toBe("up");
  });

  it("should be able to turn right", () => {
    const virus = new Virus();
    virus.turnRight();
    expect(virus.direction).toBe("right");
    virus.turnRight();
    expect(virus.direction).toBe("down");
    virus.turnRight();
    expect(virus.direction).toBe("left");
    virus.turnRight();
    expect(virus.direction).toBe("up");
  });

  it("should start in the middle of the map", () => {
    const virus = new Virus({ map: startingMap });
    expect(virus.position).toEqual({ x: 1, y: 1 });
  });

  it("should move one step in the current direction", () => {
    const virus = new Virus({ map: startingMap });
    virus.move();
    expect(virus.position).toEqual({ x: 1, y: 0 });
    virus.turnLeft();
    virus.move();
    expect(virus.position).toEqual({ x: 0, y: 0 });
    virus.turnLeft();
    virus.move();
    virus.move();
    expect(virus.position).toEqual({ x: 0, y: 2 });
    virus.turnLeft();
    virus.move();
    virus.move();
    expect(virus.position).toEqual({ x: 2, y: 2 });
  });

  it("should expand the map if it walks over the top edge", () => {
    const virus = new Virus({ map: startingMap });
    virus.move();
    virus.move();
    expect(virus.position).toEqual({ x: 1, y: 0 });
    expect(virus.map.length).toBe(4);
    expect(virus.map[0].length).toBe(3);
    expect(virus.map[0]).toEqual([".", ".", "."]);
  });

  it("should expand the map if it walks over the bottom edge", () => {
    const virus = new Virus({ map: startingMap });
    virus.turnLeft();
    virus.turnLeft();
    virus.move();
    virus.move();
    expect(virus.position).toEqual({ x: 1, y: 3 });
    expect(virus.map.length).toBe(4);
    expect(virus.map[0].length).toBe(3);
    expect(virus.map[3]).toEqual([".", ".", "."]);
  });

  it("should expand the map if it walks over the left edge", () => {
    const virus = new Virus({ map: startingMap });
    virus.turnLeft();
    virus.move();
    virus.move();
    expect(virus.position).toEqual({ x: 0, y: 1 });
    expect(virus.map.length).toBe(3);
    expect(virus.map[0].length).toBe(4);
    expect(virus.map[0][0]).toEqual(".");
    expect(virus.map[1][0]).toEqual(".");
    expect(virus.map[2][0]).toEqual(".");
  });

  it("should expand the map if it walks over the right edge", () => {
    const virus = new Virus({ map: startingMap });
    virus.turnRight();
    virus.move();
    virus.move();
    expect(virus.position).toEqual({ x: 3, y: 1 });
    expect(virus.map.length).toBe(3);
    expect(virus.map[0].length).toBe(4);
    expect(virus.map[0][3]).toEqual(".");
    expect(virus.map[1][3]).toEqual(".");
    expect(virus.map[2][3]).toEqual(".");
  });

  it("should be able to toggle infection on and off", () => {
    const virus = new Virus({ map: startingMap });
    virus.toggle();
    expect(virus.map[1][1]).toBe("#");
    virus.toggle();
    expect(virus.map[1][1]).toBe(".");
  });

  it("should work correctly", () => {
    const virus = new Virus({ map: startingMap });

    virus.work();
    expect(virus.map).toEqual(parseMap(`..#\n##.\n...`));
    expect(virus.position).toEqual({ x: 0, y: 1 });

    virus.work();
    expect(virus.map).toEqual(parseMap(`..#\n.#.\n...`));
    expect(virus.position).toEqual({ x: 0, y: 0 });

    virus.work();
    virus.work();
    virus.work();
    virus.work();
    expect(virus.map).toEqual(parseMap(`##.#\n###.\n....`));
    expect(virus.position).toEqual({ x: 1, y: 0 });

    virus.work();
    expect(virus.map).toEqual(parseMap(`#..#\n###.\n....`));
    expect(virus.position).toEqual({ x: 2, y: 0 });
  });

  it("should count the number of infections", () => {
    const virus = new Virus({ map: startingMap });
    let i = 0;

    for (; i < 7; i++) {
      virus.work();
    }
    expect(virus.infectionCount).toBe(5);

    for (; i < 70; i++) {
      virus.work();
    }
    expect(virus.infectionCount).toBe(41);

    for (; i < 1e4; i++) {
      virus.work();
    }
    expect(virus.infectionCount).toBe(5587);
  });
});
