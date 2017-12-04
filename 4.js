export function validate(string) {
  if (!string) {
    return false;
  }
  const words = string.split(/\s/);
  const allValid = words.every(word => {
    const isValid = words.filter(w => w === word).length === 1;
    // !isValid && console.log("!", string, word);
    return isValid;
  });
  // allValid && console.log("ok", string);
  return allValid;
}

export function count(validator, string) {
  const lines = string.split("\n");
  // console.log("length", lines.length);
  return lines.filter(line => validator(line)).length;
}

export function validate2(string) {
  if (!string) {
    return false;
  }
  const words = string.split(/\s/);
  const normalizedWords = words.map(word => {
    return Array.from(word)
      .sort()
      .join("");
  });

  // console.log("nrom", normalizedWords);

  const allValid = normalizedWords.every((word, i, arr) => {
    const length = arr.filter(w => w === word).length;
    const isValid = length === 1;
    // !isValid && console.log("!", "|", string, "|", word, "|", length);
    return isValid;
  });
  // allValid && console.log("ok", normalizedWords);
  return allValid;
}
