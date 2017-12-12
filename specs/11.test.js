import { Walker, toArray } from "../11";

// describe("node", function() {
//   it("should start out with null for each direction", function() {
//     const node = new Node();
//     expect(node.n).toBe(null);
//     expect(node.ne).toBe(null);
//     expect(node.nw).toBe(null);
//     expect(node.s).toBe(null);
//     expect(node.se).toBe(null);
//     expect(node.sw).toBe(null);
//   });
//
//   // xit("should start get all its neighbours when it is visited", function() {
//   //   const node = new Node();
//   //   expect(node.n).toBe(null);
//   //   expect(node.ne).toBe(null);
//   //   expect(node.nw).toBe(null);
//   //   expect(node.s).toBe(null);
//   //   expect(node.se).toBe(null);
//   //   expect(node.sw).toBe(null);
//   // });
// });

describe("toArray", function() {
  it("gets an array of directions from a csv", function() {
    expect(toArray("ne,ne,ne\n")).toEqual(["ne", "ne", "ne"]);
  });
});

describe("Stepper", function() {
  it("should start out at 0,0", function() {
    const walker = new Walker();
    expect(walker.x).toBe(0);
    expect(walker.y).toBe(0);
    expect(walker.distance).toBe(0);
  });
  it("ne,ne,ne is 3 steps away.", function() {
    const walker = new Walker();
    walker.walk("ne");
    walker.walk("ne");
    walker.walk("ne");
    expect(walker.x).toBe(1.5);
    expect(walker.y).toBe(1.5);
    expect(walker.distance).toBe(3);
  });
  it("ne,ne,sw,sw is 0 steps away (back where you started).", function() {
    const walker = new Walker();
    walker.walk("ne");
    walker.walk("ne");
    walker.walk("sw");
    walker.walk("sw");
    expect(walker.x).toBe(0);
    expect(walker.y).toBe(0);
    expect(walker.distance).toBe(0);
  });
  it("ne,ne,s,s is 2 steps away (se,se).", function() {
    const walker = new Walker();
    walker.walk("ne");
    walker.walk("ne");
    walker.walk("s");
    walker.walk("s");
    expect(walker.x).toBe(1);
    expect(walker.y).toBe(-1);
    expect(walker.distance).toBe(2);
  });
  it("se,sw,se,sw,sw is 3 steps away (s,s,sw).", function() {
    const walker = new Walker();
    walker.walk("se");
    walker.walk("sw");
    walker.walk("se");
    walker.walk("sw");
    walker.walk("sw");
    expect(walker.x).toBe(-0.5);
    expect(walker.y).toBe(-2.5);
    expect(walker.distance).toBe(3);
  });
  it("ne,ne,ne is at most 3 steps away.", function() {
    const walker = new Walker();
    walker.walk("ne");
    walker.walk("ne");
    walker.walk("ne");
    expect(walker.maxDistance).toBe(3);
  });
  it("ne,ne,sw,sw is at most 2 steps away (back where you started).", function() {
    const walker = new Walker();
    walker.walk("ne");
    walker.walk("ne");
    walker.walk("sw");
    walker.walk("sw");
    expect(walker.maxDistance).toBe(2);
  });
  it("ne,ne,s,s is at most 2 steps away (se,se).", function() {
    const walker = new Walker();
    walker.walk("ne");
    walker.walk("ne");
    walker.walk("s");
    walker.walk("s");
    expect(walker.maxDistance).toBe(2);
  });
  it("se,sw,se,sw,sw is at most 3 steps away (s,s,sw).", function() {
    const walker = new Walker();
    walker.walk("se");
    walker.walk("sw");
    walker.walk("se");
    walker.walk("sw");
    walker.walk("sw");
    expect(walker.maxDistance).toBe(3);
  });
});
