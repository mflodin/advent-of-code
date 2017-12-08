import { lineparser, toArray, Processor, findLargest } from "../8";

describe("lineparser", function() {
  it("should parse a line into an instruction", function() {
    expect(lineparser("b inc 5 if a > 1")).toEqual({
      register: "b",
      instruction: "inc",
      value: 5,
      condition: {
        register: "a",
        comparator: ">",
        value: 1
      }
    });

    expect(lineparser("a dec 0 if a != -100")).toEqual({
      register: "a",
      instruction: "dec",
      value: 0,
      condition: {
        register: "a",
        comparator: "!=",
        value: -100
      }
    });
  });
});

const inputText = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
`;

const input = toArray(inputText);

describe("Processor", function() {
  it("should start each register at 0 the first time they appear", function() {
    // Because a starts at 0, it is not greater than 1, and so b is not modified.
    const processor = new Processor();
    processor.process(input[0]);
    expect(processor.registers.a).toBe(0);
    expect(processor.registers.b).toBe(0); // a was not greater than 1
  });
  it("a is increased by 1 (to 1) because b is less than 5 (it is 0).", function() {
    const processor = new Processor();
    processor.process(input[0]);
    processor.process(input[1]);
    expect(processor.registers.a).toBe(1);
    expect(processor.registers.b).toBe(0); // a was not greater than 1
  });
  it("c is decreased by -10 (to 10) because a is now greater than or equal to 1 (it is 1).", function() {
    const processor = new Processor();
    processor.process(input[0]);
    processor.process(input[1]);
    processor.process(input[2]);
    expect(processor.registers.a).toBe(1);
    expect(processor.registers.b).toBe(0);
    expect(processor.registers.c).toBe(10); // a was equal to 1
  });
  it("c is increased by -20 (to -10) because c is equal to 10.", function() {
    const processor = new Processor();
    input.forEach(i => processor.process(i));
    expect(processor.registers.a).toBe(1);
    expect(processor.registers.b).toBe(0);
    expect(processor.registers.c).toBe(-10); // c was equal to 10
  });

  it("should find the largest register value", function() {
    const processor = new Processor();
    input.forEach(i => processor.process(i));
    expect(processor.largest).toBe(1);
  });

  it("should find the largest register value ever", function() {
    const processor = new Processor();
    input.forEach(i => processor.process(i));
    expect(processor.largestEver).toBe(10);
  });
});
