export function garbageRemover(string) {
  return string
    .replace(/!!/g, "")
    .replace(/!>/g, "")
    .replace(/<.*?>/g, "<>");
}

export function groupScorer(string) {
  const cleanString = garbageRemover(string);
  let level = 0;
  let score = 0;

  for (var i = 0; i < cleanString.length; i++) {
    let char = cleanString[i];

    if (char === "{") {
      level += 1;
      score += level;
    } else if (char === "}") {
      level -= 1;
    }
  }
  return score;
}

export function garbageScorer(string) {
  let score = 0;
  let insideGarbage = false;

  debugger;

  for (var i = 0; i < string.length; i++) {
    let char = string[i];

    if (char === "!") {
      i += 1;
    } else if (!insideGarbage && char === "<") {
      insideGarbage = true;
    } else if (char === ">") {
      insideGarbage = false;
    } else if (insideGarbage) {
      score += 1;
    }
  }
  return score;
}
