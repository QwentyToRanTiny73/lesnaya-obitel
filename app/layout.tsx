import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s — Лесная Обитель · База отдыха у Красного Камня, Крым",
    default: "Лесная Обитель — Эко-база у скалы Красный Камень, Краснокаменка, Крым",
  },
  description:
    "Закрытая частная эко-база отдыха премиум-класса у Красного Камня. Краснокаменка, ЮБК, Крым. Домики, дегустации вина и устриц, аквазона, ферма.",
  keywords: [
    "закрытая база отдыха Краснокаменка",
    "база отдыха у Красного Камня Крым",
    "аренда домиков ЮБК с дегустацией вина",
    "эко-база Гурзуф снять домик",
    "база отдыха с устрицами Крым",
  ],
  openGraph: {
    title: "Лесная Обитель — Эко-база у Красного Камня, Крым",
    description: "Тишина, которую не привозят.",
    type: "website",
    locale: "ru_RU",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <body className="antialiased bg-cream text-ink">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
