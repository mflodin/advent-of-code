import { runner, spinlockGenerator, fastRunner } from "./17";
import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

// read("inputs/16.input.txt", function(text) {
const input = 363;
let value;
value = runner({
  spinlock: spinlockGenerator(input),
  iterations: 2017
});
console.log("1: ", value);

value = fastRunner({
  stepSize: input,
  iterations: 50000000
});

console.log("2: ", value);
// });
