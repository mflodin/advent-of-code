export function Duet(instructions = "") {
  let i = 0;
  this.position = 0;
  this.registers = {};
  this.instructions = instructions
    .split("\n")
    .filter(i => i)
    .map(instruction => {
      const [fn, X, y] = instruction.split(/\s/);
      return {
        fn,
        X,
        y
      };
    });

  this.execute = () => {
    if (this.position < 0 || this.position > this.instructions.length) {
      throw new Error("Out of bounds: " + this.position);
    }

    const { fn, X, y } = this.instructions[this.position];

    this.registers[X] = this.registers[X] || 0; // ensure registers are initialized
    let Y = Number(y);
    if (Y !== Y) {
      // NaN
      this.registers[y] = this.registers[y] || 0; // ensure registers are initialized
      Y = this.registers[y];
    }
    if (i % 1e6 === 0 && i > 0) {
      console.log(i, fn, X, y, Y, this.registers);
    }
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
          console.log("i: ", i, recovered);
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

export function runner(duet) {
  let recovered;
  while (recovered === undefined || recovered === 0) {
    recovered = duet.execute();
  }

  return recovered;
}
