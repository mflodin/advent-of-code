import { inputParser, connectionWalker } from "./12";
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
  const connections = inputParser(text);
  const zeroConnections = connectionWalker(connections, 0);
  console.log("1: ", zeroConnections.length);
});
