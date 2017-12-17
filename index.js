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

  let order = line;

  const rounds = 1e9 % 48;
  const logRound = 1e2;

  let t0, t1;
  for (var i = 0; i < rounds; i++) {
    if (i % logRound === 1) {
      t0 = Date.now();
    }

    order = dance({ line: order, moves });
    if (order === line) {
      console.log("AAAAAA", i % 48);
    }

    if (i > 0 && i % logRound === 0) {
      t1 = Date.now();
      console.log("round", i, order, t1 - t0);
    } else if (i === 0) {
      console.log("1: ", order);
    }
  }
  console.log("2: ", order);
});
