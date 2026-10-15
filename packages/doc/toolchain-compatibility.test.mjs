import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const coreRequire = createRequire(require.resolve("@docusaurus/core/package.json"));

describe("documentation dependency compatibility", () => {
  it("runs ordinary SSG-style tasks with Docusaurus worker options", async () => {
    const { default: Tinypool } = await import(
      pathToFileURL(coreRequire.resolve("tinypool")).href
    );
    const pool = new Tinypool({
      filename: fileURLToPath(new URL("./fixtures/ssg-worker.mjs", import.meta.url)),
      minThreads: 2,
      maxThreads: 2,
      concurrentTasksPerWorker: 1,
      runtime: "worker_threads",
      isolateWorkers: false,
      workerData: { params: { prefix: "/g2d.js" } },
    });

    try {
      expect(await Promise.all([
        pool.run({ pathnames: ["/", "/online/"] }),
        pool.run({ pathnames: ["/node/cli/"] }),
      ])).toEqual([
        ["/g2d.js/", "/g2d.js/online/"],
        ["/g2d.js/node/cli/"],
      ]);
    } finally {
      await pool.destroy();
    }
  });

  it("minifies ordinary selectors through the existing cssnano pipeline", async () => {
    const minimizerRequire = createRequire(coreRequire.resolve("css-minimizer-webpack-plugin"));
    const cssnano = minimizerRequire("cssnano");
    const postcss = coreRequire("postcss");
    const result = await postcss([cssnano()]).process(
      '.b, .a, .a { color: red; } .card:not(.hidden) > [data-kind="note"] { margin: 0px; }',
      { from: undefined }
    );

    expect(result.css).toBe('.a,.b{color:red}.card:not(.hidden)>[data-kind=note]{margin:0}');
  });
});
