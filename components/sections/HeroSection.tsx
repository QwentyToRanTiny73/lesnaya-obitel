"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Gradient background fallback / overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/60 via-forest-dark/30 to-forest-dark z-10" />

      {/* Background pattern — forest texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, #2C5F2D33 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, #1A3A2A 0%, #0d2018 100%)",
        }}
      />

      {/* SVG decorative trees silhouette */}
      <div className="absolute bottom-0 left-0 right-0 z-5 opacity-20">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-64">
          <path
            d="M0,320 L0,200 Q120,80 240,160 Q360,240 480,120 Q600,0 720,80 Q840,160 960,80 Q1080,0 1200,100 Q1320,200 1440,120 L1440,320 Z"
            fill="#1A3A2A"
          />
          <path
            d="M0,320 L0,240 Q180,140 360,200 Q540,260 720,160 Q900,60 1080,160 Q1260,260 1440,180 L1440,320 Z"
            fill="#2C5F2D"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <p className="font-inter text-xs tracking-[0.4em] uppercase text-gold mb-6 animate-fade-in">
          Краснокаменка · ЮБК · Крым
        </p>

        <h1 className="font-georgia text-5xl md:text-7xl lg:text-8xl text-cream leading-none mb-6">
          Лесная
          <br />
          <span className="text-gold">Обитель</span>
        </h1>

        <p className="font-georgia italic text-sand/80 text-lg md:text-xl mb-3">
          Вино, которое росло здесь.
        </p>
        <p className="font-georgia italic text-sand/60 text-lg md:text-xl mb-12">
          Тишина, которую не привозят.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/bron" className="btn-secondary text-sm px-10 py-4">
            Забронировать
          </Link>
          <Link href="/domiki" className="btn-primary text-sm px-10 py-4">
            Смотреть домики
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-xs text-sand/40 tracking-widest uppercase font-inter">
          <span>7 га леса</span>
          <span className="text-forest">·</span>
          <span>15 домиков</span>
          <span className="text-forest">·</span>
          <span>Частная территория</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-0.5 h-8 bg-gold/40" />
        <div className="w-1 h-1 rounded-full bg-gold/60" />
      </div>
    </section>
  );
}
