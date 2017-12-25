import { read } from "./utils";
import { Virus } from "./22";

read("inputs/22.input.txt").then(text => {
  const virus = new Virus({ map: text });
  let i = 0;
  for (; i < 1e4; i++) {
    virus.work();
  }
  console.log("1: ", virus.infectionCount);
  // console.log("2: ", countPixels(fractal.state));
});
