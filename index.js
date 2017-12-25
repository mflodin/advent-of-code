import { read } from "./utils";
import { generateRuleMap, Fractal, countPixels } from "./21";

read("inputs/21.input.txt").then(text => {
  const seed = ".#./..#/###";
  let i = 0;

  const fractal = new Fractal({ seed, ruleMap: generateRuleMap(text) });

  for (; i < 5; i++) {
    fractal.tick();
  }

  console.log("1: ", countPixels(fractal.state));

  for (; i < 18; i++) {
    fractal.tick();
  }
  console.log("2: ", countPixels(fractal.state));
});
