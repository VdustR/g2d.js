import { once } from "node:events";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { globSync } from "glob";
import { expect, it } from "vitest";

const require = createRequire(import.meta.url);
const coreRequire = createRequire(require.resolve("@docusaurus/core/package.json"));

it("discovers build inputs with glob's synchronous API", async () => {
  const directory = await mkdtemp(join(tmpdir(), "g2d-glob-"));
  try {
    await mkdir(join(directory, "core"));
    await mkdir(join(directory, "cli"));
    await writeFile(join(directory, "core", "index.js"), "");
    await writeFile(join(directory, "core", "index.cjs"), "");
    await writeFile(join(directory, "cli", "index.js"), "");
    await writeFile(join(directory, "cli", ".hidden.js"), "");

    expect(globSync("{core,cli}/**/*.js", { cwd: directory }).sort()).toEqual([
      "cli/index.js",
      "core/index.js",
    ]);
    expect(globSync(join(directory, "core", "**/*.js"))).toEqual([
      join(directory, "core", "index.js"),
    ]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

it("validates ordinary plugin options through Docusaurus's Joi export", () => {
  const { Joi } = coreRequire("@docusaurus/utils-validation");
  const schema = Joi.object({ path: Joi.string().required(), enabled: Joi.boolean() });
  expect(schema.validate({ path: "docs", enabled: true }).error).toBeUndefined();
  expect(schema.validate({ enabled: true }).error).toBeDefined();
});

it("parses nested query strings and form bodies through Express", async () => {
  const express = coreRequire("express");
  const app = express();
  app.use(express.urlencoded({ extended: true, limit: "1kb" }));
  app.use(express.json());
  app.use((request, response) => response.json({ query: request.query, body: request.body }));
  const server = createServer(app);
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    const response = await fetch(`${url}/?filter[name]=docs`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: "user[name]=reader&tags[]=core&tags[]=cli",
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      query: { filter: { name: "docs" } },
      body: { user: { name: "reader" }, tags: ["core", "cli"] },
    });
    const invalid = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{invalid",
    });
    expect(invalid.status).toBe(400);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

it("serializes ordinary webpack cache options without mutating function values", () => {
  const minimizerRequire = createRequire(coreRequire.resolve("css-minimizer-webpack-plugin"));
  const serialize = minimizerRequire("serialize-javascript");
  const options = { preset: ["default", { discardComments: { removeAll: true } }] };
  expect(JSON.parse(serialize(options, { isJSON: true }))).toEqual(options);
  const withFunction = { enabled: true, transform: () => "value" };
  expect(JSON.parse(serialize(withFunction, { ignoreFunction: true }))).toEqual({ enabled: true });
  expect(typeof withFunction.transform).toBe("function");
});

it("follows an ordinary redirect with http-proxy's resolved transport", async () => {
  const devServerRequire = createRequire(coreRequire.resolve("webpack-dev-server"));
  const middlewareRequire = createRequire(devServerRequire.resolve("http-proxy-middleware"));
  const proxyRequire = createRequire(middlewareRequire.resolve("http-proxy"));
  const { http } = proxyRequire("follow-redirects");
  const server = createServer((request, response) => {
    if (request.url === "/start") {
      response.writeHead(302, { location: "/destination" });
      response.end();
    } else {
      response.end("redirected");
    }
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    const body = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${server.address().port}/start`, (response) => {
        let result = "";
        response.on("data", (chunk) => { result += chunk; });
        response.on("end", () => resolve(result));
        response.on("error", reject);
      }).on("error", reject);
    });
    expect(body).toBe("redirected");
  } finally {
    server.closeAllConnections();
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
