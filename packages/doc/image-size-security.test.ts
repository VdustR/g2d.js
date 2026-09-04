import { describe, expect, it } from "vitest";
import { HEIF } from "image-size/types/heif";
import { ICNS } from "image-size/types/icns";
import { JXL } from "image-size/types/jxl";

function writeBox(
  input: Uint8Array,
  offset: number,
  size: number,
  name: string
) {
  new DataView(input.buffer).setUint32(offset, size, false);
  input.set(new TextEncoder().encode(name), offset + 4);
}

describe("patched image-size parsers", () => {
  it("rejects a zero-length ICNS image entry", () => {
    const input = new Uint8Array(16);
    input.set(new TextEncoder().encode("icns"));
    new DataView(input.buffer).setUint32(4, input.length, false);
    input.set(new TextEncoder().encode("ic07"), 8);

    expect(() => ICNS.calculate(input)).toThrow("zero-length image entry");
  });

  it("rejects a zero-length HEIF ispe box", () => {
    const input = new Uint8Array(48);
    writeBox(input, 0, 40, "meta");
    writeBox(input, 12, 28, "iprp");
    writeBox(input, 20, 20, "ipco");
    writeBox(input, 28, 0, "ispe");

    expect(() => HEIF.calculate(input)).toThrow("zero-length box");
  });

  it("rejects a zero-length box while scanning HEIF metadata", () => {
    const input = new Uint8Array(16);
    writeBox(input, 0, 0, "skip");

    expect(() => HEIF.calculate(input)).toThrow("zero-length box");
  });

  it("rejects a zero-length JXL partial codestream box", () => {
    const input = new Uint8Array(12);
    writeBox(input, 0, 0, "jxlp");

    expect(() => JXL.calculate(input)).toThrow("zero-length box");
  });

  it("rejects a zero-length box while scanning a JXL container", () => {
    const input = new Uint8Array(12);
    writeBox(input, 0, 0, "skip");

    expect(() => JXL.calculate(input)).toThrow("zero-length box");
  });
});
