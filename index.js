import { lineparser, toArray, Processor, findLargest } from "./8";
import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/8.input.txt", function(text) {
  const instructions = toArray(text);
  const processor = new Processor();

  instructions.forEach(instruction => {
    processor.process(instruction);
  });

  console.log("1: " + processor.largest);
  console.log("2: " + processor.largestEver);
});
