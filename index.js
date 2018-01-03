import { read } from "./utils";
import { TuringMachine, runner } from "./25";

read("inputs/25.input.txt").then((text) => {
  const checksum = runner(new TuringMachine(text));
  console.log("1: ", checksum);
});
