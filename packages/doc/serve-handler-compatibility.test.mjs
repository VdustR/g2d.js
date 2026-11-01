import { once } from "node:events";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";

const require = createRequire(import.meta.url);
const coreRequire = createRequire(require.resolve("@docusaurus/core/package.json"));
const serve = coreRequire("serve-handler");

async function withServer(config, check, methods = {}) {
  const directory = await mkdtemp(join(tmpdir(), "g2d-serve-"));
  const server = createServer((request, response) => {
    // Preserve rejected handler errors so the test cannot silently pass on 500.
    serve(request, response, { public: directory, ...config }, methods).catch((error) => {
      response.writeHead(500);
      response.end(error.message);
    });
  });
  try {
    await mkdir(join(directory, "docs"));
    await writeFile(join(directory, "hello.txt"), "text");
    await writeFile(join(directory, "guide.html"), "guide");
    await writeFile(join(directory, "docs", "index.html"), "index");
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    await check(`http://127.0.0.1:${server.address().port}`);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
    await rm(directory, { recursive: true, force: true });
  }
}

it("matches ordinary brace and extglob header patterns without matching other files", async () => {
  await withServer({
    headers: [
      { source: "**/*.{txt,html}", headers: [{ key: "x-brace", value: "yes" }] },
      { source: "**/*.@(txt|md)", headers: [{ key: "x-extglob", value: "yes" }] },
      { source: "**/*.css", headers: [{ key: "x-other", value: "yes" }] },
    ],
  }, async (url) => {
    const response = await fetch(`${url}/hello.txt`);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("text");
    expect(response.headers.get("x-brace")).toBe("yes");
    expect(response.headers.get("x-extglob")).toBe("yes");
    expect(response.headers.get("x-other")).toBeNull();
  });
});

it("preserves matching and nonmatching rewrites and redirects", async () => {
  await withServer({
    rewrites: [{ source: "/legacy/:name", destination: "/:name.html" }],
    redirects: [{ source: "/old/:name", destination: "/legacy/:name", type: 302 }],
    cleanUrls: false,
  }, async (url) => {
    const rewritten = await fetch(`${url}/legacy/guide`);
    expect(rewritten.status).toBe(200);
    expect(await rewritten.text()).toBe("guide");
    const redirected = await fetch(`${url}/old/guide`, { redirect: "manual" });
    expect(redirected.status).toBe(302);
    expect(redirected.headers.get("location")).toBe("/legacy/guide");
    expect((await fetch(`${url}/unmatched/guide`)).status).toBe(404);
  });
});

it("preserves selective clean URLs, trailing slashes and missing-file errors", async () => {
  await withServer({ cleanUrls: ["/guide", "/docs"], trailingSlash: true, directoryListing: false }, async (url) => {
    const clean = await fetch(`${url}/guide/`);
    expect(clean.status).toBe(200);
    expect(await clean.text()).toBe("guide");
    const directory = await fetch(`${url}/docs`, { redirect: "manual" });
    expect(directory.status).toBe(301);
    expect(directory.headers.get("location")).toBe("/docs/");
    expect(await (await fetch(`${url}/docs/`)).text()).toBe("index");
    expect((await fetch(`${url}/missing`)).status).toBe(404);
  });
});

it("keeps unexpected filesystem failures observable as server errors", async () => {
  await withServer({}, async (url) => {
    const response = await fetch(`${url}/hello.txt`, { headers: { accept: "application/json" } });
    expect(response.status).toBe(500);
    expect((await response.json()).error.code).toBe("internal_server_error");
  }, { lstat: async () => { throw Object.assign(new Error("unavailable"), { code: "EIO" }); } });
});
