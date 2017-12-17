export function judge({ a, b, rounds = 5 }) {
  let matchCount = 0;
  let t0;
  let t1;
  for (var i = 0; i < rounds; i++) {
    if (i % 1e6 === 1) {
      t0 = Date.now();
    }
    if (matches(a.next().value, b.next().value)) {
      matchCount += 1;
    }

    if (i > 0 && i % 1e6 === 0) {
      t1 = Date.now();
      console.log("round", i, t1 - t0);
    }
  }
  return matchCount;
}

const sixteenBits = 2 ** 16;

export function matches(a, b) {
  return a % sixteenBits === b % sixteenBits;
}

export function* generator({ seed, factor, multiple }) {
  let value = seed;
  while (true) {
    value = (value * factor) % 2147483647;
    yield value;
  }
}

export function toBinary(dec) {
  return ("00000000000000000000000000000000" + dec.toString(2)).slice(-32);
}
