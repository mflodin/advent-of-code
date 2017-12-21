import { runner, Duet, conductor, Duo } from "./18";
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

  const queue0 = [];
  const queue1 = [];
  const duo0 = new Duo({ instructions: text, id: 0, queue: queue0 });
  const duo1 = new Duo({ instructions: text, id: 1, queue: queue1 });

  const [sendCount0, sendCount1] = conductor({ duo0, queue0, duo1, queue1 });
  console.log("2: ", sendCount1);
});
