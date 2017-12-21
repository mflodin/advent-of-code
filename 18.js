function parse(instructions) {
  return instructions
    .split("\n")
    .filter(i => i)
    .map(instruction => {
      const [fn, x, y] = instruction.split(/\s/);
      return {
        fn,
        x,
        y
      };
    });
}

export function Duet(instructions = "") {
  let i = 0;
  this.position = 0;
  this.registers = {};
  this.instructions = parse(instructions);

  this.execute = () => {
    if (this.position < 0 || this.position > this.instructions.length) {
      throw new Error("Out of bounds: " + this.position);
    }

    let { fn, x: X, y } = this.instructions[this.position];

    this.registers[X] = this.registers[X] || 0; // ensure registers are initialized
    let Y = Number(y);
    if (Y !== Y) {
      // NaN
      this.registers[y] = this.registers[y] || 0; // ensure registers are initialized
      Y = this.registers[y];
    }
    // if (i % 1e6 === 0 && i > 0) {
    //   console.log(i, fn, X, y, Y, this.registers);
    // }
    switch (fn) {
      case "snd":
        this.playSound({ register: X });
        break;
      case "set":
        this.set({ register: X, value: Y });
        break;
      case "add":
        this.add({ register: X, value: Y });
        break;
      case "mul":
        this.multiply({ register: X, value: Y });
        break;
      case "mod":
        this.modulo({ register: X, value: Y });
        break;
      case "rcv":
        const recovered = this.recover({ register: X });
        if (recovered !== undefined) {
          return recovered;
        }
        break;
      case "jgz":
        this.jumpIfGreaterThanZero({ register: X, steps: Y });
        break;
      default:
    }
    i++;
  };
  this.playSound = ({ register }) => {
    this.lastPlayed = this.registers[register];
    this.position += 1;
  };
  this.set = ({ register, value }) => {
    this.registers[register] = value;
    this.position += 1;
  };
  this.add = ({ register, value }) => {
    this.registers[register] += value;
    this.position += 1;
  };
  this.multiply = ({ register, value }) => {
    this.registers[register] *= value;
    this.position += 1;
  };
  this.modulo = ({ register, value }) => {
    this.registers[register] %= value;
    this.position += 1;
  };
  this.recover = ({ register }) => {
    this.position += 1;
    return this.registers[register] !== 0 ? this.lastPlayed : undefined;
  };
  this.jumpIfGreaterThanZero = ({ register, steps }) => {
    if (this.registers[register] > 0) {
      this.position += steps;
    } else {
      this.position += 1;
    }
  };
}

export function Duo({ instructions = "", queue, id }) {
  this.i = 0;
  this.position = 0;
  this.id = id;
  this.registers = { p: id };
  this.instructions = parse(instructions);
  this.queue = queue;

  this.execute = () => {
    if (this.position < 0 || this.position > this.instructions.length) {
      throw new Error("Out of bounds: " + this.position);
    }

    const { fn, x, y } = this.instructions[this.position];
    let X = Number(x);
    if (X !== X) {
      // NaN
      this.registers[x] = this.registers[x] || 0; // ensure registers are initialized
      X = this.registers[x];
    }

    let Y = Number(y);
    if (Y !== Y && y !== undefined) {
      // NaN
      this.registers[y] = this.registers[y] || 0; // ensure registers are initialized
      Y = this.registers[y];
    }
    // if (i > 2e6) {
    // throw "aaaaa";
    // }
    if (this.i % 1e6 === 0 && this.i !== 0) {
      // console.log(i, fn, x, X, y, Y, this.registers);
      console.log("id:", this.id, this.i, this.registers, this.queue.length);
    }
    switch (fn) {
      case "snd": {
        return this.send({ value: X });
        break;
      }

      case "set":
        this.set({ register: x, value: Y });
        break;
      case "add":
        this.add({ register: x, value: Y });
        break;
      case "mul":
        this.multiply({ register: x, value: Y });
        break;
      case "mod":
        this.modulo({ register: x, value: Y });
        break;
      case "rcv": {
        const value = this.queue.shift();
        // console.log("rcv", "value", value, "x", x, "Q", this.queue);
        if (value === undefined) {
          // console.log("empty queue");
          return "EXIT";
        }
        this.receive({ register: x, value });
        break;
      }
      case "jgz":
        this.jumpIfGreaterThanZero({ X, x, steps: Y });
        break;
      default:
    }
    this.i += 1;
  };
  this.send = ({ value }) => {
    this.position += 1;
    return value;
  };
  this.set = ({ register, value }) => {
    this.registers[register] = value;
    this.position += 1;
  };
  this.add = ({ register, value }) => {
    this.registers[register] += value;
    this.position += 1;
  };
  this.multiply = ({ register, value }) => {
    this.registers[register] *= value;
    this.position += 1;
  };
  this.modulo = ({ register, value }) => {
    this.registers[register] %= value;
    this.position += 1;
  };
  this.receive = ({ register, value }) => {
    // console.log("receive", register, value);
    this.position += 1;
    this.registers[register] = value;
  };
  this.jumpIfGreaterThanZero = ({ X, x, steps }) => {
    // console.log("jump", X, x);
    if (X > 0) {
      this.position += steps;
    } else {
      this.position += 1;
    }
  };
}

export function runner(duet) {
  let recovered;
  while (recovered === undefined || recovered === 0) {
    recovered = duet.execute();
  }

  return recovered;
}

export function conductor({ duo0, queue0, duo1, queue1 }) {
  let val0, val1;
  let count0 = 0;
  let count1 = 0;
  let i = 0;

  while (!(val0 === "EXIT" && val1 === "EXIT")) {
    val0 = duo0.execute();
    if (val0 !== undefined && val0 !== "EXIT") {
      count0 += 1;
      queue1.push(val0);
      // console.log("i", i, "c0", count0, "v0", val0, "q0", queue1.length);
    }

    val1 = duo1.execute();
    if (val1 !== undefined && val1 !== "EXIT") {
      count1 += 1;
      queue0.push(val1);
      // console.log("i", i, "c1", count1, "v1", val1, "q1", queue0.length);
    }

    // console.log("c0", count0, "v0", val0, "q0", queue1);
    // console.log("c1", count1, "v1", val1, "q1", queue0);

    i += 1;
  }

  return [count0, count1];
}
