"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/domiki", label: "Домики" },
  { href: "/aktivnosti", label: "Активности" },
  { href: "/degustacii", label: "Дегустации" },
  { href: "/akvazona", label: "Аквазона" },
  { href: "/pitanie", label: "Питание" },
  { href: "/prays", label: "Прайс" },
  { href: "/kontakty", label: "Контакты" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-forest-dark/95 backdrop-blur-sm border-b border-forest/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-georgia text-cream text-lg tracking-wide hover:text-gold transition-colors"
        >
          Лесная Обитель
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-inter text-xs tracking-widest uppercase text-sand hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/bron"
          className="hidden lg:block btn-primary text-xs py-2 px-6"
        >
          Забронировать
        </Link>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-cream p-2"
          aria-label="Меню"
        >
          <div className={`w-6 h-0.5 bg-cream transition-all mb-1.5 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-cream transition-all mb-1.5 ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-cream transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-forest-dark border-t border-forest/30 px-6 py-6">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-inter text-xs tracking-widest uppercase text-sand hover:text-gold transition-colors block py-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/bron"
            onClick={() => setMenuOpen(false)}
            className="btn-primary text-xs py-2 px-6 mt-6 inline-block"
          >
            Забронировать
          </Link>
        </div>
      )}
    </nav>
  );
}
