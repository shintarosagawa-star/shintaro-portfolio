"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const timeline = [
  {
    period: "幼稚園",
    team: "サッカーを始める",
    detail: "父がサッカーチームに入れてくれたことがすべての始まり。",
    highlight: false,
  },
  {
    period: "小学生",
    team: "FCパーシモン → 川崎フロンターレ U12",
    detail: "Jクラブのアカデミーで基礎を鍛える。",
    badge: "🏆 日本一",
    highlight: true,
  },
  {
    period: "中学生",
    team: "ジュビロ磐田 U15",
    detail:
      "J1・J2全クラブから優秀選手が集まる「Jリーグ選抜」のセレクション候補に選出。",
    badge: "⭐ Jリーグ選抜 候補選出",
    highlight: true,
  },
  {
    period: "高校生",
    team: "静岡学園高校サッカー部",
    detail: "全国屈指の強豪校でサッカーと人間力を磨く。",
    badge: "🏆 全国高校選手権 ベスト4",
    highlight: true,
  },
  {
    period: "大学〜現在",
    team: "OLIVAS FC → FC NossA 八王子",
    detail:
      "「圧倒的成長、細胞レベルで楽しむ」を目標に掲げ、MFとして現役でプレー中。クリエイティブなプレーが持ち味。",
    highlight: false,
  },
];

export default function Soccer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll(".tl-fade").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="soccer" className="bg-white px-6 md:px-13 py-24" ref={ref}>
      <div className="flex items-center gap-3.5 text-[10px] font-bold tracking-[4px] uppercase text-[--color-blue] mb-5">
        Soccer Career
        <span className="w-9 h-[1.5px] bg-[--color-blue]" />
      </div>
      <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.15] text-[--color-black] mb-18">
        サッカーという
        <br />
        人生の教科書。
      </h2>

      {/* タイムライン */}
      <div className="grid grid-cols-1 gap-0">
        {timeline.map((item, i) => (
          <div
            key={i}
            className="tl-fade grid grid-cols-[80px_1px_1fr] md:grid-cols-[160px_1px_1fr] gap-x-4 md:gap-x-8 pb-14"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* 左：年代 */}
            <div className="text-right pt-1">
              <div className="text-[11px] font-bold tracking-[2px] uppercase text-[--color-blue]">
                {item.period}
              </div>
            </div>

            {/* 中央：ドット＋線 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full shrink-0 mt-1 relative z-1 ${
                  item.highlight
                    ? "bg-[--color-blue] border-[2.5px] border-[--color-blue] shadow-[0_0_0_5px_var(--color-blue-light)]"
                    : "bg-white border-[2.5px] border-[--color-light-gray]"
                }`}
              />
              {i < timeline.length - 1 && (
                <div className="flex-1 w-[1.5px] bg-[--color-light-gray] mt-1" />
              )}
            </div>

            {/* 右：内容 */}
            <div className="pt-0.5">
              <div className="text-xl font-extrabold text-[--color-black] mb-2 leading-snug">
                {item.team}
              </div>
              <div className="text-[13px] font-light text-[--color-mid-gray] leading-[1.8] mb-2.5">
                {item.detail}
              </div>
              {item.badge && (
                <span className="inline-block text-[11px] font-bold tracking-[1px] px-3.5 py-1 bg-[--color-blue-light] text-[--color-blue] border-l-[3px] border-[--color-blue]">
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ギャラリー写真 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/gallery-celebrate.jpg"
            alt="チームメイトと肩を組んで笑顔"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* gallery-play.jpg が追加されたらコメントを外してください */}
        {/* <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src="/images/gallery-play.jpg"
            alt="背番号8・プレー中"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div> */}
      </div>
    </section>
  );
}
