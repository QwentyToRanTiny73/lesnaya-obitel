import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/sections/BookingForm";

export const metadata: Metadata = {
  title: "Бронирование",
  description:
    "Оставить заявку на бронирование домика на базе отдыха Лесная Обитель в Краснокаменке, Крым. Минимум 2 ночи. Завтрак включён.",
};

export default function BronPage() {
  return (
    <div className="pt-24">
      <section className="py-20 px-6 text-center bg-forest/5">
        <div className="max-w-3xl mx-auto">
          <p className="section-subtitle">Бронирование</p>
          <h1 className="section-title text-4xl md:text-5xl">Оставить заявку</h1>
          <p className="font-inter text-sand/60 text-sm mt-6 max-w-xl mx-auto">
            Заполните форму. Свяжемся в течение часа в рабочее время для уточнения
            деталей и подтверждения брони.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-5xl mx-auto">
          <Suspense fallback={<div className="text-sand/50 text-center py-12">Загрузка формы…</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
