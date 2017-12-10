import { garbageRemover, groupScorer, garbageScorer } from "./9";
import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/9.input.txt", function(text) {
  console.log("1: " + groupScorer(garbageRemover(text)));
  console.log("2: " + garbageScorer(text));
});
