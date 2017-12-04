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
