export function* spinlockGenerator(stepSize) {
  let state = [0];
  let count = 0;
  let position = 0;
  while (true) {
    count += 1;
    position = (position + stepSize) % state.length + 1;
    let before = state.slice(0, position);
    let after = state.slice(position);
    // console.log(position, before, after);
    state = [...before, count, ...after];
    // console.log(state);
    yield state;
  }
}

export function runner({ spinlock, iterations }) {
  for (let i = 0; i < iterations - 1; i++) {
    spinlock.next();
  }

  const buffer = spinlock.next().value;
  return buffer[(buffer.indexOf(iterations) + 1) % buffer.length];
}
