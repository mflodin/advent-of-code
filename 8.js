export function lineparser(string) {
  const [
    register,
    instruction,
    value,
    _,
    conditionRegister,
    comparator,
    conditionValue
  ] = string.split(/\s/);
  return {
    register,
    instruction,
    value: Number(value),
    condition: {
      register: conditionRegister,
      comparator,
      value: Number(conditionValue)
    }
  };
}

export function toArray(string) {
  return string.split(/\n/).filter(n => n);
}

export function Processor() {
  this.registers = {};
  this.largest;
  this.largestEver;
  this.process = function(instructionText) {
    const { register, instruction, value, condition } = lineparser(
      instructionText
    );

    // make sure registers are initialized
    this.registers[register] = this.registers[register] || 0;
    this.registers[condition.register] =
      this.registers[condition.register] || 0;

    if (
      !checkCondition({
        ...condition,
        register: this.registers[condition.register]
      })
    ) {
      return;
    }
    if (instruction === "inc") {
      this.registers[register] += value;
    } else if (instruction === "dec") {
      this.registers[register] -= value;
    } else {
      throw Error("unknown instruction " + instruction);
    }

    this.largest = findLargest(this);
    if (!this.largestEver || this.largest > this.largestEver) {
      this.largestEver = this.largest;
    }
  };
}

function checkCondition({ register, value, comparator }) {
  switch (comparator) {
    case "==":
      return register === value;
    case "!=":
      return register !== value;
    case ">=":
      return register >= value;
    case "<=":
      return register <= value;
    case ">":
      return register > value;
    case "<":
      return register < value;
    default:
      throw Error("unknown comparator " + comparator);
  }
}

export function findLargest({ registers = [] }) {
  const registerKeys = Object.keys(registers);
  return registerKeys.reduce((acc, curr) => {
    const currentValue = registers[curr];
    if (currentValue > acc) {
      return currentValue;
    } else {
      return acc;
    }
  }, registers[registerKeys[0]]);
}
