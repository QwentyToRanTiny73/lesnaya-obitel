"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "lo_cookie_consent_v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const v = localStorage.getItem(KEY);
      if (!v) setVisible(true);
    } catch {
      // localStorage может быть недоступен — не показываем баннер тихо
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ accepted: true, ts: Date.now() }));
    } catch {}
    setVisible(false);
  }

  function decline() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ accepted: false, ts: Date.now() }));
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Уведомление об использовании файлов cookie"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[60] bg-forest-dark/95 backdrop-blur-sm border border-wine-gold/40 p-5 shadow-2xl"
    >
      <p className="font-inter text-xs tracking-widest uppercase text-wine-gold mb-2">
        Cookie и персональные данные
      </p>
      <p className="font-inter text-sm text-sand/80 leading-relaxed mb-4">
        Сайт использует технические cookie и обезличенные счётчики для работы
        интерфейса и аналитики. Продолжая, вы соглашаетесь с нашей{" "}
        <Link
          href="/politika-konfidencialnosti"
          className="text-wine-amber underline-offset-2 hover:underline"
        >
          политикой конфиденциальности
        </Link>.
      </p>
      <div className="flex gap-3">
        <button
          onClick={accept}
          className="btn-secondary text-xs px-5 py-2"
        >
          Согласен
        </button>
        <button
          onClick={decline}
          className="font-inter text-xs tracking-widest uppercase text-sand/50 hover:text-cream transition-colors px-3"
        >
          Отказаться
        </button>
      </div>
    </div>
  );
}
