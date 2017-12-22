import { parseLine, parse, GPU } from "../20";

describe("parseLine", () => {
  it("should parse a line into a particle", () => {
    const particle = parseLine("p=<11,2,3>, v=<4,-52,-6>, a=<7,83,-9>");
    expect(particle.p.x).toBe(11);
    expect(particle.p.y).toBe(2);
    expect(particle.p.z).toBe(3);
    expect(particle.v.x).toBe(4);
    expect(particle.v.y).toBe(-52);
    expect(particle.v.z).toBe(-6);
    expect(particle.a.x).toBe(7);
    expect(particle.a.y).toBe(83);
    expect(particle.a.z).toBe(-9);
  });
});

describe("parse", () => {
  it("should parse all lines of the input into particles", () => {
    const input = `
p=<1,2,3>, v=<4,-5,-6>, a=<7,8,-9>
p=<11,12,13>, v=<14,-15,-16>, a=<17,18,-19>
p=<21,22,23>, v=<24,-25,-26>, a=<27,28,-29>
p=<31,32,33>, v=<34,-35,-36>, a=<37,38,-39>
`;
    const X = parse(input);

    const [A, B, C, D] = X;

    expect(A.p.x).toBe(1);
    expect(B.p.y).toBe(12);
    expect(C.p.z).toBe(23);
    expect(D.p.x).toBe(31);
    expect(A.v.x).toBe(4);
    expect(B.v.y).toBe(-15);
    expect(C.v.z).toBe(-26);
    expect(D.v.x).toBe(34);
    expect(A.a.x).toBe(7);
    expect(B.a.y).toBe(18);
    expect(C.a.z).toBe(-29);
    expect(D.a.x).toBe(37);
  });
});

describe("GPU", () => {
  it("should update the velocities and positions of each particle", () => {
    const input = `
p=<0,0,0>, v=<0,0,0>, a=<0,0,0>
p=<3,0,0>, v=<0,2,0>, a=<0,0,1>
p=<1,3,3>, v=<0,0,0>, a=<-1,-2,-3>
`;

    const gpu = new GPU(input);
    gpu.tick();

    expect(gpu.particles[0].p.x).toBe(0, "[0].p.x");
    expect(gpu.particles[0].p.y).toBe(0, "[0].p.y");
    expect(gpu.particles[0].p.z).toBe(0, "[0].p.z");
    expect(gpu.particles[0].v.x).toBe(0, "[0].v.x");
    expect(gpu.particles[0].v.y).toBe(0, "[0].v.y");
    expect(gpu.particles[0].v.z).toBe(0, "[0].v.z");
    expect(gpu.particles[0].a.x).toBe(0, "[0].a.x");
    expect(gpu.particles[0].a.y).toBe(0, "[0].a.y");
    expect(gpu.particles[0].a.z).toBe(0, "[0].a.z");

    expect(gpu.particles[1].p.x).toBe(3, "[1].p.x");
    expect(gpu.particles[1].p.y).toBe(2, "[1].p.y");
    expect(gpu.particles[1].p.z).toBe(1, "[1].p.z");
    expect(gpu.particles[1].v.x).toBe(0, "[1].v.x");
    expect(gpu.particles[1].v.y).toBe(2, "[1].v.y");
    expect(gpu.particles[1].v.z).toBe(1, "[1].v.z");
    expect(gpu.particles[1].a.x).toBe(0, "[1].a.x");
    expect(gpu.particles[1].a.y).toBe(0, "[1].a.y");
    expect(gpu.particles[1].a.z).toBe(1, "[1].a.z");

    expect(gpu.particles[2].p.x).toBe(0, "[2].p.x");
    expect(gpu.particles[2].p.y).toBe(1, "[2].p.y");
    expect(gpu.particles[2].p.z).toBe(0, "[2].p.z");
    expect(gpu.particles[2].v.x).toBe(-1, "[2].v.x");
    expect(gpu.particles[2].v.y).toBe(-2, "[2].v.y");
    expect(gpu.particles[2].v.z).toBe(-3, "[2].v.z");
    expect(gpu.particles[2].a.x).toBe(-1, "[2].a.x");
    expect(gpu.particles[2].a.y).toBe(-2, "[2].a.y");
    expect(gpu.particles[2].a.z).toBe(-3, "[2].a.z");
  });

  it("should remove particles that collide", () => {
    const input = `
p=<0,0,0>, v=<0,0,0>, a=<0,0,0>
p=<0,0,0>, v=<0,2,0>, a=<0,0,1>
p=<1,0,0>, v=<0,0,0>, a=<0,0,0>
p=<0,0,1>, v=<0,1,0>, a=<0,1,0>
p=<1,2,3>, v=<0,0,0>, a=<-1,-2,-3>
`;

    const gpu = new GPU(input);
    gpu.tick();

    expect(gpu.particles.length).toBe(1);
  });
});
