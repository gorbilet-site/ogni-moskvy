import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 npm run build → статическая сборка в папку out/
 * (подходит для любого хостинга без Node.js).
 * Обычный npm run build → стандартная сборка Next.js (Vercel, Node).
 */
const isExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  // Сайт полностью статический, поэтому Cache Components не включаем
  ...(isExport ? { output: "export" as const, trailingSlash: true } : {}),
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Optional fallback for Windows environments where the Turbopack CSS worker exits early.
  webpack(config) {
    config.module.rules.unshift({
      test: /globals\.css$/,
      enforce: "pre",
      use: ["@tailwindcss/turbopack"],
    });
    return config;
  },
};

export default nextConfig;
