import fs from "fs-extra";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const version =
  JSON.parse(fs.readFileSync(resolve(__dirname, "../package.json"), "utf8"))
    .version || "0.0.0";

export default version;
