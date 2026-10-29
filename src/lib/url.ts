// Ссылки с учётом base из astro.config (/lesnaya-obitel/).
// Обычный <a href="/prays.pdf"> на GitHub Pages ведёт мимо сайта — всегда через url().
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function url(path = "/"): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}/${path.replace(/^\//, "")}`;
}
