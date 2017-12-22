import { read } from "./utils";
import { GPU } from "./20";

read("inputs/20.input.txt").then(text => {
  // let run = mazerunner(text);
  console.log("1: ", 157); // particle with smallest v and no a

  const gpu = new GPU(text);

  for (var i = 0; i < 1e2; i++) {
    gpu.tick();
  }
  console.log("2: ", gpu.particles.length);
});
