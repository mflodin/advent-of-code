import {
  lineParser,
  inputParser,
  Firewall,
  Packet,
  runner,
  stealthRunner,
  mathRunner
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
    const packet = new Packet();

    expect(firewall.packets[0]).toBeUndefined();

    firewall.enter(packet);
    expect(firewall.packets[0].position).toBe(-1);
    firewall.tick();
    expect(firewall.packets[0].position).toBe(0);
    firewall.tick();
    expect(firewall.packets[0].position).toBe(1);
    firewall.tick();
    expect(firewall.packets[0].position).toBe(2);
    firewall.tick();
    expect(firewall.packets[0].position).toBe(3);
    firewall.tick();
    expect(firewall.packets[0].position).toBe(4);
    firewall.tick();
    expect(firewall.packets[0].position).toBe(5);
    firewall.tick();
    expect(firewall.packets[0].position).toBe(6);
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    expect(firewall.packets[0]).toBeUndefined();
  });

  it("should keep track of when packet is caught", () => {
    const firewall = new Firewall(input);
    const packet = new Packet();
    firewall.enter(packet);
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    firewall.tick();
    expect(packet.catches).toEqual([0, 6]);
  });
});

describe("runner", () => {
  it("should calculate the severity of the catches", () => {
    const firewall = new Firewall(input);
    const packets = runner({
      firewall: firewall,
      limit: 9
    });

    const severity = packets[0].severity({ firewall });
    expect(severity).toBe(24);
  });
});

describe("stealthRunner", () => {
  it("should find the shortest delay needed to pass through unharmed", () => {
    expect(stealthRunner({ input, limit: 22 })).toBe(10);
  });
});

describe("mathRunner", () => {
  it("should find the shortest delay needed to pass through unharmed", () => {
    expect(mathRunner({ input })).toBe(10);
  });
});
