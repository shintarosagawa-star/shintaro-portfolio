const cards = [
  {
    icon: "⚽",
    title: "FC NossA 八王子",
    desc: "MFとして現役プレー中。2026年の目標は「圧倒的成長、細胞レベルで楽しむ」。",
    status: "Active",
  },
  {
    icon: "💼",
    title: "AIコンサル・営業代行",
    desc: "最前線のAIツールを駆使しながら個人事業を拡大中。4年次休学しビジネス本格化予定。",
    status: "Active",
  },
  {
    icon: "🎯",
    title: "2026年の目標",
    desc: "サッカー：圧倒的成長、細胞レベルで楽しむ。ビジネス：人間の解像度を上げ、価値を提供できる人間になる。",
    status: "In Progress",
  },
];

export default function Now() {
  return (
    <section id="now" className="bg-white px-6 md:px-13 py-24">
      <div className="flex items-center gap-3.5 text-[10px] font-bold tracking-[4px] uppercase text-[--color-blue] mb-5">
        Now
        <span className="w-9 h-[1.5px] bg-[--color-blue]" />
      </div>
      <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.15] text-[--color-black] mb-18">
        今、動いている。
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="py-11 px-9 bg-white border border-[--color-light-gray] border-t-[3px] border-t-[--color-blue] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          >
            <div className="text-[32px] mb-5">{c.icon}</div>
            <div className="text-[17px] font-extrabold text-[--color-black] mb-3">
              {c.title}
            </div>
            <div className="text-[13px] font-light text-[--color-mid-gray] leading-[1.9]">
              {c.desc}
            </div>
            <div className="inline-flex items-center gap-[7px] mt-5 text-[10px] font-bold tracking-[2px] uppercase text-[--color-blue]">
              <span className="w-1.5 h-1.5 rounded-full bg-[--color-blue] status-dot" />
              {c.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
