const values = [
  {
    title: "貪欲さ",
    desc: "面白そうと思ったらすぐ動く。朝8時から深夜2時まで働く日も珍しくない。成長への渇望が止まらない。",
  },
  {
    title: "素直さ",
    desc: "上司のフィードバックも、自分の弱さも、まず受け入れる。素直さが成長の最短距離だと知っている。",
  },
  {
    title: "人間力",
    desc: "サッカーで培った「人を理解し、信頼を築く力」をビジネスの現場でも発揮する。それが自分の強みだ。",
  },
];

export default function Story() {
  return (
    <section id="story" className="bg-white px-6 md:px-13 py-24">
      <div className="flex items-center gap-3.5 text-[10px] font-bold tracking-[4px] uppercase text-[--color-blue] mb-5">
        Story
        <span className="w-9 h-[1.5px] bg-[--color-blue]" />
      </div>
      <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.15] text-[--color-black] mb-18">
        弱さと向き合い、
        <br />
        信頼を築く。
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* 左：本文 */}
        <div className="space-y-7">
          <p className="text-[15px] font-light leading-[2.1] text-[#444]">
            「周りに負けたくない」という他人軸で動いていた。ビジネス力をつけたい、平均年収は嫌だと思いながらも、それが
            <strong className="text-[--color-black] font-extrabold">
              「自分は何をしたいのか」ではなく「他人からどう見られるか」
            </strong>
            から来ていた。
          </p>
          <p className="text-[15px] font-light leading-[2.1] text-[#444]">
            AIベンチャーで非成約が続き、人間不信になった時期があった。振り返れば、顧客を「契約への手段」として見ていた。上司に「何のために働くの？」と問われ、一週間、自分と向き合い続けた。
          </p>
          <p className="text-[15px] font-light leading-[2.1] text-[#444]">
            思い出したのは、
            <strong className="text-[--color-black] font-extrabold">
              サッカーの夢を信じて応援してくれた人たちの顔
            </strong>
            だった。親、恩師、友人。自分が本当にしたかったのは「恩返し」だと気づいた。
          </p>
          <p className="text-[15px] font-light leading-[2.1] text-[#444]">
            <strong className="text-[--color-black] font-extrabold">
              人間の解像度を上げ、価値を提供できる人間になる。
            </strong>
            <br />
            それが今の自分の軸だ。
          </p>
        </div>

        {/* 右：価値観カード */}
        <div className="flex flex-col gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="py-7 px-8 border-l-[3px] border-[--color-blue] bg-[--color-off-white]"
            >
              <div className="text-base font-extrabold text-[--color-black] mb-2">
                {v.title}
              </div>
              <div className="text-[13px] font-light text-[--color-mid-gray] leading-[1.8]">
                {v.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
