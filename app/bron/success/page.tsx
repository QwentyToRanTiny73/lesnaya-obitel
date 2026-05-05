import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Заявка получена",
  description: "Ваша заявка на бронирование получена. Свяжемся в течение часа.",
};

export default function BookingSuccessPage() {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center">
      <section className="py-20 px-6 text-center max-w-2xl mx-auto">
        <div className="text-gold text-5xl mb-6">◈</div>
        <p className="section-subtitle">Заявка получена</p>
        <h1 className="font-georgia text-cream text-4xl md:text-5xl mb-6">
          Спасибо.<br />
          <span className="text-gold italic">Скоро свяжемся.</span>
        </h1>
        <p className="font-inter text-sand/60 text-sm leading-relaxed mb-12 max-w-md mx-auto">
          Заявка передана управляющему. Мы свяжемся с вами в течение часа в
          рабочее время для подтверждения брони и уточнения деталей.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary text-xs px-8 py-3">
            На главную
          </Link>
          <a href="https://t.me/lesnaya_obitel" className="btn-secondary text-xs px-8 py-3">
            Написать в Telegram
          </a>
        </div>
      </section>
    </div>
  );
}
