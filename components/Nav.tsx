"use client";

import { useState } from "react";

const links = [
  { href: "#soccer", label: "Soccer" },
  { href: "#business", label: "Business" },
  { href: "#story", label: "Story" },
  { href: "#now", label: "Now" },
  { href: "#schedule", label: "Schedule" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex justify-between items-center px-6 md:px-13 py-4 bg-white/95 backdrop-blur-md border-b border-black/7">
      <a
        href="#"
        className="font-['Bebas_Neue'] text-xl tracking-[4px] text-[--color-black] no-underline"
      >
        SHINTARO
      </a>

      {/* ハンバーガー（モバイル） */}
      <button
        className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
        onClick={() => setOpen(!open)}
        aria-label="メニュー"
      >
        <span
          className={`block w-6 h-0.5 bg-[--color-dark] transition-transform ${open ? "rotate-45 translate-y-[7px]" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-[--color-dark] transition-opacity ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-[--color-dark] transition-transform ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
        />
      </button>

      {/* デスクトップリンク */}
      <ul className="hidden md:flex gap-9 list-none items-center">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[11px] font-bold tracking-[2.5px] uppercase text-[--color-dark] no-underline hover:text-[--color-blue] transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            className="text-[11px] font-bold tracking-[2.5px] uppercase no-underline px-6 py-2.5 bg-[--color-blue] text-white rounded-sm hover:opacity-85 transition-opacity"
          >
            Contact
          </a>
        </li>
      </ul>

      {/* モバイルメニュー */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-black/7 md:hidden">
          <ul className="list-none flex flex-col gap-4 p-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-bold tracking-[2px] uppercase text-[--color-dark] no-underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-block text-sm font-bold tracking-[2px] uppercase no-underline px-6 py-2.5 bg-[--color-blue] text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
