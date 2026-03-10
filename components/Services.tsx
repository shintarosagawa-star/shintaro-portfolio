"use client";

import { useState } from "react";

interface Service {
  id: string;
  icon: string;
  title: string;
  catchcopy: string;
  badges: string[];
  disabled: boolean;
  steps: { step: string; title: string; desc: string }[];
}

const services: Service[] = [
  {
    id: "sales",
    icon: "🤝",
    title: "営業代行",
    catchcopy: "あなたの売上を、一緒に作りに行く。",
    badges: ["月商600万達成", "入社2ヶ月で同期2位", "成約率20%"],
    disabled: false,
    steps: [
      { step: "STEP 1", title: "無料相談", desc: "まずはお気軽にLINEでご連絡ください。" },
      { step: "STEP 2", title: "現状把握・提案", desc: "課題をヒアリングし、最適なプランをご提案します。" },
      { step: "STEP 3", title: "実施・改善", desc: "実行しながらPDCAを回し、成果を最大化します。" },
    ],
  },
  {
    id: "ai",
    icon: "🤖",
    title: "AIコンサル",
    catchcopy: "AIを、あなたのビジネスの武器にする。",
    badges: ["ChatGPT", "Claude", "Midjourney を実務活用"],
    disabled: false,
    steps: [
      { step: "STEP 1", title: "無料相談", desc: "まずはお気軽にLINEでご連絡ください。" },
      { step: "STEP 2", title: "現状把握・提案", desc: "業務フローを分析し、AI活用ポイントをご提案します。" },
      { step: "STEP 3", title: "導入・サポート", desc: "ツール導入から運用定着まで伴走します。" },
    ],
  },
  {
    id: "sns",
    icon: "📱",
    title: "SNSコンサル",
    catchcopy: "",
    badges: [],
    disabled: true,
    steps: [],
  },
];

export default function Services() {
  const [modal, setModal] = useState<Service | null>(null);

  return (
    <section id="services" className="bg-white px-6 md:px-13 py-28">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center gap-3.5 text-[10px] font-bold tracking-[4px] uppercase text-[--color-blue] mb-5">
          Services
          <span className="w-9 h-[1.5px] bg-[--color-blue]" />
        </div>
        <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.15] text-[--color-black] mb-14">
          何ができるのか。
        </h2>

        {/* カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              onClick={() => !s.disabled && setModal(s)}
              className={`relative py-11 px-9 border border-[--color-light-gray] border-t-[3px] transition-all ${
                s.disabled
                  ? "border-t-gray-300 opacity-50 cursor-not-allowed"
                  : "border-t-[--color-blue] cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              }`}
            >
              {s.disabled && (
                <span className="absolute top-4 right-4 text-[9px] font-bold tracking-[1px] uppercase px-2.5 py-1 bg-gray-100 text-[--color-mid-gray] rounded-full">
                  近日公開
                </span>
              )}
              <div className="text-[32px] mb-5">{s.icon}</div>
              <div className="text-[17px] font-extrabold text-[--color-black] mb-3">
                {s.title}
              </div>
              {s.disabled ? (
                <p className="text-[13px] font-light text-[--color-mid-gray] leading-[1.9]">
                  準備中です。近日公開予定。
                </p>
              ) : (
                <>
                  <p className="text-[13px] font-light text-[--color-mid-gray] leading-[1.9] mb-4">
                    {s.catchcopy}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {s.badges.map((b) => (
                      <span
                        key={b}
                        className="text-[10px] font-bold tracking-[1px] px-3 py-1.5 bg-[--color-blue-light] text-[--color-blue] border-l-[3px] border-[--color-blue]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-bold tracking-[2px] uppercase text-[--color-blue]">
                    詳しく見る →
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* モーダル */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded w-full max-w-lg max-h-[85vh] overflow-y-auto p-8 md:p-10 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setModal(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[--color-mid-gray] hover:text-[--color-black] transition-colors text-xl"
              aria-label="閉じる"
            >
              ×
            </button>

            {/* アイコン＋タイトル */}
            <div className="text-[32px] mb-3">{modal.icon}</div>
            <div className="text-[10px] font-bold tracking-[3px] uppercase text-[--color-blue] mb-3">
              {modal.title}
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[--color-black] mb-6 leading-snug">
              {modal.catchcopy}
            </h3>

            {/* 実績バッジ */}
            <div className="flex flex-wrap gap-2 mb-8">
              {modal.badges.map((b) => (
                <span
                  key={b}
                  className="text-[11px] font-bold tracking-[1px] px-4 py-2 bg-[--color-blue-light] text-[--color-blue] border-l-[3px] border-[--color-blue]"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* こんな人におすすめ */}
            <div className="mb-8">
              <h4 className="text-xs font-bold tracking-[3px] uppercase text-[--color-mid-gray] mb-3">
                こんな人におすすめ
              </h4>
              <p className="text-sm text-[--color-mid-gray] font-light">
                準備中です。近日公開予定。
              </p>
            </div>

            {/* サービスの流れ */}
            <div className="mb-8">
              <h4 className="text-xs font-bold tracking-[3px] uppercase text-[--color-mid-gray] mb-4">
                サービスの流れ
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {modal.steps.map((s, i) => (
                  <div
                    key={i}
                    className="p-5 border border-[--color-light-gray] border-l-[3px] border-l-[--color-blue]"
                  >
                    <div className="text-[10px] font-bold tracking-[3px] text-[--color-blue] mb-1">
                      {s.step}
                    </div>
                    <div className="text-sm font-extrabold text-[--color-black] mb-1">
                      {s.title}
                    </div>
                    <div className="text-[13px] font-light text-[--color-mid-gray] leading-[1.8]">
                      {s.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* よくある質問 */}
            <div className="mb-8">
              <h4 className="text-xs font-bold tracking-[3px] uppercase text-[--color-mid-gray] mb-3">
                よくある質問
              </h4>
              <p className="text-sm text-[--color-mid-gray] font-light">
                準備中です。近日公開予定。
              </p>
            </div>

            {/* LINEボタン */}
            <a
              href="https://works.do/xu7BAGz"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-3 w-full px-8 py-5 bg-[--color-dark] text-white text-xs font-bold tracking-[2.5px] uppercase no-underline rounded-sm transition-all hover:bg-black hover:-translate-y-[2px]"
            >
              LINE で無料相談する →
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
