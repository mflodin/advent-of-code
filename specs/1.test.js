import { captcha, captcha2 } from "../1";

describe("Part one", function() {
  it("should return 3 for 1122", function() {
    expect(captcha("1122")).toBe(3);
  });

  it("should return 4 for 1111", function() {
    expect(captcha("1111")).toBe(4);
  });

  it("should return 0 for 1234", function() {
    expect(captcha("1234")).toBe(0);
  });

  it("should return 9 for 91212129", function() {
    expect(captcha("91212129")).toBe(9);
  });
});

describe("Part two", function() {
  it("should return 6 for 1212", function() {
    expect(captcha2("1212")).toBe(6);
  });

  it("should return 0 for 1221", function() {
    expect(captcha2("1221")).toBe(0);
  });

  it("should return 4 for 123425", function() {
    expect(captcha2("123425")).toBe(4);
  });

  it("should return 12 for 123123", function() {
    expect(captcha2("123123")).toBe(12);
  });

  it("should return 4 for 12131415", function() {
    expect(captcha2("12131415")).toBe(4);
  });
});
