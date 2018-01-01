import { read } from "./utils";
import { runner } from "./24";

read("inputs/24.input.txt").then(text => {
  const strength = runner({ input: text });
  console.log("1: ", strength);

  // console.log("2: ", evolvedVirus.infectionCount);
});
