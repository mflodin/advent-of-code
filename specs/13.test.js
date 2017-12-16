import {
  lineParser,
  inputParser,
  Firewall,
  runner,
  stealthRunner
} from "../13";

const input = `0: 3
1: 2
4: 4
6: 4`;

describe("lineParser", () => {
  it("should turn 0: 3 into a layer with depth 3", () => {
    const layer = lineParser("0: 3");
    expect(layer.depth).toBe(0);
    expect(layer.range).toBe(3);
    expect(layer.scannerPosition).toBe(0);
  });
});

describe("inputParser", () => {
  it("should turn each line into a layer and position them at the correct layer", () => {
    const firewall = inputParser(input);

    expect(firewall[0].depth).toBe(0);
    expect(firewall[0].range).toBe(3);
    expect(firewall[0].scannerPosition).toBe(0);

    expect(firewall[1].depth).toBe(1);
    expect(firewall[1].range).toBe(2);
    expect(firewall[1].scannerPosition).toBe(0);

    expect(firewall[2]).toBe(undefined);
    expect(firewall[3]).toBe(undefined);

    expect(firewall[4].depth).toBe(4);
    expect(firewall[4].range).toBe(4);
    expect(firewall[4].scannerPosition).toBe(0);

    expect(firewall[5]).toBe(undefined);

    expect(firewall[6].depth).toBe(6);
    expect(firewall[6].range).toBe(4);
    expect(firewall[6].scannerPosition).toBe(0);
  });
});

describe("Firewall", () => {
  it("should keep track of the state of all scanners", () => {
    const firewall = new Firewall(input);
    expect(firewall.layers[0].scannerPosition).toBe(0);
    expect(firewall.layers[1].scannerPosition).toBe(0);
    expect(firewall.layers[4].scannerPosition).toBe(0);
    expect(firewall.layers[6].scannerPosition).toBe(0);

    firewall.tick();
    expect(firewall.layers[0].scannerPosition).toBe(1);
    expect(firewall.layers[1].scannerPosition).toBe(1);
    expect(firewall.layers[4].scannerPosition).toBe(1);
    expect(firewall.layers[6].scannerPosition).toBe(1);
    firewall.tick();
    expect(firewall.layers[0].scannerPosition).toBe(2);
    expect(firewall.layers[1].scannerPosition).toBe(0);
    expect(firewall.layers[4].scannerPosition).toBe(2);
    expect(firewall.layers[6].scannerPosition).toBe(2);
    firewall.tick();
    expect(firewall.layers[0].scannerPosition).toBe(1);
    expect(firewall.layers[1].scannerPosition).toBe(1);
    expect(firewall.layers[4].scannerPosition).toBe(3);
    expect(firewall.layers[6].scannerPosition).toBe(3);
    firewall.tick();
    expect(firewall.layers[0].scannerPosition).toBe(0);
    expect(firewall.layers[1].scannerPosition).toBe(0);
    expect(firewall.layers[4].scannerPosition).toBe(2);
    expect(firewall.layers[6].scannerPosition).toBe(2);
    firewall.tick();
    expect(firewall.layers[0].scannerPosition).toBe(1);
    expect(firewall.layers[1].scannerPosition).toBe(1);
    expect(firewall.layers[4].scannerPosition).toBe(1);
    expect(firewall.layers[6].scannerPosition).toBe(1);
    firewall.tick();
    expect(firewall.layers[0].scannerPosition).toBe(2);
    expect(firewall.layers[1].scannerPosition).toBe(0);
    expect(firewall.layers[4].scannerPosition).toBe(0);
    expect(firewall.layers[6].scannerPosition).toBe(0);
    firewall.tick();
    expect(firewall.layers[0].scannerPosition).toBe(1);
    expect(firewall.layers[1].scannerPosition).toBe(1);
    expect(firewall.layers[4].scannerPosition).toBe(1);
    expect(firewall.layers[6].scannerPosition).toBe(1);
  });

  it("should keep track of the packet if entered", () => {
    const firewall = new Firewall(input);
    expect(firewall.packetPosition).toBeUndefined();
    firewall.enter();
    expect(firewall.packetPosition).toBe(-1);
    firewall.tick();
    expect(firewall.packetPosition).toBe(0);
    firewall.tick();
    expect(firewall.packetPosition).toBe(1);
    firewall.tick();
    expect(firewall.packetPosition).toBe(2);
    firewall.tick();
    expect(firewall.packetPosition).toBe(3);
    firewall.tick();
    expect(firewall.packetPosition).toBe(4);
    firewall.tick();
    expect(firewall.packetPosition).toBe(5);
    firewall.tick();
    expect(firewall.packetPosition).toBe(6);
    firewall.tick();
    expect(firewall.packetPosition).toBeUndefined();
  });

  it("should keep track of when packet is caught", () => {
    const firewall = new Firewall(input);
    firewall.enter();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    expect(firewall.catches).toEqual([0, 6]);
  });
});

describe("runner", () => {
  it("should calculate the severity of the catches", () => {
    const severity = runner({
      firewall: new Firewall(input),
      packetStart: 0,
      ticks: 8
    });
    expect(severity).toBe(24);
  });
});

describe("stealthRunner", () => {
  it("should find the shortest delay needed to pass through unharmed", () => {
    expect(stealthRunner({ input })).toBe(10);
  });
});
