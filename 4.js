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

export function count(string) {
  const lines = string.split("\n");
  // console.log("length", lines.length);
  return lines.filter(line => validate(line)).length;
}
