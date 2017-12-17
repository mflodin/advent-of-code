import { toBinary, toGrid, squareCounter, regionCounter } from "./14";

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
const grid = toGrid(text);
const squareCount = squareCounter(grid);
const regionCount = regionCounter(grid);
console.log("1: ", squareCount);
console.log("2: ", regionCount);
// });
