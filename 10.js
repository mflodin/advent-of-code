export function toArray(string) {
  return string.split(",").map(n => Number(n));
}

export function generateList(number) {
  return Array(number)
    .fill()
    .map((_, i) => i);
}

export function Hasher(list) {
  this.list = list || [];
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
