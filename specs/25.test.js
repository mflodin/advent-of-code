import { TuringMachine, parse, runner } from "../25";

const blueprint = `Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
    `;

describe("TuringMachine", () => {
  it("should begin in state A", () => {
    const tm = new TuringMachine(blueprint);
    expect(tm.state).toBe("A");
  });

  it("should start at position 0", () => {
    const tm = new TuringMachine(blueprint);
    expect(tm.cursor).toBe(0);
  });

  it("should move according to the instructions", () => {
    const tm = new TuringMachine(blueprint);
    tm.step();
    expect(tm.tape[0]).toBe(1);
    expect(tm.cursor).toBe(1);

    tm.step();
    expect(tm.tape[0]).toBe(1);
    expect(tm.tape[1]).toBe(1);
    expect(tm.cursor).toBe(0);

    tm.step();
    expect(tm.tape[0]).toBe(0);
    expect(tm.tape[1]).toBe(1);
    expect(tm.cursor).toBe(-1);

    tm.step();
    expect(tm.tape[-1]).toBe(1);
    expect(tm.tape[0]).toBe(0);
    expect(tm.tape[1]).toBe(1);
    expect(tm.cursor).toBe(-2);

    tm.step();
    expect(tm.tape[-2]).toBe(1);
    expect(tm.tape[-1]).toBe(1);
    expect(tm.tape[0]).toBe(0);
    expect(tm.tape[1]).toBe(1);
    expect(tm.cursor).toBe(-1);

    tm.step();
    expect(tm.tape[-2]).toBe(1);
    expect(tm.tape[-1]).toBe(1);
    expect(tm.tape[0]).toBe(0);
    expect(tm.tape[1]).toBe(1);
    expect(tm.cursor).toBe(0);
  });

  it("should keep track of the leftmost position on the tape", () => {
    const tm = new TuringMachine(blueprint);
    tm.step();
    tm.step();
    tm.step();
    tm.step();
    tm.step();
    tm.step();
    expect(tm.minPos).toBe(-2);
  });

  it("should keep track of the rightmost position on the tape", () => {
    const tm = new TuringMachine(blueprint);
    tm.step();
    tm.step();
    tm.step();
    tm.step();
    tm.step();
    tm.step();
    expect(tm.maxPos).toBe(1);
  });
});

describe("runner", () => {
  it("should calculate the checksum after checksum interval steps", () => {
    const checksum = runner(new TuringMachine(blueprint));
    expect(checksum).toBe(3);
  });
});

describe("parse", () => {
  it("should get the correct start state", () => {
    const { startState } = parse(blueprint);
    expect(startState).toBe("A");
  });
  it("should get the correct checksum interval", () => {
    const { checksumInterval } = parse(blueprint);
    expect(checksumInterval).toBe(6);
  });

  it("should get the correct states", () => {
    const { stateMap } = parse(blueprint);
    expect(stateMap).toEqual({
      A: {
        0: {
          value: 1,
          move: 1,
          state: "B"
        },
        1: {
          value: 0,
          move: -1,
          state: "B"
        }
      },
      B: {
        0: {
          value: 1,
          move: -1,
          state: "A"
        },
        1: {
          value: 1,
          move: 1,
          state: "A"
        }
      }
    });
  });
});
