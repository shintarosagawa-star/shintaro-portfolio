const stats = [
  { number: "22", unit: "歳", label: "Age" },
  { number: "600", unit: "万", label: "月商達成" },
  { number: "TOP", unit: "4", label: "全国高校選手権" },
  { number: "17", unit: "年", label: "サッカー歴" },
];

export default function Stats() {
  return (
    <section id="stats" className="bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`py-14 px-6 md:px-10 text-center ${
              i < stats.length - 1 ? "md:border-r md:border-black/7" : ""
            } ${i % 2 === 0 ? "border-r border-black/7 md:border-r" : ""}`}
          >
            <div className="font-['Bebas_Neue'] text-[clamp(52px,5vw,80px)] text-[--color-black] tracking-[2px] leading-none mb-2">
              {s.number}
              <span className="text-[0.45em] text-[--color-blue] tracking-[1px]">
                {s.unit}
              </span>
            </div>
            <div className="text-[10px] font-bold tracking-[2.5px] uppercase text-[--color-mid-gray]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
