import { garbageRemover, groupScorer, garbageScorer } from "../9";

describe("garbageRemover", function() {
  it("should do nothing if no garbage exist", function() {
    expect(garbageRemover("{}")).toBe("{}");
    expect(garbageRemover("{{{}}}")).toBe("{{{}}}");
    expect(garbageRemover("{{},{}}")).toBe("{{},{}}");
    expect(garbageRemover("{{{},{},{{}}}}")).toBe("{{{},{},{{}}}}");
  });
  it("should remove all garbage between <>", function() {
    expect(garbageRemover("<>")).toBe("<>");
    expect(garbageRemover("<random characters>")).toBe("<>");
    expect(garbageRemover("<<<<>")).toBe("<>");

    expect(garbageRemover("{<{},{},{{}}>}")).toBe("{<>}");
    expect(garbageRemover("{<a>,<a>,<a>,<a>}")).toBe("{<>,<>,<>,<>}");
    expect(garbageRemover("{{<a>},{<a>},{<a>},{<a>}}")).toBe(
      "{{<>},{<>},{<>},{<>}}"
    );
  });
  it("should remove all garbage between <>, but ! ignores next character", function() {
    expect(garbageRemover("<{!>}>")).toBe("<>");
    expect(garbageRemover("<!!>")).toBe("<>");
    expect(garbageRemover("<!!!>>")).toBe("<>");
    expect(garbageRemover('<{o"i!a,<{i<a>')).toBe("<>");

    expect(garbageRemover("{{<!>},{<!>},{<!>},{<a>}}")).toBe("{{<>}}");
    expect(garbageRemover("{{<!!>},{<!!>},{<!!>},{<!!>}}")).toBe(
      "{{<>},{<>},{<>},{<>}}"
    );
    expect(garbageRemover("{{<a!>},{<a!>},{<a!>},{<ab>}}")).toBe("{{<>}}");
  });
});

describe("groupScorer", function() {
  it("should score groups according to the rules", function() {
    expect(groupScorer("{}")).toBe(1);
    expect(groupScorer("{{{}}}")).toBe(1 + 2 + 3);
    expect(groupScorer("{{},{}}")).toBe(1 + 2 + 2);
    expect(groupScorer("{{{},{},{{}}}}")).toBe(1 + 2 + 3 + 3 + 3 + 4);
    expect(groupScorer("{<a>,<a>,<a>,<a>}")).toBe(1);
    expect(groupScorer("{{<ab>},{<ab>},{<ab>},{<ab>}}")).toBe(
      1 + 2 + 2 + 2 + 2
    );
    expect(groupScorer("{{<!!>},{<!!>},{<!!>},{<!!>}}")).toBe(
      1 + 2 + 2 + 2 + 2
    );
    expect(groupScorer("{{<a!>},{<a!>},{<a!>},{<ab>}}")).toBe(1 + 2);
  });
});
describe("garbageScorer", function() {
  it("should score garbage according to the rules", function() {
    expect(garbageScorer("<>")).toBe(0);
    expect(garbageScorer("<random characters>")).toBe(17);
    expect(garbageScorer("<<<<>")).toBe(3);
    expect(garbageScorer("<{!>}>")).toBe(2);
    expect(garbageScorer("<!!>")).toBe(0);
    expect(garbageScorer("<!!!>>")).toBe(0);
    expect(garbageScorer('<{o"i!a,<{i<a>')).toBe(10);
    expect(garbageScorer('{{<<<<>},<{o"i!a,<{i<a>,<{!>}>}')).toBe(15);
  });
});
