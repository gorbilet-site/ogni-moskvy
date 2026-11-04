import { execFileSync } from "node:child_process";
import { cpSync, existsSync, lstatSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve, relative } from "node:path";

const root = resolve(import.meta.dirname, "..");
const env = {
  ...process.env,
  STATIC_EXPORT: "1",
  NEXT_PUBLIC_SINGLE: "0",
  NEXT_PUBLIC_BASE_PATH: "/ogni-moskvy",
  NEXT_PUBLIC_SITE_URL: "https://gorbilet-site.github.io/ogni-moskvy",
};
execFileSync(process.execPath, [resolve(root, "node_modules/next/dist/bin/next"), "build", "--webpack"], { cwd: root, env, stdio: "inherit" });
const docs = resolve(root, "docs");
if (relative(root, docs) !== "docs" || (existsSync(docs) && lstatSync(docs).isSymbolicLink())) throw new Error("Unsafe Pages output path");
rmSync(docs, { recursive: true, force: true });
mkdirSync(docs, { recursive: true });
cpSync(resolve(root, "out"), docs, { recursive: true });
writeFileSync(resolve(docs, ".nojekyll"), "");
console.log("GitHub Pages output: docs/");
