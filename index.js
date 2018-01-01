import { read } from "./utils";
import { runner } from "./24";

read("inputs/24.input.txt").then(text => {
  const [strongest, strongestLongest] = runner({ input: text });
  console.log("1: ", strongest);
  console.log("2: ", strongestLongest);
});
