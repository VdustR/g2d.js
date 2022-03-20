import fs from "fs-extra";

export default async function isDir(path: string): Promise<boolean> {
  try {
    const stat = await fs.lstat(path);
    return stat.isDirectory();
  } catch (_e) {
    return false;
  }
}
