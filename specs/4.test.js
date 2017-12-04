import { validate, count, validate2 } from "../4";

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
    expect(
      count(validate, "aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa")
    ).toBe(2);
    expect(count(validate, "")).toBe(0);
    expect(count(validate, "\n\n\n")).toBe(0);
    expect(count(validate, "aa\naa\naa ")).toBe(3);
    expect(count(validate, "aa\naa a aa\naa a")).toBe(2);
    expect(count(validate, "aa bb bb\naa b bb\naa b b")).toBe(1);
    expect(
      count(
        validate,
        "aa bb aa\naa bb aa\naa bb aa\naa bb aa\naa bb aa\naa\naa "
      )
    ).toBe(2);
  });
});

describe("validate2", () => {
  it("should validate abcde fghij", () => {
    expect(validate2("abcde fghij")).toBe(true);
  });
  it("should not validate abcde xyz ecdab", () => {
    expect(validate2("abcde xyz ecdab")).toBe(false);
  });
  it("should validate a ab abc abd abf abj", () => {
    expect(validate2("a ab abc abd abf abj")).toBe(true);
  });

  it("should not validate oiii ioii iioi iiio", () => {
    expect(validate2("oiii ioii iioi iiio")).toBe(false);
  });

  it("should validate iiii oiii ooii oooi oooo", () => {
    expect(validate2("iiii oiii ooii oooi oooo")).toBe(true);
  });
});

// abcde fghij is a valid passphrase.
// abcde xyz ecdab is not valid - the letters from the third word can be rearranged to form the first word.
// a ab abc abd abf abj is a valid passphrase, because all letters need to be used when forming another word.
// iiii oiii ooii oooi oooo is valid.
// oiii ioii iioi iiio is not valid - any of these words can be rearranged to form any other word.
