import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Soccer from "@/components/Soccer";
import Business from "@/components/Business";
import Story from "@/components/Story";
import Now from "@/components/Now";
import Blog from "@/components/Blog";
import Schedule from "@/components/Schedule";
import Contact from "@/components/Contact";

export const revalidate = 60; // ISR: 60秒ごとにNotion記事を再取得

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Soccer />
      <Business />
      <Story />
      <Now />
      <Blog />
      <Schedule />
      <Contact />

      {/* フッター */}
      <footer className="bg-[--color-dark] px-6 md:px-13 py-10">
        <div className="flex justify-center gap-8 mb-6">
          {/* Instagram：URLを自分のものに差し替えてください */}
          <a
            href="https://www.instagram.com/shintarooooo5"
            target="_blank"
            rel="noopener"
            className="text-sm text-white/50 no-underline hover:text-white transition-colors"
          >
            Instagram
          </a>
          {/* LINE WORKS */}
          <a
            href="https://works.do/xu7BAGz"
            target="_blank"
            rel="noopener"
            className="text-sm text-white/50 no-underline hover:text-white transition-colors"
          >
            LINE
          </a>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2.5">
          <div className="font-['Bebas_Neue'] text-base tracking-[4px] text-white">
            SHINTARO SAGAWA
          </div>
          <div className="text-[10px] text-white/25 tracking-[1px]">
            © 2026 Shintaro Sagawa. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
