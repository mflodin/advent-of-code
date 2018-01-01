import {
  Component,
  parseInput,
  constructBridges,
  Bridge,
  calculateStrength,
  runner
} from "../24";

const input = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;

describe("Component", () => {
  it("should have two ports", () => {
    const component = new Component("0/1");
    expect(component.ports.length).toBe(2);
  });

  it("should have ports with the same number of pins as in the input", () => {
    const component = new Component("0/1");
    expect(component.ports[0]).toBe(0);
    expect(component.ports[1]).toBe(1);
  });

  it("should have a custom toString method", () => {
    const component = new Component("4/17");

    expect(component.toString()).toBe("4/17");
  });
});

describe("Bridge", () => {
  it("should start empty", () => {
    expect(new Bridge().length).toBe(0);
  });

  it("should be possible to start with a component with a 0-pin port", () => {
    const bridge = new Bridge();
    bridge.add(new Component("0/4"));
    expect(bridge.length).toBe(1);
  });

  it("should be possible to start with a reversed component with a 0-pin port", () => {
    const bridge = new Bridge();
    bridge.add(new Component("7/0"));
    expect(bridge.length).toBe(1);
  });

  it("should NOT be possible to start with a component without a 0-pin port", () => {
    const bridge = new Bridge();
    expect(() => bridge.add(new Component("7/11"))).toThrow();
    expect(bridge.length).toBe(0);
  });

  it("should be possible to add a component with a matching port", () => {
    const bridge = new Bridge();
    bridge.add(new Component("0/4"));
    bridge.add(new Component("4/45"));
    expect(bridge.length).toBe(2);
  });

  it("should be possible to add a reversed component with a matching port", () => {
    const bridge = new Bridge();
    bridge.add(new Component("0/4"));
    bridge.add(new Component("7/4"));
    expect(bridge.length).toBe(2);
  });

  it("should be possible to add a palindrom component with matching ports", () => {
    const bridge = new Bridge();
    bridge.add(new Component("0/4"));
    bridge.add(new Component("4/4"));
    expect(bridge.length).toBe(2);
  });

  it("should NOT be possible to add a component without a matching port", () => {
    const bridge = new Bridge();
    bridge.add(new Component("0/4"));
    expect(() => bridge.add(new Component("7/11"))).toThrow();
    expect(bridge.length).toBe(1);
  });

  it("should have a custom toString method", () => {
    const bridge = new Bridge();
    bridge.add(new Component("0/4"));
    bridge.add(new Component("4/4"));
    bridge.add(new Component("47/4"));
    bridge.add(new Component("47/11"));
    expect(bridge.toString()).toBe("0/4--4/4--47/4--47/11");
  });
});

describe("parseInput", () => {
  it("should parse the input into components", () => {
    const components = parseInput(input);
    expect(components[0].ports).toEqual([0, 2]);
    expect(components[1].ports).toEqual([2, 2]);
    expect(components[2].ports).toEqual([2, 3]);
    expect(components[3].ports).toEqual([3, 4]);
    expect(components[4].ports).toEqual([3, 5]);
    expect(components[5].ports).toEqual([0, 1]);
    expect(components[6].ports).toEqual([10, 1]);
    expect(components[7].ports).toEqual([9, 10]);
  });
});

describe("constructBridges", () => {
  it("should make all possible bridges of the components", () => {
    const bridges = constructBridges({ components: parseInput(input) });
    expect(bridges.join("\n")).toBe(
      "0/2\n" +
        "0/2--2/2\n" +
        "0/2--2/2--2/3\n" +
        "0/2--2/2--2/3--3/4\n" +
        "0/2--2/2--2/3--3/5\n" +
        "0/2--2/3\n" +
        "0/2--2/3--3/4\n" +
        "0/2--2/3--3/5\n" +
        "0/1\n" +
        "0/1--10/1\n" +
        "0/1--10/1--9/10"
    );
  });
});

describe("calculateStrength", () => {
  it("should calculate the strength of a bridge", () => {
    const bridge = new Bridge();
    bridge.add(new Component("0/1"));
    bridge.add(new Component("10/1"));
    bridge.add(new Component("9/10"));
    const strength = calculateStrength(bridge);
    expect(strength).toBe(31);
  });
});

describe("runner", () => {
  it("should find the strength of the strongest bridge", () => {
    const [strength] = runner({ input });
    expect(strength).toBe(31);
  });

  it("should find the strength of the strongest longest bridge", () => {
    const [_, strength] = runner({ input });
    expect(strength).toBe(19);
  });
});
