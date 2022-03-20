import { detectNewline } from "detect-newline";

export default function g2b(input: string): string {
  const eol = detectNewline(input) || "\n";
  return input
    .split(eol)
    .map((line) => {
      if (!line || line.startsWith("#")) return line;
      const isNegative = line.startsWith("!");
      const gitPath = isNegative ? line.slice(1) : line;
      const dockerPath = !gitPath
        ? ""
        : gitPath.startsWith("/")
        ? gitPath.slice(1)
        : `**/${gitPath}`;
      return isNegative ? `!${dockerPath}` : dockerPath;
    })
    .join(eol);
}
