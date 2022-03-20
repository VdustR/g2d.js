import fs from "fs-extra";

export default async function read_gitignore(path: string): Promise<{
  path: string;
  content: string;
}> {
  const content = await fs.readFile(path, { encoding: "utf8" });
  return {
    path,
    content,
  };
}
