import { generateList, Hasher, toArray } from "./10";
import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/10.input.txt", function(text) {
  const hasher = new Hasher(generateList(256));
  const lengths = toArray(text);
  lengths.forEach(l => hasher.hash(l));
  const [a, b] = hasher.list;
  console.log("1: ", a * b);
  // console.log("2: " + text);
});
