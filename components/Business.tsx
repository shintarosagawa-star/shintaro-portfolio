"use client";

import { useEffect, useRef } from "react";

const timeline = [
  {
    period: "大学3年\n夏",
    title: "ITメガベンチャー 新規事業部\n飛び込み営業インターン",
    detail:
      "スポットワーク領域の飛び込み営業。初の完全歩合型の世界へ飛び込み、営業の基礎と人間力の重要性を体得。同期上位の契約件数。",
  },
  {
    period: "2025年\n12月〜現在",
    title: "AIベンチャー\nコンサルティングセールス",
    detail:
      "教育事業「スキルプラス」担当。高校生から70代、自己破産者から経営者まで幅広い層を担当。入社2ヶ月で同期2位。商材80万〜200万円。計7件成約。最高成約率20%。上司FBと自己内省を毎日繰り返しPDCAを高速で回す。",
    result: true,
  },
  {
    period: "現在\n進行中",
    title: "AIコンサルティング＋営業代行\n個人事業",
    detail:
      "ChatGPT / Claude / Midjourney など最前線のAIツールを駆使。noteコンテンツ販売経験あり。4年次休学しビジネスを本格化予定。次のステージへ向けて全力で動いている。",
  },
];

export default function Business() {
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
    <section id="business" className="bg-white px-6 md:px-13 py-24" ref={ref}>
      <div className="flex items-center gap-3.5 text-[10px] font-bold tracking-[4px] uppercase text-[--color-blue] mb-5">
        Business Career
        <span className="w-9 h-[1.5px] bg-[--color-blue]" />
      </div>
      <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.15] text-[--color-black] mb-18">
        ピッチの外でも、
        <br />
        全力で走る。
      </h2>

      <div className="grid grid-cols-1 gap-0">
        {timeline.map((item, i) => (
          <div
            key={i}
            className="tl-fade grid grid-cols-[80px_1px_1fr] md:grid-cols-[200px_1px_1fr] gap-x-4 md:gap-x-10 pb-14"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            {/* 左 */}
            <div className="text-right pt-1">
              <div className="text-[11px] font-bold tracking-[2px] uppercase text-[--color-blue] leading-relaxed whitespace-pre-line">
                {item.period}
              </div>
            </div>

            {/* 中央 */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full shrink-0 mt-1 z-1 bg-[--color-blue] border-[2.5px] border-[--color-blue] shadow-[0_0_0_5px_var(--color-blue-light)]" />
              {i < timeline.length - 1 && (
                <div className="flex-1 w-[1.5px] bg-[--color-light-gray] mt-1" />
              )}
            </div>

            {/* 右 */}
            <div>
              <div className="text-[22px] font-extrabold text-[--color-black] mb-2 leading-snug whitespace-pre-line">
                {item.title}
              </div>
              <div className="text-[13px] font-light text-[--color-mid-gray] leading-[1.9] mb-3.5">
                {item.detail}
              </div>
              {item.result && (
                <div className="font-['Bebas_Neue'] text-[38px] tracking-[2px] text-[--color-black] leading-none">
                  月商 <span className="text-[--color-blue]">600</span>万 達成
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
