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
const a = generator({ seed: 512, factor: 16807 });
const b = generator({ seed: 191, factor: 48271 });
const rounds = 40e6;

const matches = judge({ a, b, rounds });
console.log("1: ", matches);
// console.log("2: ", matches);
// });
