import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
execFileSync(process.execPath, [require.resolve("next/dist/bin/next"), "build", ...(process.platform === "win32" ? ["--webpack"] : [])], {
  env: { ...process.env, STATIC_EXPORT: "1" },
  stdio: "inherit",
});
