import { runner, spinlockGenerator } from "./17";
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
const value = runner({ spinlock: spinlockGenerator(input), iterations: 2017 });
console.log("1: ", value);

// console.log("2: ", order);
// });
