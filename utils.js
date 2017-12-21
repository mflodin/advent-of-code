import fs from "fs";

export function read(file, callback) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
