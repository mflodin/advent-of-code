import { findBottom, toTree, balancer, weightMapper } from "./7";
import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/7.input.txt", function(text) {
  const tree = toTree(text);
  console.log("1: " + tree.name);
  const weighted = weightMapper(tree);
  const unbalanced = balancer(weighted);
  console.log(
    "2 " +
      JSON.stringify({
        name: unbalanced.name,
        weight: unbalanced.weight,
        fullWeight: unbalanced.fullWeight,
        balancedWeight: unbalanced.balancedWeight
        // children: unbalanced.children
      })
  );

  // console.log(JSON.stringify(weighted));
});
