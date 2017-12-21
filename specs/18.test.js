import { Duet, runner, Duo, conductor } from "../18";

describe("Duet", () => {
  it("should have a playSound method", () => {
    const duet = new Duet();
    expect(typeof duet.playSound).toBe("function");
  });

  it("should have a set method", () => {
    const duet = new Duet();
    expect(typeof duet.set).toBe("function");
  });

  it("should have a add method", () => {
    const duet = new Duet();
    expect(typeof duet.add).toBe("function");
  });

  it("should have a multiply method", () => {
    const duet = new Duet();
    expect(typeof duet.multiply).toBe("function");
  });

  it("should have a modulo method", () => {
    const duet = new Duet();
    expect(typeof duet.modulo).toBe("function");
  });

  it("should have a recover method", () => {
    const duet = new Duet();
    expect(typeof duet.recover).toBe("function");
  });

  it("should have a jumpIfGreaterThanZero method", () => {
    const duet = new Duet();
    expect(typeof duet.jumpIfGreaterThanZero).toBe("function");
  });

  it("should start at position 0", () => {
    const duet = new Duet();
    expect(duet.position).toBe(0);
  });

  it("should have no registers to start with", () => {
    const duet = new Duet();
    expect(duet.registers).toEqual({});
  });

  describe("set", () => {
    it("should set the register X to that value", () => {
      const duet = new Duet("set a 1");
      duet.execute();
      expect(duet.registers.a).toBe(1);
    });
  });

  describe("add", () => {
    it("should increment the register X by that value", () => {
      const duet = new Duet("add a 1\nadd a 2");
      duet.execute();
      duet.execute();
      expect(duet.registers.a).toBe(3);
    });
  });

  describe("multiply", () => {
    it("should multiply the register X by the value of register Y", () => {
      const duet = new Duet("set a 3\nset b 2\nmul a b");
      duet.execute();
      duet.execute();
      duet.execute();
      expect(duet.registers.a).toBe(6);
    });
  });

  describe("modulo", () => {
    it("should take the remainder of the register X divided by the value", () => {
      const duet = new Duet("set a 3\nmod a 2");
      duet.execute();
      duet.execute();
      expect(duet.registers.a).toBe(1);
    });
  });

  describe("recover", () => {
    it("should return the frequency of the last played sound if the register X is not zero", () => {
      const duet = new Duet("set a 1\nsnd a\nset a 3\nrcv a");
      duet.execute();
      duet.execute();
      duet.execute();
      const recovered = duet.execute();
      expect(recovered).toBe(1);
    });
    it("should NOT return the frequency of the last played sound if the register X is zero", () => {
      const duet = new Duet("set a 1\nsnd a\nset a 0\nrcv a");
      duet.execute();
      duet.execute();
      duet.execute();
      const recovered = duet.execute();
      expect(recovered).toBe(undefined);
    });
  });

  describe("jumpIfGreaterThanZero", () => {
    it("should jump value steps in the instructions ff the register X is greater than zero", () => {
      const duet = new Duet("set a 3\njgz a -1");
      duet.execute();
      duet.execute();
      expect(duet.position).toBe(0);
    });
    it("should NOT jump value steps in the instructions ff the register X is zero", () => {
      const duet = new Duet("set a 0\njgz a -1");
      duet.execute();
      duet.execute();
      expect(duet.position).toBe(2);
    });
    it("should NOT jump value steps in the instructions ff the register X is less than zero", () => {
      const duet = new Duet("set a -1\njgz a -1");
      duet.execute();
      duet.execute();
      expect(duet.position).toBe(2);
    });
  });
});

describe("runner", () => {
  it("should execute the Duet until it recovers a frequenzy that is non-zero", () => {
    const instructions = `set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
snd a
jgz a -2
set a 1
jgz a -2`;
    const frequency = runner(new Duet(instructions));
    expect(frequency).toBe(1);
  });
});

