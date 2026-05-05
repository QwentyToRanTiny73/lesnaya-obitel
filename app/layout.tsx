import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

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
    description: "Вино, которое росло здесь. Тишина, которую не привозят.",
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
    <html lang="ru" className={inter.variable}>
      <body className="antialiased bg-forest-dark text-cream">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
