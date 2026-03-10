"use client";

import { useState } from "react";

const tabs = [
  { id: "sales", label: "営業代行", disabled: false },
  { id: "ai", label: "AIコンサル", disabled: false },
  { id: "sns", label: "SNSコンサル", disabled: true },
];

const salesBadges = ["月商600万達成", "入社2ヶ月で同期2位", "成約率20%"];
const aiBadges = ["ChatGPT", "Claude", "Midjourney を実務活用"];

const salesSteps = [
  { step: "STEP 1", title: "無料相談", desc: "まずはお気軽にLINEでご連絡ください。" },
  { step: "STEP 2", title: "現状把握・提案", desc: "課題をヒアリングし、最適なプランをご提案します。" },
  { step: "STEP 3", title: "実施・改善", desc: "実行しながらPDCAを回し、成果を最大化します。" },
];

const aiSteps = [
  { step: "STEP 1", title: "無料相談", desc: "まずはお気軽にLINEでご連絡ください。" },
  { step: "STEP 2", title: "現状把握・提案", desc: "業務フローを分析し、AI活用ポイントをご提案します。" },
  { step: "STEP 3", title: "導入・サポート", desc: "ツール導入から運用定着まで伴走します。" },
];

export default function Services() {
  const [active, setActive] = useState("sales");

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

        {/* タブ */}
        <div className="flex gap-0 border-b border-[--color-light-gray] mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActive(tab.id)}
              disabled={tab.disabled}
              className={`relative px-6 py-3 text-sm font-bold tracking-[1px] transition-colors ${
                tab.disabled
                  ? "text-[--color-light-gray] cursor-not-allowed"
                  : active === tab.id
                  ? "text-[--color-black]"
                  : "text-[--color-mid-gray] hover:text-[--color-black]"
              }`}
            >
              {tab.label}
              {tab.disabled && (
                <span className="ml-2 text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 bg-gray-100 text-[--color-mid-gray] rounded-full align-middle">
                  近日公開
                </span>
              )}
              {active === tab.id && !tab.disabled && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[--color-blue]" />
              )}
            </button>
          ))}
        </div>

        {/* 営業代行 */}
        {active === "sales" && (
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[--color-black] mb-6 leading-snug">
              あなたの売上を、<br className="md:hidden" />一緒に作りに行く。
            </h3>

            {/* 実績バッジ */}
            <div className="flex flex-wrap gap-3 mb-12">
              {salesBadges.map((b) => (
                <span
                  key={b}
                  className="text-[11px] font-bold tracking-[1px] px-4 py-2 bg-[--color-blue-light] text-[--color-blue] border-l-[3px] border-[--color-blue]"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* こんな人におすすめ */}
            <div className="mb-12">
              <h4 className="text-xs font-bold tracking-[3px] uppercase text-[--color-mid-gray] mb-4">
                こんな人におすすめ
              </h4>
              <p className="text-sm text-[--color-mid-gray] font-light">
                準備中です。近日公開予定。
              </p>
            </div>

            {/* サービスの流れ */}
            <div className="mb-12">
              <h4 className="text-xs font-bold tracking-[3px] uppercase text-[--color-mid-gray] mb-6">
                サービスの流れ
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {salesSteps.map((s, i) => (
                  <div
                    key={i}
                    className="p-6 border border-[--color-light-gray] border-t-[3px] border-t-[--color-blue]"
                  >
                    <div className="text-[10px] font-bold tracking-[3px] text-[--color-blue] mb-2">
                      {s.step}
                    </div>
                    <div className="text-base font-extrabold text-[--color-black] mb-2">
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
            <div className="mb-12">
              <h4 className="text-xs font-bold tracking-[3px] uppercase text-[--color-mid-gray] mb-4">
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
              className="inline-flex items-center gap-3 px-10 py-5 bg-[--color-dark] text-white text-xs font-bold tracking-[2.5px] uppercase no-underline rounded-sm transition-all hover:bg-black hover:-translate-y-[2px]"
            >
              LINE で無料相談する →
            </a>
          </div>
        )}

        {/* AIコンサル */}
        {active === "ai" && (
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-[--color-black] mb-6 leading-snug">
              AIを、あなたのビジネスの<br className="md:hidden" />武器にする。
            </h3>

            {/* 実績バッジ */}
            <div className="flex flex-wrap gap-3 mb-12">
              {aiBadges.map((b) => (
                <span
                  key={b}
                  className="text-[11px] font-bold tracking-[1px] px-4 py-2 bg-[--color-blue-light] text-[--color-blue] border-l-[3px] border-[--color-blue]"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* こんな人におすすめ */}
            <div className="mb-12">
              <h4 className="text-xs font-bold tracking-[3px] uppercase text-[--color-mid-gray] mb-4">
                こんな人におすすめ
              </h4>
              <p className="text-sm text-[--color-mid-gray] font-light">
                準備中です。近日公開予定。
              </p>
            </div>

            {/* サービスの流れ */}
            <div className="mb-12">
              <h4 className="text-xs font-bold tracking-[3px] uppercase text-[--color-mid-gray] mb-6">
                サービスの流れ
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiSteps.map((s, i) => (
                  <div
                    key={i}
                    className="p-6 border border-[--color-light-gray] border-t-[3px] border-t-[--color-blue]"
                  >
                    <div className="text-[10px] font-bold tracking-[3px] text-[--color-blue] mb-2">
                      {s.step}
                    </div>
                    <div className="text-base font-extrabold text-[--color-black] mb-2">
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
            <div className="mb-12">
              <h4 className="text-xs font-bold tracking-[3px] uppercase text-[--color-mid-gray] mb-4">
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
              className="inline-flex items-center gap-3 px-10 py-5 bg-[--color-dark] text-white text-xs font-bold tracking-[2.5px] uppercase no-underline rounded-sm transition-all hover:bg-black hover:-translate-y-[2px]"
            >
              LINE で無料相談する →
            </a>
          </div>
        )}

        {/* SNSコンサル */}
        {active === "sns" && (
          <div className="text-center py-20">
            <p className="text-sm text-[--color-mid-gray] font-light">
              準備中です。近日公開予定。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
