import renameExtensions from "@vdustr/rollup-plugin-rename-extensions";
import { resolve } from "path";
import type { RollupOptions } from "rollup";
import typescript from "rollup-plugin-typescript2";
import packageJson from "../package.json";
import { MODULE, PKG } from "./type";

const repoRoot = resolve(__dirname, "..");

function genConfig(pkg: PKG, module: MODULE) {
  const isEsm = module === "ES2015";
  const isTyped = isEsm;
  const isTs = true;
  const pkgDir = resolve(repoRoot, "packages", pkg);
  const distDir = resolve(repoRoot, "dist", pkg);
  const config: RollupOptions = {
    input: resolve(pkgDir, "index.ts"),
    output: {
      preserveModules: true,
      dir: distDir,
      format: isEsm ? "esm" : "cjs",
      exports: "auto",
    },
    external: [
      ...Object.keys(packageJson.dependencies).filter((pkg) => "tslib" !== pkg),
      "svelte/internal",
    ],
    plugins: [
      ...(isTs
        ? [
            typescript({
              check: false,
              tsconfig: resolve(__dirname, "esm/tsconfig.json"),
              tsconfigOverride: {
                module,
                declaration: isTyped,
                declarationDir: ".",
                target: "ES5",
                include: [
                  resolve(pkgDir, `**/*.ts`),
                  resolve(pkgDir, `**/*.svelte`),
                ],
              },
            }),
          ]
        : []),
      ...(isEsm
        ? []
        : [
            renameExtensions({
              include: ["**/*.ts", "**/*.svelte"],
              match: "\x00tslib.js",
              mappings: {
                ".js": ".cjs",
              },
            }),
          ]),
    ],
  };
  return config;
}

const configs: RollupOptions[] = [
  genConfig(PKG.cli, MODULE.COMMONJS),
  genConfig(PKG.core, MODULE.ES2015),
  genConfig(PKG.core, MODULE.COMMONJS),
];

export default configs;
