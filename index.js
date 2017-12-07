import { toArray, Defragger, runner } from "./6";
import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/6.input.txt", function(text) {
  const result = runner(new Defragger(toArray(text)));
  console.log("1: " + result.steps);
  console.log("2: " + result.loopSize);
});
