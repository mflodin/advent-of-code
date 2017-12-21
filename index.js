import { mazerunner } from "./19";
import { read } from "./utils";

read("inputs/19.input.txt").then(text => {
  let run = mazerunner(text);
  console.log("1: ", run);

  // console.log("2: ", sendCount1);
});
