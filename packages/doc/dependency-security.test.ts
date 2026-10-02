import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const dependencyPath = (parentPath: string, name: string) =>
  createRequire(parentPath).resolve(name);
const corePath = require.resolve("@docusaurus/core/package.json");
const legacyMinimatchPath = dependencyPath(
  dependencyPath(corePath, "serve-handler"),
  "minimatch"
);
const minimatchPath = dependencyPath(require.resolve("glob"), "minimatch");
const fastUriPath = dependencyPath(
  dependencyPath(
    dependencyPath(dependencyPath(corePath, "webpack"), "schema-utils"),
    "ajv"
  ),
  "fast-uri"
);

function expandInChild(parserPath: string, pattern: string) {
  // Synchronous parser loops must be isolated so their timeout can kill them.
  const script = `
    const parser = require(${JSON.stringify(parserPath)});
    const expand = typeof parser === "function" ? parser : parser.expand;
    const pattern = require("node:fs").readFileSync(0, "utf8");
    const output = expand(pattern);
    console.log(JSON.stringify({ count: output.length, first: output[0] }));
  `;
  const result = spawnSync(process.execPath, ["-e", script], {
    input: pattern,
    encoding: "utf8",
    timeout: 2000,
  });

  expect(result.error).toBeUndefined();
  expect(result.signal).toBeNull();
  expect(result.status, result.stderr).toBe(0);
  return JSON.parse(result.stdout) as { count: number; first: string };
}

const attackPatterns = [
  ["chained comma groups", "{" + "{a},".repeat(10000) + "b}"],
  ["large comma arrays", "{{x}," + "a,".repeat(140000) + "b}"],
  ["nested comma groups", "{a,".repeat(6000) + "z" + "}".repeat(6000)],
  ["nested single sets", "{".repeat(6000) + "a,b" + "}".repeat(6000)],
  ["repeated brace rewrites", "{a}" + "}".repeat(64000) + ",z}"],
] as const;

for (const [name, parentPath] of [
  ["Docusaurus minimatch", legacyMinimatchPath],
  ["glob minimatch", minimatchPath],
] as const) {
  describe(`${name} brace-expansion security`, () => {
    const parserPath = dependencyPath(parentPath, "brace-expansion");

    it.each(attackPatterns)("terminates for %s", (_name, pattern) => {
      expect(expandInChild(parserPath, pattern).count).toBeGreaterThan(0);
    });

    it.each([
      ["src/{core,cli}/*.ts", 2, "src/core/*.ts"],
      ["file{1..3}.txt", 3, "file1.txt"],
      ["x{{a,b}}y", 2, "x{a}y"],
      ["plain.txt", 1, "plain.txt"],
    ] as const)("preserves expansion of %s", (pattern, count, first) => {
      expect(expandInChild(parserPath, pattern)).toEqual({ count, first });
    });
  });
}

describe("AJV fast-uri host normalization", () => {
  const uri = require(fastUriPath) as {
    parse: (input: string) => { host: string };
    normalize: (input: string) => string;
    equal: (left: string, right: string) => boolean;
  };

  it("normalizes percent-encoded uppercase host characters", () => {
    expect(uri.parse("//%41.com").host).toBe("a.com");
    expect(uri.normalize("//%41.com")).toBe("//a.com");
    expect(uri.equal("//%41.com", "//a.com")).toBe(true);
  });

  it("preserves ordinary URI host normalization", () => {
    expect(uri.parse("https://EXAMPLE.com/path").host).toBe("example.com");
    expect(uri.equal("//A.com", "//a.com")).toBe(true);
  });
});
