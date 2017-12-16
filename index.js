import { Firewall, runner, mathRunner } from "./13";

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
  const firewall = new Firewall(text);
  const severity = runner({
    firewall,
    limit: 100
  })[0].severity({ firewall });

  const stealthDelay = mathRunner({
    input: text,
    limit: 1000000000
  });

  console.log("1: ", severity);
  console.log("2: ", stealthDelay);
});
