import { findBottom, toTree, weightMapper, balancer } from "../7";

const input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`;

describe("findBottom", function() {
  it("should find the bottom program", function() {
    const result = findBottom(input);
    expect(result).toBe("tknk");
  });
});

describe("toTree", function() {
  it("should turn the input into a tree", function() {
    const tree = toTree(input);
    expect(tree).toEqual({
      name: "tknk",
      weight: 41,
      children: [
        {
          name: "ugml",
          weight: 68,
          children: [
            {
              name: "gyxo",
              weight: 61
            },
            {
              name: "ebii",
              weight: 61
            },
            {
              name: "jptl",
              weight: 61
            }
          ]
        },
        {
          name: "padx",
          weight: 45,
          children: [
            {
              name: "pbga",
              weight: 66
            },
            {
              name: "havc",
              weight: 66
            },
            {
              name: "qoyq",
              weight: 66
            }
          ]
        },
        {
          name: "fwft",
          weight: 72,
          children: [
            {
              name: "ktlj",
              weight: 57
            },
            {
              name: "cntj",
              weight: 57
            },
            {
              name: "xhth",
              weight: 57
            }
          ]
        }
      ]
    });
  });
});

describe("weightMapper", function() {
  it("should calculate the weights of all the node's children and itself", function() {
    const weightTree = weightMapper(toTree(input));
    expect(weightTree.children[0].name).toBe("ugml");
    expect(weightTree.children[0].fullWeight).toBe(251);
    expect(weightTree.children[1].name).toBe("padx");
    expect(weightTree.children[1].fullWeight).toBe(243);
    expect(weightTree.children[2].name).toBe("fwft");
    expect(weightTree.children[2].fullWeight).toBe(243);
  });
});

describe("balancer", function() {
  it("should report the unbalanced node", function() {
    const res = balancer(weightMapper(toTree(input)));
    expect(res.name).toBe("ugml");
    expect(res.balancedWeight).toBe(60);
  });
});
