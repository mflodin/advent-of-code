import { toArray, Jumper, Jumper2, jumpRunner } from "../5";

describe("toArray", () => {
  it("should convert a string of numbers per line to an array", () => {
    const array = toArray("1\n-2222\n3\n-4\n5000\n60");

    expect(array).toEqual([1, -2222, 3, -4, 5000, 60]);
  });
  it("should filter out empty lines", () => {
    const array = toArray("1\n-2222\n\n\n3\n-4\n5000\n60\n\n");

    expect(array).toEqual([1, -2222, 3, -4, 5000, 60]);
  });
});

describe("Jumper", () => {
  let array;

  beforeEach(() => {
    array = [0, 3, 0, 1, -3];
  });
  it("should start at position 0", () => {
    const jumper = new Jumper(array);
    expect(jumper.array).toEqual([0, 3, 0, 1, -3]);
    expect(jumper.position).toBe(0);
    expect(jumper.steps).toEqual(0);
    expect(jumper.isDone).toBe(false);
  });

  it("should increment position 0 but remain there on the first jump", () => {
    const jumper = new Jumper(array);
    jumper.jump();
    expect(jumper.array).toEqual([1, 3, 0, 1, -3]);
    expect(jumper.position).toBe(0);
    expect(jumper.steps).toBe(1);
    expect(jumper.isDone).toBe(false);
  });

  it("should increment position 0 and move to position 1 on the second jump", () => {
    const jumper = new Jumper(array);
    jumper.jump();
    jumper.jump();
    expect(jumper.array).toEqual([2, 3, 0, 1, -3]);
    expect(jumper.position).toBe(1);
    expect(jumper.steps).toBe(2);
    expect(jumper.isDone).toBe(false);
  });

  it("should increment position 1 and move to position 4 on the third jump", () => {
    const jumper = new Jumper(array);
    jumper.jump();
    jumper.jump();
    jumper.jump();
    expect(jumper.array).toEqual([2, 4, 0, 1, -3]);
    expect(jumper.position).toBe(4);
    expect(jumper.steps).toBe(3);
    expect(jumper.isDone).toBe(false);
  });

  it("should increment position 4 and move to position 1 on the fourth jump", () => {
    const jumper = new Jumper(array);
    jumper.jump();
    jumper.jump();
    jumper.jump();
    jumper.jump();
    expect(jumper.array).toEqual([2, 4, 0, 1, -2]);
    expect(jumper.position).toBe(1);
    expect(jumper.steps).toBe(4);
    expect(jumper.isDone).toBe(false);
  });

  it("should increment position 1 and move out of the maze on the fifth jump", () => {
    const jumper = new Jumper(array);
    jumper.jump();
    jumper.jump();
    jumper.jump();
    jumper.jump();
    jumper.jump();
    expect(jumper.array).toEqual([2, 5, 0, 1, -2]);
    expect(jumper.position).toBe(5);
    expect(jumper.steps).toBe(5);
    expect(jumper.isDone).toBe(true);
  });
});

describe("jumpRunner", () => {
  let array;

  beforeEach(() => {
    array = [0, 3, 0, 1, -3];
  });

  it("should run the Jumper to completion and report the number of steps", () => {
    const runner = jumpRunner(new Jumper(array));
    expect(runner.steps).toBe(5);
  });

  it("should run Jumper2 to completion and report the number of steps and the resulting array", () => {
    const runner = jumpRunner(new Jumper2(array));
    expect(runner.steps).toBe(10);
    expect(runner.array).toEqual([2, 3, 2, 3, -1]);
  });
});
