export function GPU(input) {
  this.i = 0;
  this.particles = parse(input);

  this.tick = () => {
    this.i += 1;
    this.byPos = {};
    this.particles.forEach(particle => {
      particle.v.x += particle.a.x;
      particle.v.y += particle.a.y;
      particle.v.z += particle.a.z;

      particle.p.x += particle.v.x;
      particle.p.y += particle.v.y;
      particle.p.z += particle.v.z;

      particle.distance =
        Math.abs(particle.p.x) +
        Math.abs(particle.p.y) +
        Math.abs(particle.p.z);

      let pos = JSON.stringify(particle.p);
      this.byPos[pos] = this.byPos[pos] || [];
      this.byPos[pos].push(particle.id);
    });

    const duplicates = Object.keys(this.byPos)
      .filter(key => this.byPos[key].length > 1)
      .reduce((acc, curr) => {
        return [...acc, ...this.byPos[curr]];
      }, []);
    if (duplicates.length) {
      // console.log("i", this.i, "dup", duplicates);
    }

    this.particles = this.particles.filter(p => !duplicates.includes(p.id));
  };
}

export function parse(input) {
  return input
    .split(/\n/)
    .filter(l => l)
    .map(parseLine);
}

export function parseLine(line, i) {
  const [_, p, v, a] = line.match(/p=<(.*?)>, v=<(.*?)>, a=<(.*?)>/);
  return { id: i, p: parseVector(p), v: parseVector(v), a: parseVector(a) };
}

function parseVector(v) {
  const [x, y, z] = v.split(",").map(n => Number(n));
  return { x, y, z };
}
