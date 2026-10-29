import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Сайт живёт на GitHub Pages по адресу /lesnaya-obitel/.
// При переезде на свой домен: site → "https://домен", base → "/".
export default defineConfig({
  site: "https://qwentytorantiny73.github.io",
  base: "/lesnaya-obitel/",
  trailingSlash: "always",
  output: "static",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/bron/spasibo/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
