import { validate, count } from "../4";

describe("validate", () => {
  it("should validate aa bb cc dd ee", () => {
    expect(validate("aa bb cc dd ee")).toBe(true);
  });

  it("should not validate aa bb cc dd aa", () => {
    expect(validate("aa bb cc dd aa")).toBe(false);
  });

  it("should validate aa bb cc dd aaa", () => {
    expect(validate("aa bb cc dd aaa")).toBe(true);
  });
});
describe("count", () => {
  it("should count valid phrases", () => {
    expect(count("aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa")).toBe(2);
    expect(count("")).toBe(0);
    expect(count("\n\n\n")).toBe(0);
    expect(count("aa\naa\naa ")).toBe(3);
    expect(count("aa\naa a aa\naa a")).toBe(2);
    expect(count("aa bb bb\naa b bb\naa b b")).toBe(1);
    expect(
      count("aa bb aa\naa bb aa\naa bb aa\naa bb aa\naa bb aa\naa\naa ")
    ).toBe(2);
  });
});
