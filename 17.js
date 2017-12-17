export function* spinlockGenerator(stepSize) {
  let buffer = [0];
  let count = 0;
  let position = 0;
  while (true) {
    count += 1;
    position = (position + stepSize) % count + 1;
    buffer.splice(position, 0, count);
    yield buffer;
  }
}

export function fastRunner({ stepSize, iterations }) {
  let count = 0;
  let position = 0;
  let candidate = 0;
  while (count < iterations) {
    count += 1;

    position = (position + stepSize) % count + 1;
    if (position === 1) {
      candidate = count;
    }
  }

  return candidate;
}

export function runner({ spinlock, iterations, findNextTo = iterations }) {
  let t1, t0;
  const logAt = 1e4;
  let previous = 0;
  for (let i = 0; i < iterations - 1; i++) {
    spinlock.next().value;
  }

  const buffer = spinlock.next().value;

  return buffer[(buffer.indexOf(findNextTo) + 1) % buffer.length];
}
