export default function Contact() {
  return (
    <section id="contact" className="bg-white px-6 md:px-13 py-28 text-center">
      <div className="flex items-center justify-center gap-3.5 text-[10px] font-bold tracking-[4px] uppercase text-[--color-blue] mb-5">
        Contact
      </div>
      <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.15] text-[--color-black] mb-5">
        座って、話しましょう。
      </h2>
      <p className="text-[15px] font-light text-[--color-mid-gray] leading-[1.9] mb-13">
        スカウト、仕事のご依頼、コラボレーション。
        <br />
        お気軽にどうぞ。
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/shintarooooo5"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-3.5 px-13 py-5 bg-[--color-blue] text-white text-xs font-bold tracking-[2.5px] uppercase no-underline rounded-sm transition-all hover:bg-[#0a35b0] hover:-translate-y-[3px]"
        >
          Instagram
        </a>
      </div>
    </section>
  );
}
