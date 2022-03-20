import { resolve } from "path";
import cwd from "./cwd";
import readGitignore from "./readGitignore";

export default async function findGitIgnore(dir: string = cwd): Promise<
  | {
      path: string;
      content: string;
    }
  | undefined
> {
  try {
    const path = resolve(dir, ".gitignore");
    const gitignore = await readGitignore(path);
    return gitignore;
  } catch (_e) {
    if (dir === "/") return undefined;
    return findGitIgnore(resolve(dir, ".."));
  }
}
