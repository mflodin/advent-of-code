import { Coprocessor, optimizedCoprocessor } from "../23";

describe("Coprocessor", () => {
  it("should have a set method", () => {
    const coprocessor = new Coprocessor();
    expect(typeof coprocessor.set).toBe("function");
  });

  it("should have a subtract method", () => {
    const coprocessor = new Coprocessor();
    expect(typeof coprocessor.subtract).toBe("function");
  });

  it("should have a multiply method", () => {
    const coprocessor = new Coprocessor();
    expect(typeof coprocessor.multiply).toBe("function");
  });

  it("should have a jumpIfNotZero method", () => {
    const coprocessor = new Coprocessor();
    expect(typeof coprocessor.jumpIfNotZero).toBe("function");
  });

  it("should start at position 0", () => {
    const coprocessor = new Coprocessor();
    expect(coprocessor.position).toBe(0);
  });

  it("should have no registers to start with", () => {
    const coprocessor = new Coprocessor();
    expect(coprocessor.registers).toEqual({});
  });

  describe("set", () => {
    it("should set the register X to that value", () => {
      const coprocessor = new Coprocessor({ instructions: "set a 1" });
      coprocessor.execute();
      expect(coprocessor.registers.a).toBe(1);
    });
  });

  describe("subtract", () => {
    it("should decrement the register X by that value", () => {
      const coprocessor = new Coprocessor({ instructions: "sub a 1\nsub a 2" });
      coprocessor.execute();
      coprocessor.execute();
      expect(coprocessor.registers.a).toBe(-3);
    });
    it("should decrement the register X by the value in register Y", () => {
      const coprocessor = new Coprocessor({
        instructions: "set a 1\nset b 2\nsub a b"
      });
      coprocessor.execute();
      coprocessor.execute();
      coprocessor.execute();
      expect(coprocessor.registers.a).toBe(-1);
    });
  });

  describe("multiply", () => {
    it("should multiply the register X by the value of register Y", () => {
      const coprocessor = new Coprocessor({
        instructions: "set a 3\nset b 2\nmul a b"
      });
      coprocessor.execute();
      coprocessor.execute();
      coprocessor.execute();
      expect(coprocessor.registers.a).toBe(6);
    });
    it("should multiply the register X by the value Y", () => {
      const coprocessor = new Coprocessor({ instructions: "set a 3\nmul a 2" });
      coprocessor.execute();
      coprocessor.execute();
      expect(coprocessor.registers.a).toBe(6);
    });
  });

  describe("jumpIfNotZero", () => {
    it("should jump value steps in the instructions if the register X is above zero", () => {
      const coprocessor = new Coprocessor({
        instructions: "set a 3\njnz a -1"
      });
      coprocessor.execute();
      coprocessor.execute();
      expect(coprocessor.position).toBe(0);
    });
    it("should NOT jump value steps in the instructions if the register X is zero", () => {
      const coprocessor = new Coprocessor({
        instructions: "set a 0\njnz a -1"
      });
      coprocessor.execute();
      coprocessor.execute();
      expect(coprocessor.position).toBe(2);
    });
    it("should jump value steps in the instructions if the register X is below zero", () => {
      const coprocessor = new Coprocessor({
        instructions: "set a -1\njnz a -1"
      });
      coprocessor.execute();
      coprocessor.execute();
      expect(coprocessor.position).toBe(0);
    });
  });

  describe("mulCount", () => {
    it("should count the number of times mul is invoked", () => {
      const coprocessor = new Coprocessor({
        instructions:
          "set a -1\njnz a 2\nmul a 2\nmul a 2\nsub a -2\nset b 3\nmul a b"
      });
      coprocessor.execute();
      coprocessor.execute();
      coprocessor.execute();
      coprocessor.execute();
      coprocessor.execute();
      coprocessor.execute();
      expect(coprocessor.mulCount).toBe(2);
    });
  });
});

describe("optimizedCoprocessor", () => {
  it("should get the same result as the normal Coprocessor in debug mode", () => {
    expect(optimizedCoprocessor({ debug: true }).h).toEqual(1);
  });
});
