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
export function Coprocessor({ instructions = "", debug = true } = {}) {
  this.i = 0;
  this.mulCount = 0;
  this.position = 0;
  this.registers = {};
  if (!debug) {
    this.registers.a = 1;
  }
  this.instructions = parse(instructions);

  this.execute = () => {
    if (this.position < 0 || this.position >= this.instructions.length) {
      throw new Error(
        "Out of bounds: " + this.position + " mulCount: " + this.mulCount
      );
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
      console.log(this.i, fn, x, y, this.position, this.registers);
      // console.log("id:", this.id, this.i, this.registers, this.queue.length);
    }
    switch (fn) {
      case "set":
        this.set({ register: x, value: Y });
        break;
      case "sub":
        this.subtract({ register: x, value: Y });
        break;
      case "mul":
        this.multiply({ register: x, value: Y });
        break;
      case "jnz":
        this.jumpIfNotZero({ X, x, steps: Y });
        break;
      default:
    }
    this.i += 1;
  };
  this.set = ({ register, value }) => {
    this.registers[register] = value;
    this.position += 1;
  };
  this.subtract = ({ register, value }) => {
    this.registers[register] -= value;
    this.position += 1;
  };
  this.multiply = ({ register, value }) => {
    this.mulCount += 1;
    this.registers[register] *= value;
    this.position += 1;
  };
  this.jumpIfNotZero = ({ X, x, steps }) => {
    // console.log("jump", X, x);
    if (X !== 0) {
      this.position += steps;
    } else {
      this.position += 1;
    }
  };
}
