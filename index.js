import { parseMoves, dance } from "./16";

import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/16.input.txt", function(text) {
  let moves = parseMoves(text);
  let line = "abcdefghijklmnop";

  let order = dance({ line, moves });

  console.log("1: ", order);

  const rounds = 1e3; // 1e9;
  const logRound = 1e2;

  let t0, t1;
  for (var i = 0; i < rounds - 1; i++) {
    if (i % logRound === 1) {
      t0 = Date.now();
    }

    order = dance({ line: order, moves });

    if (i > 0 && i % logRound === 0) {
      t1 = Date.now();
      console.log("round", i, order, t1 - t0);
    }
  }
  // console.log("2: ", matches);
});
