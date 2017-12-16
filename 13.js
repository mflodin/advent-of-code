import { performance } from "perf_hooks";

export function lineParser(string) {
  const [depth, range] = string.split(/:\s/).map(n => Number(n));
  return { depth, range, scannerPosition: 0, scannerDirection: 1 };
}

export function inputParser(input) {
  const layers = input
    .split(/\n/)
    .filter(n => n)
    .map(lineParser);

  let firewall = [];
  layers.forEach(layer => {
    firewall[layer.depth] = layer;
  });

  return firewall;
}

export function Firewall(layers) {
  this.layers = inputParser(layers);
  this.tick = function tick() {
    if (this.packetPosition !== undefined) {
      this.packetPosition += 1;
    }
    if (this.packetPosition >= this.layers.length) {
      this.packetPosition = undefined;
    }

    if (
      this.layers[this.packetPosition] &&
      this.layers[this.packetPosition].scannerPosition === 0
    ) {
      this.catches.push(this.packetPosition);
    }

    this.layers.forEach(layer => {
      layer.scannerPosition = layer.scannerPosition + layer.scannerDirection;
      if (layer.scannerPosition === layer.range - 1) {
        layer.scannerDirection = -1;
      } else if (layer.scannerPosition === 0) {
        layer.scannerDirection = 1;
      }
    });
  };

  this.enter = function enter() {
    this.packetPosition = -1;
    this.catches = [];
  };
}

export function runner({ firewall, packetStart, earlyExit = false }) {
  const ticks = firewall.layers.length + packetStart;
  for (var tick = 0; tick < ticks; tick++) {
    if (tick === packetStart) {
      firewall.enter();
    }
    firewall.tick();
    if (
      tick >= packetStart &&
      earlyExit &&
      firewall.catches &&
      firewall.catches.length > 0
    ) {
      return -1;
    }
  }

  if (firewall.catches.length === 0) {
    return undefined;
  }

  return firewall.catches.reduce((acc, curr) => {
    const layer = firewall.layers[curr];
    return acc + layer.depth * layer.range;
  }, 0);
}

export function stealthRunner({ input, limit = 1000, minDelay = 0 }) {
  let delay = minDelay;
  while (delay < limit) {
    let t0 = performance.now();
    let severity = runner({
      firewall: new Firewall(input),
      packetStart: delay,
      earlyExit: true
    });
    let t1 = performance.now();

    console.log("delay", delay, "t", t1 - t0);
    if (severity === undefined) {
      return delay;
    }
    delay += 1;
  }
}
