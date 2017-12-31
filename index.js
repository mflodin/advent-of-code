import { read } from "./utils";
import { Coprocessor, optimizedCoprocessor } from "./23";

read("inputs/23.input.txt").then(text => {
  const debugprocessor = new Coprocessor({ instructions: text });
  try {
    while (debugprocessor.i < 1e5) {
      debugprocessor.execute();
    }
  } catch (e) {
    console.log("1: ", debugprocessor.mulCount);
  }

  const result = optimizedCoprocessor({ debug: false });
  console.log("2: ", result.h);

  // console.log("2: ", evolvedVirus.infectionCount);
});
