import { read } from "./utils";
import { generateRuleMap, Fractal, countPixels } from "./21";

read("inputs/21.input.txt").then(text => {
  const seed = ".#./..#/###";

  const fractal = new Fractal({ seed, ruleMap: generateRuleMap(text) });

  fractal.tick();
  fractal.tick();
  fractal.tick();
  fractal.tick();
  fractal.tick();

  console.log("1: ", countPixels(fractal.state));
});
