/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";

const nextConfig = {
  // Статический экспорт для GitHub Pages.
  // Включается переменной GITHUB_PAGES=true (см. .github/workflows/deploy.yml).
  output: isPages ? "export" : undefined,

  // На GitHub Pages сайт обычно живёт по пути /<repo>, если это не username.github.io
  basePath: isPages && repo && !repo.endsWith(".github.io") ? `/${repo}` : "",
  assetPrefix: isPages && repo && !repo.endsWith(".github.io") ? `/${repo}/` : "",

  trailingSlash: true,
  images: { unoptimized: isPages },

  // Pdfkit нельзя бандлить — фaйлы шрифтов теряются в webpack-сборке.
  experimental: {
    serverComponentsExternalPackages: ["pdfkit"],
  },
};

export default nextConfig;
