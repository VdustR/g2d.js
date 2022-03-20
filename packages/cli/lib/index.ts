import g2d from "@g2d/core";
import cac from "cac";
import fs from "fs-extra";
import getStdin from "get-stdin";
import { resolve } from "path";
import cwd from "./cwd";
import findGitIgnore from "./findGitignore";
import getTargetPath from "./getTargetPath";
import inspect from "./inspect";
import readGitignore from "./readGitignore";
import version from "./version";

const cli = cac("g2d");

cli
  .command("[file]", "Transform a specific file")
  .option("-o, --output <file>", "Output file")
  .option("-s, --silent", "Silent")
  .action(async (file, options: { output?: string; silent?: boolean }) => {
    const output: string = options.output || "";
    const silent: boolean =
      options.silent === undefined ? !output : Boolean(options.silent);
    const info = (...args: Parameters<typeof console.log>) => {
      if (silent) return;
      return console.log(...args);
    };

    const gitignore = file
      ? await readGitignore(resolve(cwd, file))
      : !process.stdin.isTTY
      ? { content: await getStdin(), path: undefined }
      : await findGitIgnore();
    if (!gitignore) throw new Error(".gitignore not found");
    info(
      `.gitignore ${
        gitignore.path ? inspect(gitignore.path) : "from stdin"
      } loaded!`
    );
    const dockerignore = g2d(gitignore.content);
    if (!output) {
      console.log(dockerignore);
      return;
    }
    const targetPath = await getTargetPath(output);
    await fs.writeFile(targetPath, dockerignore, { encoding: "utf8" });
    info(`.dockerignore ${targetPath} exported!`);
  });

cli.help();
cli.version(version);

cli.parse();
