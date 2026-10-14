import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const corePath = require.resolve("@docusaurus/core/package.json");
const serverPath = createRequire(corePath).resolve(
  "webpack-dev-server/package.json"
);
const editorPath = createRequire(serverPath).resolve("launch-editor/package.json");
const shellQuotePath = createRequire(editorPath).resolve("shell-quote");
const { quote, parse } = require(shellQuotePath) as {
  quote: (tokens: (string | { comment: string })[]) => string;
  parse: (command: string) => unknown[];
};

describe("documentation toolchain shell-quote safety", () => {
  // GHSA-pqg4-j6r4-53mv: a later line terminator can escape the comment.
  it.each(["\n", "\r", "\u2028", "\u2029"])(
    "rejects line terminator %j after a comment token",
    (separator) => {
      expect(() =>
        quote(["echo", "ok", { comment: "x" }, `a${separator}printf marker;#`])
      ).toThrow(TypeError);
    }
  );

  it("preserves ordinary argument quoting", () => {
    const tokens = ["code", "file with spaces.ts", "apostrophe's", "semi;colon"];
    expect(parse(quote(tokens))).toEqual(tokens);
  });

  it("preserves editor command parsing used by launch-editor", () => {
    expect(parse('code --wait "file with spaces.ts"')).toEqual([
      "code",
      "--wait",
      "file with spaces.ts",
    ]);
  });

  it("allows line terminators when there is no preceding comment", () => {
    expect(parse(quote(["echo", "line one\nline two"]))).toEqual([
      "echo",
      "line one\nline two",
    ]);
  });

  it("preserves comments followed by ordinary text", () => {
    expect(quote(["echo", "ok", { comment: "x" }, "ordinary"])).toBe(
      "echo ok #x ordinary"
    );
  });
});
