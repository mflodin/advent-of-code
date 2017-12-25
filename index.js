import { read } from "./utils";
import { Virus, EvolvedVirus } from "./22";

read("inputs/22.input.txt").then(text => {
  const virus = new Virus({ map: text });
  for (let i = 0; i < 1e4; i++) {
    virus.work();
  }
  console.log("1: ", virus.infectionCount);

  const evolvedVirus = new EvolvedVirus({ map: text });
  for (let i = 0; i < 1e7; i++) {
    evolvedVirus.work();
  }
  console.log("2: ", evolvedVirus.infectionCount);
});
