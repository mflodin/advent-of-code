import { read } from "./utils";
import { Coprocessor } from "./23";

read("inputs/23.input.txt").then(text => {
  const coprocessor = new Coprocessor({ instructions: text });
  while (coprocessor.i < 1e5) {
    coprocessor.execute();
  }
  console.log("1: ", coprocessor.mulCount);
  // console.log("2: ", evolvedVirus.infectionCount);
});
