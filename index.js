import { toBinary, toGrid, squareCounter } from "./14";

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

const text = "ljoxqyyw";

const squareCount = squareCounter(toGrid(text));
console.log("1: ", squareCount);
// console.log("2: ", );
// });
