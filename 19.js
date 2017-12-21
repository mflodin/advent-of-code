export function mazerunner(input) {
  let i = 0;
  let letters = [];
  let maze = parse(input);
  let position = getStartPosition(maze);

  let direction = { x: 0, y: 1 };
  // let nextStep = calculateNextPosition({ position, direction });
  let current = maze[position.y][position.x];

  while (current !== " " && current !== undefined && i < 1e8) {
    i += 1;
    if (current === "+") {
      direction = changeDirection({ position, direction, maze });
    }
    if (current.match(/\w/)) {
      letters.push(current);
    }

    position = calculateNextPosition({ position, direction });
    current = maze[position.y][position.x];
    // console.log("current", current, position);
  }
  return letters.join("") + "\n2:  " + i;
}

function calculateNextPosition({ position, direction }) {
  let nextPosition = {
    x: position.x + direction.x,
    y: position.y + direction.y
  };
  return nextPosition;
}

function changeDirection({ maze, position, direction }) {
  let newDirection = {};
  if (direction.y !== 0) {
    newDirection.y = 0;
    newDirection.x =
      maze[position.y] && maze[position.y][position.x + 1] !== " " ? 1 : -1;
  } else {
    newDirection.x = 0;
    newDirection.y =
      maze[position.y + 1] && maze[position.y + 1][position.x] !== " " ? 1 : -1;
  }

  return newDirection;
}

export function parse(input) {
  return input.split(/\n/).filter(n => n);
  // .map(line => line.split(""));
}

export function getStartPosition(maze) {
  return { x: maze[0].indexOf("|"), y: 0 };
}