describe("Duo", () => {
  const instructions = `
snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;

  it("should start at position 0", () => {
    const duet = new Duet();
    expect(duet.position).toBe(0);
  });

  it("should have no registers to start with", () => {
    const duet = new Duet();
    expect(duet.registers).toEqual({});
  });

  describe("set", () => {
    it("should set the register X to that value", () => {
      const duet = new Duet("set a 1");
      duet.execute();
      expect(duet.registers.a).toBe(1);
    });
  });

  describe("add", () => {
    it("should increment the register X by that value", () => {
      const duet = new Duet("add a 1\nadd a 2");
      duet.execute();
      duet.execute();
      expect(duet.registers.a).toBe(3);
    });
  });

  describe("multiply", () => {
    it("should multiply the register X by the value of register Y", () => {
      const duet = new Duet("set a 3\nset b 2\nmul a b");
      duet.execute();
      duet.execute();
      duet.execute();
      expect(duet.registers.a).toBe(6);
    });
  });

  describe("modulo", () => {
    it("should take the remainder of the register X divided by the value", () => {
      const duet = new Duet("set a 3\nmod a 2");
      duet.execute();
      duet.execute();
      expect(duet.registers.a).toBe(1);
    });
  });

  describe("jumpIfGreaterThanZero", () => {
    it("should jump value steps in the instructions ff the register X is greater than zero", () => {
      const duet = new Duet("set a 3\njgz a -1");
      duet.execute();
      duet.execute();
      expect(duet.position).toBe(0);
    });
    it("should NOT jump value steps in the instructions ff the register X is zero", () => {
      const duet = new Duet("set a 0\njgz a -1");
      duet.execute();
      duet.execute();
      expect(duet.position).toBe(2);
    });
    it("should NOT jump value steps in the instructions ff the register X is less than zero", () => {
      const duet = new Duet("set a -1\njgz a -1");
      duet.execute();
      duet.execute();
      expect(duet.position).toBe(2);
    });
  });

  describe("send", () => {
    it("should send the value to the conductor", () => {
      const duo = new Duo({ instructions, id: 0, queue: [] });
      expect(duo.execute()).toBe(1);
      expect(duo.execute()).toBe(2);
      expect(duo.execute()).toBe(0);

      const duo1 = new Duo({ instructions, id: 1, queue: [] });
      expect(duo1.execute()).toBe(1);
      expect(duo1.execute()).toBe(2);
      expect(duo1.execute()).toBe(1);
    });
  });
  describe("receive", () => {
    it("should receive values from the conductor", () => {
      const duo = new Duo({ instructions, id: 0, queue: [1, 2, 3] });
      const duo1 = new Duo({ instructions, id: 1, queue: [5, 6, 7] });

      for (var i = 0; i < 7; i++) {
        duo.execute();
        duo1.execute();
      }

      expect(duo.registers.a).toBe(1, "a");
      expect(duo.registers.b).toBe(2, "b");
      expect(duo.registers.c).toBe(3, "c");
      expect(duo.registers.d).toBe(undefined, "d");
      expect(duo1.registers.a).toBe(5, "a");
      expect(duo1.registers.b).toBe(6, "b");
      expect(duo1.registers.c).toBe(7, "c");
      expect(duo1.registers.d).toBe(undefined, "d");
    });
  });
});

describe("conductor", () => {
  const instructions = `
snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;
  it("should run the two programs until their queues are empty", () => {
    const queue0 = [];
    const queue1 = [];
    const duo0 = new Duo({ instructions, id: 0, queue: queue0 });
    const duo1 = new Duo({ instructions, id: 1, queue: queue1 });

    const [sent0, sent1] = conductor({ duo0, queue0, duo1, queue1 });
    expect(duo0.registers.a).toBe(1, "a");
    expect(duo0.registers.b).toBe(2, "b");
    expect(duo0.registers.c).toBe(1, "c");
    expect(duo0.registers.d).toBe(undefined, "d");
    expect(sent0).toBe(3);
    expect(duo1.registers.a).toBe(1, "a");
    expect(duo1.registers.b).toBe(2, "b");
    expect(duo1.registers.c).toBe(0, "c");
    expect(duo1.registers.d).toBe(undefined, "d");
    expect(sent1).toBe(3);
  });
});
