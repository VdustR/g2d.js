import renameExtensions from "@vdustr/rollup-plugin-rename-extensions";
import { resolve } from "path";
import type { RollupOptions } from "rollup";
import typescript from "rollup-plugin-typescript2";
import packageJson from "../package.json";
import { MODULE, PKG } from "./type";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const repoRoot = resolve(__dirname, "..");

function genConfig(
  pkg: PKG,
  module: MODULE,
  {
    isCli = false,
  }: {
    isCli?: boolean;
  } = {}
) {
  const isEsm = module === "ES2015";
  const isTyped = isEsm;
  const isTs = true;
  const pkgDir = resolve(repoRoot, "packages", pkg);
  const distDir = resolve(repoRoot, "dist", pkg);
  const config: RollupOptions = {
    input: resolve(pkgDir, "index.ts"),
    output: {
      preserveModules: !isCli,
      ...(isCli ? { file: resolve(distDir, "bin/cli.js") } : { dir: distDir }),
      format: isEsm ? "esm" : "cjs",
      exports: "auto",
    },
    external: isCli
      ? []
      : [
          ...Object.keys(packageJson.dependencies).filter(
            (pkg) => "tslib" !== pkg
          ),
          ...Object.values(PKG).map((pkg) => `@g2d/${pkg}`),
        ],
    plugins: [
      ...(isCli
        ? [
            nodeResolve({
              preferBuiltins: false,
            }),
            commonjs(),
          ]
        : []),
      ...(isTs
        ? [
            typescript({
              check: false,
              tsconfig: resolve(__dirname, "esm/tsconfig.json"),
              tsconfigOverride: {
                module,
                declarationDir: ".",
                target: "ES5",
                include: [resolve(pkgDir, `**/*.ts`)],
                compilerOptions: {
                  declaration: isTyped,
                },
              },
            }),
          ]
        : []),
      ...(isEsm || isCli
        ? []
        : [
            renameExtensions({
              include: ["**/*.ts"],
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
  genConfig(PKG.cli, MODULE.COMMONJS, { isCli: true }),
  genConfig(PKG.core, MODULE.ES2015),
  genConfig(PKG.core, MODULE.COMMONJS),
];

export default configs;
