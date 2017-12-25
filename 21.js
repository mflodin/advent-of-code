export function generateRuleMap(rules) {
  let ruleMap = {};
  rules
    .split(/\n/)
    .filter(r => r)
    .forEach(rule => {
      const [key, value] = rule.split(" => ");
      ruleMap[key] = value;
      ruleMap[rotate(key)] = value;
      ruleMap[rotate(rotate(key))] = value;
      ruleMap[rotate(rotate(rotate(key)))] = value;
      ruleMap[flip(key)] = value;
      ruleMap[flip(rotate(key))] = value;
      ruleMap[flip(rotate(rotate(key)))] = value;
      ruleMap[flip(rotate(rotate(rotate(key))))] = value;
    });

  return ruleMap;
}

function rotate(rule) {
  if (rule.length === 5) {
    const [a, b, _, c, d] = rule.split("");

    return `${c}${a}/${d}${b}`;
  } else if (rule.length === 11) {
    const [a, b, c, _, d, e, f, __, g, h, i] = rule.split("");
    return `${g}${d}${a}/${h}${e}${b}/${i}${f}${c}`;
  }

  throw new Error("unexpected length of rule");
}

function flip(rule) {
  if (rule.length === 5) {
    const [a, b, _, c, d] = rule.split("");
    return `${c}${d}/${a}${b}`;
  } else if (rule.length === 11) {
    const [a, b, c, _, d, e, f, __, g, h, i] = rule.split("");
    return `${g}${h}${i}/${d}${e}${f}/${a}${b}${c}`;
  }

  throw new Error("unexpected length of rule");
}

export function Fractal({ seed, ruleMap }) {
  this.ruleMap = ruleMap;
  this.state = seed
    .split(/\//)
    .filter(l => l)
    .map(line => line.split(""));

  this.tick = () => {
    let divisor;
    let nextState = [];
    if (this.state.length % 2 === 0) {
      // console.log("two");
      divisor = 2;
    } else if (this.state.length % 3 === 0) {
      // console.log("three");
      divisor = 3;
    } else {
      throw new Error("unexpected length " + this.state.length);
    }

    const divisions = this.state.length / divisor;
    for (let i = 0; i < divisions; i++) {
      // nextState.push([]);
      for (let j = 0; j < divisions; j++) {
        // console.log("length", this.state.length);
        // console.log("i", i, "j", j);
        // console.log("i * divisor", i * divisor);
        // console.log("(i + 1) * divisor", (i + 1) * divisor);
        // console.log("ij* divisor", j * divisor);
        // console.log("(j + 1) * divisor", (j + 1) * divisor);
        let key = this.state
          .slice(i * divisor, (i + 1) * divisor)
          .map(row => row.slice(j * divisor, (j + 1) * divisor).join(""))
          .join("/");
        // console.log("key", key);
        let subgrid = this.ruleMap[key].split("/").map(l => l.split(""));

        subgrid.forEach((row, ii) => {
          nextState[i * (divisor + 1) + ii] =
            nextState[i * (divisor + 1) + ii] || [];
          row.forEach((item, jj) => {
            nextState[i * (divisor + 1) + ii].push(item);
          });
        });
        // console.log("next\n" + nextState.map(x => x.join("")).join("\n"));
      }
    }

    this.state = nextState;
    // console.log("tick", divisions);
  };
}

export function countPixels(grid) {
  return grid
    .map(row => row.join(""))
    .join("")
    .replace(/\./g, "").length;
}
