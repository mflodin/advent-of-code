import { Walker, toArray } from "./11";
import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/11.input.txt", function(text) {
  const walker = new Walker();
  const directions = toArray(text);
  directions.forEach(d => walker.walk(d));
  console.log("1: ", walker.distance);
  console.log("2: ", walker.maxDistance);
});
