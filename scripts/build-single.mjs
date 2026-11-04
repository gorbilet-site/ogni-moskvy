/**
 * Сборка главной в один самодостаточный HTML-файл ogni-moskvy.html.
 *
 * Next.js здесь используется только чтобы получить готовый CSS и шрифты.
 * Сама страница рендерится React напрямую (react-dom/server + hydrateRoot),
 * без роутера Next. Поэтому файл открывается где угодно: двойным кликом,
 * в превью мессенджера, во вложении письма, в песочнице без адреса.
 *
 * Запуск: npm run build:single
 */
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "out");
const TMP = join(ROOT, ".single");
const TARGET = join(ROOT, "ogni-moskvy.html");
mkdirSync(TMP, { recursive: true });

const env = { ...process.env, STATIC_EXPORT: "1", NEXT_PUBLIC_SINGLE: "1" };

// 1. Статическая сборка Next, из неё берём CSS со шрифтами и класс <html> с переменными шрифтов
console.log("· next build");
execSync("npx next build", { cwd: ROOT, env, stdio: "inherit" });

const MIME = { ".woff2": "font/woff2", ".webp": "image/webp", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png" };
const dataUri = (abs) => `data:${MIME[extname(abs)] ?? "application/octet-stream"};base64,${readFileSync(abs).toString("base64")}`;

const exported = readFileSync(join(OUT, "index.html"), "utf8");
const htmlClass = exported.match(/<html[^>]*class="([^"]+)"/)?.[1] ?? "";
const cssFiles = [...exported.matchAll(/<link rel="stylesheet" href="(\/_next\/[^"]+\.css)"/g)].map((m) => m[1]);
const css = cssFiles
  .map((href) => {
    const file = join(OUT, href);
    return readFileSync(file, "utf8").replace(/url\(([^)]+\.woff2)\)/g, (_m, u) => {
      const name = u.replace(/^["']|["']$/g, "").split("/").pop();
      return `url(${dataUri(join(OUT, "_next/static/media", name))})`;
    });
  })
  .join("\n");

// 2. Картинки маскота встраиваем через подменённый модуль
const poses = readdirSync(join(ROOT, "public/mascot")).filter((f) => f.endsWith(".webp"));
const mascotModule = join(TMP, "mascotSrc.ts");
writeFileSync(
  mascotModule,
  `const M: Record<string, string> = ${JSON.stringify(
    Object.fromEntries(poses.map((f) => [f.replace(".webp", ""), dataUri(join(ROOT, "public/mascot", f))])),
  )};\nexport const mascotSrc = (pose: string) => M[pose];\n`,
);

const shared = {
  bundle: true,
  jsx: "automatic",
  tsconfig: join(ROOT, "tsconfig.json"),
  define: {
    "process.env.NEXT_PUBLIC_SINGLE": '"1"',
    "process.env.NODE_ENV": '"production"',
    "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ogni-moskvy.gorbilet.ru"),
  },
  alias: {
    "next/link": join(ROOT, "scripts/single/next-link.tsx"),
    "next/navigation": join(ROOT, "scripts/single/next-navigation.ts"),
  },
  plugins: [
    {
      name: "mascot",
      setup(b) {
        b.onResolve({ filter: /mascotSrc$/ }, () => ({ path: mascotModule }));
      },
    },
  ],
  logLevel: "warning",
};

// 3. Серверный рендер разметки
console.log("· prerender");
const serverFile = join(TMP, "server.cjs");
await build({ ...shared, entryPoints: [join(ROOT, "scripts/single/server.tsx")], platform: "node", format: "cjs", outfile: serverFile });
const { render } = createRequire(import.meta.url)(serverFile);
const markup = render();

// 4. Клиентский бандл для оживления страницы
console.log("· client bundle");
const clientFile = join(TMP, "client.js");
await build({ ...shared, entryPoints: [join(ROOT, "scripts/single/client.tsx")], platform: "browser", format: "iife", minify: true, target: "es2019", outfile: clientFile });
const js = readFileSync(clientFile, "utf8").replace(/<\/script/g, "<\\/script");

const icon = dataUri(join(ROOT, "public/icon.svg"));
const html = `<!doctype html>
<html lang="ru" class="${htmlClass}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Новогодняя Москва со скидками. Чёрная пятница для яркого Нового года | Огни Москвы</title>
<meta name="description" content="Новогодняя Москва со скидками. Экскурсии, смотровые площадки, ёлки для детей, спектакли для взрослых и готовый маршрут на три дня от Горбилета.">
<meta name="theme-color" content="#3b8beb">
<link rel="icon" href="${icon}">
<style>${css}</style>
</head>
<body>
<div id="root">${markup}</div>
<script>${js}</script>
</body>
</html>
`;

writeFileSync(TARGET, html);
console.log(`✓ ogni-moskvy.html ${(html.length / 1024).toFixed(0)} KB`);
