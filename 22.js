export function parseMap(map) {
  return map
    .split("\n")
    .filter(n => n)
    .map(row => row.split(""));
}

function getStartingPosition(map) {
  return { x: Math.floor(map[0].length / 2), y: Math.floor(map.length / 2) };
}

function printMap(map, pos) {
  let log = "";

  map.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (pos.x === j && pos.y === i) {
        log += "[" + cell + "]";
      } else {
        log += " " + cell + " ";
      }
    });
    log += "\n";
  });
  console.log("\n\n" + log);
}

export function Virus({ map = "." } = {}) {
  this.infectionCount = 0;
  this.map = parseMap(map);
  this.position = getStartingPosition(this.map);
  this.direction = "up";

  this.turnLeft = () => {
    switch (this.direction) {
      case "up":
        this.direction = "left";
        break;
      case "left":
        this.direction = "down";
        break;
      case "down":
        this.direction = "right";
        break;
      case "right":
        this.direction = "up";
        break;
    }
  };

  this.turnRight = () => {
    this.turnLeft();
    this.turnLeft();
    this.turnLeft();
  };

  this.move = () => {
    switch (this.direction) {
      case "up":
        this.position.y -= 1;
        if (this.position.y < 0) {
          this.position.y = 0;
          const newRow = Array.from(this.map[0], _ => ".");
          this.map.unshift(newRow);
        }
        break;
      case "left":
        this.position.x -= 1;
        if (this.position.x < 0) {
          this.position.x = 0;
          this.map.forEach(row => row.unshift("."));
        }
        break;
      case "down":
        this.position.y += 1;
        if (this.position.y === this.map.length) {
          const newRow = Array.from(this.map[0], _ => ".");
          this.map.push(newRow);
        }
        break;
      case "right":
        this.position.x += 1;
        if (this.position.x === this.map[0].length) {
          this.map.forEach(row => row.push("."));
        }
        break;
    }

    // printMap(this.map, this.position);
  };

  this.toggle = () => {
    if (this.map[this.position.y][this.position.x] === ".") {
      this.infectionCount += 1;
      this.map[this.position.y][this.position.x] = "#";
    } else {
      this.map[this.position.y][this.position.x] = ".";
    }
  };

  this.work = () => {
    if (this.map[this.position.y][this.position.x] === "#") {
      this.turnRight();
    } else {
      this.turnLeft();
    }
    this.toggle();
    this.move();
  };
}
