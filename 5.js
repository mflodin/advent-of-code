export function toArray(text) {
  return text
    .split("\n")
    .filter(n => n !== "")
    .map(n => Number(n));
}

export function Jumper(array) {
  this.array = array;
  this.position = 0;
  this.steps = 0;
  this.isDone = false;

  this.jump = () => {
    let current = this.array[this.position];
    this.array[this.position] = current + 1;
    this.position += current;
    this.steps += 1;
    if (this.array[this.position] === undefined) {
      this.isDone = true;
    }
  };
}

export function Jumper2(array) {
  this.array = array;
  this.position = 0;
  this.steps = 0;
  this.isDone = false;

  this.jump = () => {
    let current = this.array[this.position];
    if (current >= 3) {
      this.array[this.position] = current - 1;
    } else {
      this.array[this.position] = current + 1;
    }
    this.position += current;
    this.steps += 1;
    if (this.array[this.position] === undefined) {
      this.isDone = true;
    }
  };
}

export function jumpRunner(jumper) {
  while (!jumper.isDone) {
    jumper.jump();
  }

  return jumper;
}
