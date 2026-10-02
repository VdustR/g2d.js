import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { HEIF } from "image-size/types/heif";
import { ICNS } from "image-size/types/icns";
import { JXL } from "image-size/types/jxl";

const require = createRequire(import.meta.url);

function expectParserError(type: "heif" | "icns" | "jxl", input: Uint8Array) {
  // A test timeout cannot interrupt a synchronous parser loop in this process.
  const parserPath = require.resolve(`image-size/types/${type}`);
  const script = `
    const parser = require(${JSON.stringify(parserPath)})[${JSON.stringify(type.toUpperCase())}];
    try {
      parser.calculate(Uint8Array.from(${JSON.stringify(Array.from(input))}));
      process.exitCode = 1;
    } catch (error) {
      if (!(error instanceof TypeError)) throw error;
      console.log(error.message);
    }
  `;
  const result = spawnSync(process.execPath, ["-e", script], {
    encoding: "utf8",
    timeout: 2000,
  });

  expect(result.error).toBeUndefined();
  expect(result.signal).toBeNull();
  expect(result.status, result.stderr).toBe(0);
  expect(result.stdout).toContain(`Invalid ${type.toUpperCase()}`);
}

function writeBox(
  input: Uint8Array,
  offset: number,
  size: number,
  name: string
) {
  new DataView(input.buffer).setUint32(offset, size, false);
  input.set(new TextEncoder().encode(name), offset + 4);
}

describe("image-size parser security", () => {
  it("rejects a zero-length ICNS image entry", () => {
    const input = new Uint8Array(16);
    input.set(new TextEncoder().encode("icns"));
    new DataView(input.buffer).setUint32(4, input.length, false);
    input.set(new TextEncoder().encode("ic07"), 8);

    expectParserError("icns", input);
  });

  it("rejects a zero-length HEIF ispe box", () => {
    const input = new Uint8Array(48);
    writeBox(input, 0, 40, "meta");
    writeBox(input, 12, 28, "iprp");
    writeBox(input, 20, 20, "ipco");
    writeBox(input, 28, 0, "ispe");

    expectParserError("heif", input);
  });

  it("rejects a zero-length box while scanning HEIF metadata", () => {
    const input = new Uint8Array(16);
    writeBox(input, 0, 0, "skip");

    expectParserError("heif", input);
  });

  it("rejects a zero-length JXL partial codestream box", () => {
    const input = new Uint8Array(12);
    writeBox(input, 0, 0, "jxlp");

    expectParserError("jxl", input);
  });

  it("rejects a zero-length box while scanning a JXL container", () => {
    const input = new Uint8Array(12);
    writeBox(input, 0, 0, "skip");

    expectParserError("jxl", input);
  });
});

describe("image-size valid inputs", () => {
  it("reads ICNS dimensions", () => {
    const input = new Uint8Array(16);
    input.set(new TextEncoder().encode("icns"));
    new DataView(input.buffer).setUint32(4, input.length, false);
    input.set(new TextEncoder().encode("ic07"), 8);
    new DataView(input.buffer).setUint32(12, 8, false);

    expect(ICNS.calculate(input)).toEqual({ width: 128, height: 128 });
  });

  it("reads HEIF dimensions", () => {
    const input = new Uint8Array(48);
    writeBox(input, 0, 48, "meta");
    writeBox(input, 12, 36, "iprp");
    writeBox(input, 20, 28, "ipco");
    writeBox(input, 28, 20, "ispe");
    new DataView(input.buffer).setUint32(40, 320, false);
    new DataView(input.buffer).setUint32(44, 240, false);

    expect(HEIF.calculate(input)).toMatchObject({ width: 320, height: 240 });
  });

  it("reads JXL codestream dimensions", () => {
    const input = new Uint8Array(12);
    writeBox(input, 0, 12, "jxlc");
    input.set([0xff, 0x0a, 0x01, 0x00], 8);

    expect(JXL.calculate(input)).toEqual({ width: 8, height: 8 });
  });
});
