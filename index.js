import { toArray, Jumper, Jumper2, jumpRunner } from "./5";
import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/5.input.txt", function(text) {
  console.log("1: " + jumpRunner(new Jumper(toArray(text))).steps);
  console.log("2: " + jumpRunner(new Jumper2(toArray(text))).steps);
});
