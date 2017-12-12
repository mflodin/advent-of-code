import { inputParser, connectionWalker, groupFinder } from "./12";
import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/12.input.txt", function(text) {
  const pipes = inputParser(text);
  const zeroConnections = connectionWalker(pipes, 0);
  const groups = groupFinder(pipes);
  console.log("1: ", zeroConnections.length);
  console.log("2: ", groups.length);
});
