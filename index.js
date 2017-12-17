import { judge, generator } from "./15";

import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

// read("inputs/13.input.txt", function(text) {
let a = generator({ seed: 512, factor: 16807 });
let b = generator({ seed: 191, factor: 48271 });
let rounds = 40e6;

let matches = judge({ a, b, rounds });
console.log("1: ", matches);

a = generator({ seed: 512, factor: 16807, multiple: 4 });
b = generator({ seed: 191, factor: 48271, multiple: 8 });
rounds = 5e6;

matches = judge({ a, b, rounds });
console.log("2: ", matches);
// });
