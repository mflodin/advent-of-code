export function toArray(string) {
  return string.split(",").map(n => Number(n));
}

export function fromAscii(string) {
  return Array.from(string).map(c => c.charCodeAt(0));
}

export function padLengths(lengths) {
  return lengths.concat([17, 31, 73, 47, 23]);
}

export function xor(array) {
  return array.reduce((acc, curr) => acc ^ curr);
}

export function generateList(number) {
  return Array(number)
    .fill()
    .map((_, i) => i);
}

function toHex(d) {
  return ("0" + Number(d).toString(16)).slice(-2);
}

export function runner({ hasher, lengths, string, rounds = 64 }) {
  const paddedLengths = lengths || padLengths(fromAscii(string));
  for (var i = 0; i < rounds; i++) {
    paddedLengths.forEach(l => hasher.hash(l));
  }

  const denseHash = Array(16)
    .fill()
    .map((_, i) => xor(hasher.list.slice(i * 16, i * 16 + 16)));

  const knotHash = denseHash.map(h => toHex(h)).join("");
  return knotHash;
}

export function Hasher(list) {
  this.list = list || generateList(256);
  this.position = 0;
  this.skipSize = 0;
  const listLength = this.list.length;

  this.hash = function hash(length) {
    const subsequence = [];

    for (let i = length - 1; i >= 0; i--) {
      subsequence.push(this.list[(this.position + i) % listLength]);
    }
    for (let i = 0; i < length; i++) {
      let j = (this.position + i) % listLength;
      this.list[j] = subsequence[i];
    }

    this.position = (this.position + length + this.skipSize) % listLength;
    this.skipSize += 1;
  };
}
