import fs from "fs-extra";
import { resolve } from "path";
import cwd from "./cwd";
import isDir from "./isDir";

export default async function getTargetPath(origin: string): Promise<string> {
  const absolute = resolve(cwd, origin);
  const target = (await isDir(absolute))
    ? resolve(absolute, ".dockerignore")
    : absolute;
  await fs.ensureFile(target);
  return target;
}
