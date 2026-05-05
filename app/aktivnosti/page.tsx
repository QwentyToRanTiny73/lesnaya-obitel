import type { Metadata } from "next";
import activitiesData from "@/lib/data/activities.json";
import ActivityCard from "@/components/sections/ActivityCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Активности и досуг",
  description:
    "Теренкур, экскурсия на Красный Камень, тур на устричную ферму, конные прогулки, дайвинг, сапы, рыбалка, йога. База отдыха Лесная Обитель, Краснокаменка, Крым.",
};

export default function AktivnostiPage() {
  return (
    <div className="pt-24">
      <section className="py-20 px-6 text-center bg-forest/5">
        <div className="max-w-3xl mx-auto">
          <p className="section-subtitle">Досуг</p>
          <h1 className="section-title text-4xl md:text-5xl">Активности</h1>
          <p className="font-inter text-sand/60 text-sm leading-relaxed mt-6 max-w-xl mx-auto">
            Теренкур в лесу, устрицы на Донузлаве, скала Красный Камень.
            Конные прогулки прямо к домику. Дайвинг, сапы, рыбалка, йога.
            Ничего обязательного — только то, что хочется.
          </p>
        </div>
      </section>

      {/* Собственные активности */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="section-subtitle">Наши</p>
            <h2 className="section-title text-2xl">Активности базы</h2>
            <p className="font-inter text-sand/50 text-sm mt-2">
              Доход от этих активностей — полностью наш. Качество — наша ответственность.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activitiesData.own.map((activity) => (
              <ActivityCard key={activity.id} activity={{ ...activity, type: "own" }} />
            ))}
          </div>
        </div>
      </section>

      {/* Партнёрские активности */}
      <section className="py-16 px-6 bg-forest/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="section-subtitle">С партнёрами</p>
            <h2 className="section-title text-2xl">Дополнительные активности</h2>
            <p className="font-inter text-sand/50 text-sm mt-2">
              Работаем с проверенными партнёрами ЮБК.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activitiesData.partner.map((activity) => (
              <ActivityCard key={activity.id} activity={{ ...activity, type: "partner" }} />
            ))}
          </div>
        </div>
      </section>

      {/* Особые форматы */}
      <section className="py-16 px-6 bg-forest-dark">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="section-subtitle">Особое</p>
            <h2 className="section-title text-2xl">Вечера живой музыки</h2>
          </div>
          {activitiesData.special.map((item) => (
            <div key={item.id} className="bg-forest/10 border border-forest/30 p-8 max-w-2xl">
              <h3 className="font-georgia text-cream text-xl mb-3">{item.title}</h3>
              <p className="font-inter text-sand/60 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-georgia text-gold text-lg">{item.price}</span>
                <span className="font-inter text-xs text-sand/40">{item.schedule}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 text-center bg-forest/5">
        <Link href="/bron" className="btn-secondary text-sm px-12 py-4 inline-block">
          Забронировать и выбрать активности
        </Link>
      </section>
    </div>
  );
}
