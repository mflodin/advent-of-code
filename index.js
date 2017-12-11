import { generateList, Hasher, toArray, runner } from "./10";
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
  const hasher1 = new Hasher();
  const lengths = toArray(text);
  lengths.forEach(l => hasher1.hash(l));
  const [a, b] = hasher1.list;
  console.log("1: ", a * b);

  const hasher = new Hasher();
  const knotHash = runner({ hasher, string: text.trim() });
  console.log("2: ", knotHash);
  // console.log("2: " + text);
});
