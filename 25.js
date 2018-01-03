export function TuringMachine(blueprint) {
  const { startState, checksumInterval, stateMap } = parse(blueprint);
  this.state = startState;
  this.stateMap = stateMap;
  this.checksumInterval = checksumInterval;
  this.cursor = 0;
  this.tape = [];
  this.steps = 0;
  this.minPos = 0;
  this.maxPos = 0;

  this.step = () => {
    const currentValue = this.tape[this.cursor] || 0;
    const instruction = this.stateMap[this.state][currentValue];
    this.tape[this.cursor] = instruction.value;
    this.cursor += instruction.move;
    this.state = instruction.state;
    this.steps += 1;

    if (this.cursor < this.minPos) {
      this.minPos = this.cursor;
    } else if (this.cursor > this.maxPos) {
      this.maxPos = this.cursor;
    }
  };
}

export function parse(blueprint) {
  const startState = blueprint.match(/Begin in state (.)/)[1];
  const checksumInterval = Number(
    blueprint.match(/Perform a diagnostic checksum after (\d+) steps/)[1]
  );

  let stateMap = {};
  const states = blueprint.match(/In state (.*\n){9}/g);
  states.forEach((state) => {
    const name = state.match(/In state (.)/)[1];
    stateMap[name] = {};
    const conditions = state.match(/If the current value(.*\n){4}/g);

    conditions.forEach((condition) => {
      const ifValue = condition.match(/If the current value is (\d)/)[1];
      let instruction = {
        value: Number(condition.match(/Write the value (\d)/)[1]),
        move:
          condition.match(/Move one slot to the (left|right)/)[1] === "right"
            ? 1
            : -1,
        state: condition.match(/Continue with state (.)/)[1]
      };
      stateMap[name][ifValue] = instruction;
    });
  });

  return { startState, checksumInterval, stateMap };
}

export function runner(turingMachine) {
  let checksum = 0;
  for (let i = 0; i < turingMachine.checksumInterval; i += 1) {
    turingMachine.step();
    // if (i % 1e5 === 0) {
    //   console.log(i, turingMachine.maxPos - turingMachine.minPos);
    // }
  }

  for (let i = turingMachine.minPos; i <= turingMachine.maxPos; i += 1) {
    checksum += turingMachine.tape[i];
  }

  return checksum;
}
