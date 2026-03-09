"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  { src: "/images/hero-soccer.jpg", label: "Soccer", alt: "サッカー" },
  { src: "/images/hero-business.jpg", label: "Business", alt: "ビジネス" },
];

const badges = [
  { text: "法政大学 3年", blue: true },
  { text: "MF / FC NossA 八王子", blue: true },
  { text: "全国高校選手権 ベスト4", blue: false },
  { text: "月商600万達成", blue: false },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      id="hero"
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-stretch pt-[72px]"
    >
      {/* 左側テキスト */}
      <div className="relative flex flex-col justify-center px-6 md:px-13 py-20 md:py-20">
        {/* 背景の大文字 */}
        <span className="absolute bottom-[-20px] left-[-10px] font-['Bebas_Neue'] text-[120px] md:text-[200px] text-black/[0.035] tracking-[-4px] leading-none pointer-events-none select-none z-0">
          SAGAWA
        </span>

        <div className="relative z-1">
          {/* タグ */}
          <div className="flex items-center gap-2.5 text-[11px] font-bold tracking-[3px] uppercase text-[--color-blue] mb-7">
            <span className="w-7 h-0.5 bg-[--color-blue]" />
            Athlete × Business
          </div>

          {/* 名前 */}
          <h1 className="font-['Bebas_Neue'] text-[clamp(64px,7vw,108px)] tracking-[3px] leading-[0.92] text-[--color-black] mb-1.5">
            SHINTARO
            <br />
            SAGAWA
          </h1>
          <p className="text-[13px] font-light tracking-[10px] text-[--color-mid-gray] mb-11">
            佐川　新太郎
          </p>

          {/* キャッチコピー */}
          <div className="text-[clamp(26px,3.2vw,44px)] font-black leading-[1.4] text-[--color-black] mb-8">
            <span className="catch-line">貪欲に、</span>
            <br />
            <span className="catch-line">素直に、</span>
            <br />
            <span className="catch-line">全力で。</span>
          </div>

          {/* サブテキスト */}
          <p className="text-sm font-light leading-8 text-[--color-mid-gray] mb-10 max-w-[420px]">
            川崎フロンターレ・ジュビロ磐田・静岡学園を経て、
            <br />
            サッカーと同じ熱量でビジネスを戦う22歳。
          </p>

          {/* バッジ */}
          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b.text}
                className={`text-[10px] font-bold tracking-[1.5px] px-3.5 py-1.5 border-[1.5px] uppercase ${
                  b.blue
                    ? "border-[--color-blue] text-[--color-blue] bg-[--color-blue-light]"
                    : "border-[--color-dark] text-[--color-dark]"
                }`}
              >
                {b.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 右側スライダー */}
      <div
        className="relative overflow-hidden min-h-[60vw] md:min-h-screen"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            className={`object-cover slider-img ${i === current ? "opacity-100" : "opacity-0"}`}
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ))}

        {/* 黒グラデーション */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-r from-white/15 to-transparent md:w-[30%]" />

        {/* ラベル＆ドット */}
        <div className="absolute bottom-8 left-8 right-8 z-2 flex justify-between items-end">
          <span className="font-['Bebas_Neue'] text-5xl tracking-[4px] text-white/90 leading-none">
            {slides[current].label}
          </span>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[3px] cursor-pointer border-none transition-all ${
                  i === current
                    ? "w-12 bg-white"
                    : "w-7 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
