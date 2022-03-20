import { assert, describe, it } from "vitest";
import g2b from "./g2d";

describe("comment", () => {
  it("test", () => {
    assert.equal(g2b("#foo"), "#foo");
    assert.equal(g2b("#"), "#");
    assert.equal(g2b("#\r"), "#\r");
    assert.equal(g2b("#\n"), "#\n");
    assert.equal(g2b("#\r\n"), "#\r\n");
  });
});

describe("negative", () => {
  it("test", () => {
    assert.equal(g2b("!foo"), "!**/foo");
    assert.equal(g2b("!"), "!");
    assert.equal(g2b("! "), "!**/ ");
    assert.equal(g2b("!\n\r\n\r\n"), "!**/\n\r\n\r\n");
    assert.equal(g2b("!\r\n\n\n\n"), "!**/\r\n\n\n\n");
  });
});

describe("negative root", () => {
  it("test", () => {
    assert.equal(g2b("!/foo"), "!foo");
    assert.equal(g2b("!/"), "!");
    assert.equal(g2b("!/ "), "! ");
    assert.equal(g2b("!/\n\r\n\r\n"), "!\n\r\n\r\n");
    assert.equal(g2b("!/\r\n\n\n\n"), "!\r\n\n\n\n");
  });
});

describe("positive", () => {
  it("test", () => {
    assert.equal(g2b("foo"), "**/foo");
    assert.equal(g2b(""), "");
    assert.equal(g2b(" "), "**/ ");
    assert.equal(g2b("\n\r\n\r\n"), "**/\n\r\n\r\n");
    assert.equal(g2b("\r\n\n\n\n"), "**/\r\n\n\n\n");
  });
});

describe("positive root", () => {
  it("test", () => {
    assert.equal(g2b("/foo"), "foo");
    assert.equal(g2b("/"), "");
    assert.equal(g2b("/ "), " ");
    assert.equal(g2b("/\n\r\n\r\n"), "\n\r\n\r\n");
    assert.equal(g2b("/\r\n\n\n\n"), "\r\n\n\n\n");
  });
});
