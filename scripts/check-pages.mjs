import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
const root = resolve(import.meta.dirname, "../docs");
const prefix = "/ogni-moskvy";
const origin = "https://gorbilet-site.github.io";
const allFiles = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? allFiles(resolve(dir, e.name)) : [resolve(dir, e.name)]);
const pages = new Map();
for (const file of allFiles(root).filter((f) => f.endsWith(".html"))) {
  const name = relative(root, file).replaceAll("\\", "/");
  const route = name === "index.html" ? "/" : "/" + name.replace(/\/index\.html$/, "/");
  const html = readFileSync(file, "utf8");
  pages.set(route, { file, html, ids: new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1])) });
}
let internalLinks = 0, localAssets = 0, generalLinks = 0;
for (const [route, page] of pages) {
  for (const match of page.html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    const url = new URL(href, `${origin}${prefix}${route}`);
    if (url.origin !== origin) {
      if (url.origin === "https://gorbilet.ru" && url.pathname === "/msk/") {
        assert.equal(url.searchParams.get("utm_campaign"), "other_msk");
        generalLinks++;
      }
      continue;
    }
    assert.ok(url.pathname.startsWith(prefix + "/"), `Unprefixed route: ${url.href}`);
    const targetRoute = url.pathname.slice(prefix.length);
    const target = pages.get(targetRoute) ?? pages.get(targetRoute + "/");
    assert.ok(target, `Missing page: ${url.href}`);
    if (url.hash) assert.ok(target.ids.has(decodeURIComponent(url.hash.slice(1))), `Missing anchor: ${url.href}`);
    internalLinks++;
  }
  for (const match of page.html.matchAll(/<(?:img|script|link)\b[^>]*(?:src|href)="([^"]+)"[^>]*>/g)) {
    const raw = match[1].replaceAll("&amp;", "&");
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;
    assert.ok(raw.startsWith(prefix + "/"), `Unprefixed asset: ${raw}`);
    const url = new URL(raw, origin);
    assert.ok(existsSync(resolve(root, "." + decodeURIComponent(url.pathname.slice(prefix.length)))), `Missing asset: ${raw}`);
    localAssets++;
  }
}
assert.ok(existsSync(resolve(root, ".nojekyll")));
assert.ok(readFileSync(resolve(root, "sitemap.xml"), "utf8").includes(`${origin}${prefix}/afisha`));
console.log(JSON.stringify({ htmlPages: pages.size, internalLinks, localAssets, generalLinks }));
