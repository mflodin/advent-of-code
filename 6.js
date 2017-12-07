export function toArray(string) {
  return string
    .trim()
    .split(/\s+/)
    .map(n => Number(n));
}

export function findLargest(array) {
  let max = array[0] || 0;
  return array.reduce((acc, curr, i, arr) => {
    if (curr > max) {
      max = curr;
      return i;
    }
    return acc;
  }, 0);
}

export function Defragger(memory) {
  this.memory = memory;
  this.isDone = false;
  this.steps = 0;
  this.defrag = () => {
    this.steps += 1;
    const largest = findLargest(this.memory);
    const amount = this.memory[largest];
    this.memory[largest] = 0;
    for (var i = 1; i <= amount; i++) {
      this.memory[(i + largest) % this.memory.length] += 1;
    }
  };
}

export function runner(defragger) {
  let previousStates = [];
  let currentState = defragger.memory.join(",");
  while (!previousStates.includes(currentState)) {
    previousStates.push(currentState);
    defragger.defrag();
    currentState = defragger.memory.join(",");
  }

  return {
    steps: defragger.steps,
    memory: defragger.memory,
    loopSize: defragger.steps - previousStates.indexOf(currentState)
  };
}
