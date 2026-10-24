import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 纯静态导出：pnpm build 之后直接部署 out/ 目录（Vercel / Cloudflare Pages / 任意静态托管）
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
