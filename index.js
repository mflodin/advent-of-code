import { Firewall, runner, stealthRunner } from "./13";

import fs from "fs";

function read(file, callback) {
  fs.readFile(file, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

read("inputs/13.input.txt", function(text) {
  const severity = runner({
    firewall: new Firewall(text),
    packetStart: 0
  });

  const stealthDelay = stealthRunner({
    input: text,
    limit: 10000,
    minDelay: 9990
  });

  console.log("1: ", severity);
  console.log("2: ", stealthDelay);
});
