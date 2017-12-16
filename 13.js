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
  this.packets = [];
  this.ticks = 0;
  this.tick = function tick() {
    // let t0 = performance.now();
    this.packets.forEach(packet => {
      if (packet === undefined) {
        return undefined;
      }

      // if (packet.position !== undefined) {
      if (packet.position <= this.layers.length) {
        packet.position += 1;
      }
      // }
      //
      // if (packet.position > this.layers.length) {
      //   return undefined;
      // }

      if (
        this.layers[packet.position] !== undefined &&
        this.layers[packet.position].scannerPosition === 0
      ) {
        packet.catches.push(packet.position);
      }

      // return packet;
    });

    this.layers.forEach((layer, i) => {
      // if (layer === undefined) {
      //   console.log("hi");
      //   return layer;
      // }
      // console.log(layer.depth, i);
      layer.scannerPosition = layer.scannerPosition + layer.scannerDirection;
      if (layer.scannerPosition === layer.range - 1) {
        layer.scannerDirection = -1;
      } else if (layer.scannerPosition === 0) {
        layer.scannerDirection = 1;
      }
      //
      // layer.scannerPosition =
      //   (layer.scannerPosition + 1) % (2 * (layer.range - 1));

      // return layer;
    });

    this.ticks += 1;

    if (this.ticks % 10 === 0) {
      this.packets = this.packets.filter(p => {
        return p && p.position < this.layers.length;
      });
      // let t1 = performance.now();
      // console.log("tock", this.ticks, this.packets.length, "t: ", t1 - t0);
    }
  };

  this.enter = function enter(packet) {
    this.packets.push(packet);
  };
}

export function Packet({ delay = 0 } = {}) {
  this.delay = delay;
  this.position = -1;
  this.catches = [];
  this.severity = ({ firewall }) => {
    return this.catches.reduce((acc, curr) => {
      const layer = firewall.layers[curr];
      return acc + layer.depth * layer.range;
    }, 0);
  };
}

export function runner({ firewall, limit = 1000 }) {
  let layerLength = firewall.layers.length;
  let packets = [];
  let t0 = Date.now();

  for (var tick = 0; tick < limit; tick++) {
    if (tick % 100000 === 1) {
      t0 = Date.now();
    }
    let packet = new Packet({ delay: tick });
    packets.push(packet);

    firewall.enter(packet);
    firewall.tick();

    if (tick > 0 && tick % 100 === 0) {
      packets = packets.filter(p => {
        return p.catches.length === 0;
      });
    }

    if (tick % 100000 === 0) {
      let t1 = Date.now();
      console.log("tick", tick, "t", t1 - t0);
    }
  }

  return packets;
}

export function stealthRunner({ input, limit = 1000, minDelay = 0 }) {
  let delay = minDelay;
  let firewall = new Firewall(input);
  // while (delay < limit) {
  // let t0 = performance.now();
  let packets = runner({
    firewall,
    limit: limit
    // earlyExit: true
  });
  // let t1 = performance.now();

  const safePackets = packets.filter(
    p => p.catches.length === 0 && p.position >= firewall.layers.length
  );

  if (!safePackets.length > 0) {
    return undefined;
  }

  return safePackets[0].delay;

  // console.log("delay", delay, "t", t1 - t0);
  // if (severity === undefined) {
  //   return delay;
  // }
  // delay += 1;
}

export function mathRunner({ input, limit = 10 }) {
  let layers = inputParser(input)
    .filter(l => l)
    .map(layer => {
      return {
        depth: layer.depth,
        rangeMod: 2 * (layer.range - 1),
        range: layer.range
      };
    });

  // layers = layers.slice(1, 2);

  // console.log(layers);

  for (var i = 0; i <= limit; i++) {
    let hits = layers.every(({ rangeMod, depth }) => {
      // console.log(i, depth, rangeMod, (i + depth) % rangeMod);
      return (i + depth) % rangeMod !== 0;
    });

    if (hits) {
      // console.log("hits", hits);
      return i;
    }
  }
  return -1;
}
// }
