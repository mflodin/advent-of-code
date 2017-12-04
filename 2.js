export function diff(string) {
  const numbers = string.split(/\s/).map(n => Number(n));
  return max(numbers) - min(numbers);
}

export function min(arr) {
  return arr.reduce((acc, curr) => (curr < acc ? curr : acc));
}

export function max(arr) {
  return arr.reduce((acc, curr) => (curr > acc ? curr : acc));
}

export function checksum(string) {
  const rows = string.split("\n");
  return rows.reduce((acc, curr) => {
    return acc + diff(curr);
  }, 0);
}

export function checksum2(string) {
  const rows = string.split("\n");
  return rows.reduce((acc, curr) => {
    return acc + div(curr);
  }, 0);
}

export function div(string) {
  const numbers = string.split(/\s/).map(n => Number(n));
  return numbers.reduce((acc, curr) => {
    var divisors = numbers.filter(n => curr % n === 0 && curr !== n);
    if (divisors.length) {
      return curr / divisors[0];
    }
    return acc;
  }, 0);
}
