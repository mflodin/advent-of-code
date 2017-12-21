import { runner, Duet } from "./18";
import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/18.input.txt", function(text) {
  let frequency;
  frequency = runner(new Duet(text));
  console.log("1: ", frequency);
  // console.log("2: ", frequency);
});
