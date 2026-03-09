"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";

const TIME_SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30",
  "18:00","18:30","19:00","19:30",
];

const DAY_NAMES = ["日","月","火","水","木","金","土"];

interface Slot {
  id: string;
  date: string;
  time_slot: string;
  is_available: boolean;
  status?: string;
}

function daysUntilNextSunday(): number {
  const dow = new Date().getDay();
  return dow === 0 ? 14 : (7 - dow) + 7;
}

export default function Schedule() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [weekOffset, setWeekOffset] = useState(0);

  const [selected, setSelected] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", purpose: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    setLoading(true);
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, "0")}-${endDay}`;

    const { data } = await supabase
      .from("schedules")
      .select("id, date, time_slot, is_available, status")
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date")
      .order("time_slot");

    setSlots(data || []);
    setLoading(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysInMonth = new Date(year, month, 0).getDate();
  const allDates = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const d = new Date(year, month - 1, day);
    return {
      day,
      dateStr: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      dow: d.getDay(),
      dateObj: d,
    };
  }).filter(({ dateObj }) => dateObj >= today);

  const visibleDates = useMemo(() => {
    const start = new Date(today);
    start.setDate(start.getDate() + weekOffset * 7);
    const end = new Date(weekOffset === 0 ? today : start);
    end.setDate(end.getDate() + (weekOffset === 0 ? daysUntilNextSunday() : 7));
    return allDates.filter(({ dateObj }) => dateObj >= (weekOffset === 0 ? today : start) && dateObj <= end);
  }, [weekOffset, allDates]);

  const canPrev = weekOffset > 0;
  const canNext = visibleDates.length > 0 && visibleDates[visibleDates.length - 1].dateObj < new Date(year, month - 1, daysInMonth);

  const slotMap = new Map<string, Slot>();
  slots.forEach((s) => slotMap.set(`${s.date}_${s.time_slot}`, s));

  const getStatus = (date: string, ts: string) => {
    const s = slotMap.get(`${date}_${ts}`);
    if (!s) return "unavailable";
    if (s.status === "booked") return "booked";
    if (s.status === "available" || s.is_available) return "available";
    return "unavailable";
  };

  const availableCount = useMemo(() => {
    return slots.filter((s) => (s.status === "available" || s.is_available) && s.status !== "booked").length;
  }, [slots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "名前を入力してください";
    if (!form.phone.trim()) errs.phone = "連絡先を入力してください";
    if (!form.email.trim()) errs.email = "メールアドレスを入力してください";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "正しいメールアドレスを入力してください";
    if (!form.purpose.trim()) errs.purpose = "用件を入力してください";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("https://my-schedule-app-murex.vercel.app/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedule_id: selected!.id, ...form }),
      });
      if (res.ok) {
        setSelected(null);
        setDone(true);
        setForm({ name: "", phone: "", email: "", purpose: "" });
        fetchSlots();
      } else {
        const data = await res.json();
        alert(data.error || "申し込みに失敗しました");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (d: string) => {
    const dt = new Date(d);
    return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日（${DAY_NAMES[dt.getDay()]}）`;
  };

  const period = visibleDates.length > 0
    ? `${visibleDates[0].dateObj.getMonth() + 1}/${visibleDates[0].day}〜${visibleDates[visibleDates.length - 1].dateObj.getMonth() + 1}/${visibleDates[visibleDates.length - 1].day}`
    : "";

  return (
    <section id="schedule" className="bg-white px-6 md:px-13 py-28">
      <div className="max-w-5xl mx-auto">
        {/* セクションヘッダー */}
        <div className="flex items-center justify-center gap-3.5 text-[10px] font-bold tracking-[4px] uppercase text-[--color-blue] mb-5">
          Schedule
        </div>
        <h2 className="text-[clamp(34px,4vw,56px)] font-black leading-[1.15] text-[--color-black] mb-5 text-center">
          {year}年{month}月のスケジュール
        </h2>
        <p className="text-[15px] font-light text-[--color-mid-gray] leading-[1.9] mb-4 text-center">
          緑色（○）のコマをクリックすると面談の申し込みができます。
        </p>

        {/* 完了メッセージ */}
        {done && (
          <div className="text-center mb-8 p-6 bg-[--color-blue]/5 rounded">
            <p className="text-lg font-bold mb-1">申し込みが完了しました</p>
            <p className="text-sm text-[--color-mid-gray] mb-4">確認メールをお送りしました。</p>
            <button onClick={() => setDone(false)} className="px-6 py-2 text-sm font-medium text-white bg-[--color-blue]">
              スケジュールに戻る
            </button>
          </div>
        )}

        {!done && (
          <>
            {/* 空き情報 */}
            {!loading && (
              <p className="text-sm text-center mb-8 font-medium" style={{ color: availableCount > 0 ? "#1246d6" : "#888" }}>
                {availableCount > 0 ? `現在 ${availableCount} 件の空きがあります` : "現在空きはありません"}
              </p>
            )}

            {/* 週送りナビゲーション */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setWeekOffset((p) => Math.max(0, p - 1))}
                disabled={!canPrev}
                className="px-4 py-2 text-xs font-medium border border-[--color-light-gray] disabled:opacity-20"
              >
                ← 前の週
              </button>
              <span className="text-sm font-medium">{period}</span>
              <button
                onClick={() => setWeekOffset((p) => p + 1)}
                disabled={!canNext}
                className="px-4 py-2 text-xs font-medium border border-[--color-light-gray] disabled:opacity-20"
              >
                次の週 →
              </button>
            </div>

            {/* グリッド */}
            {loading ? (
              <div className="flex justify-center py-20 text-sm text-[--color-mid-gray]">読み込み中...</div>
            ) : (
              <div className="overflow-x-auto border border-[--color-light-gray] rounded">
                <table className="min-w-max border-collapse text-xs">
                  <thead>
                    <tr>
                      <th className="sticky top-0 left-0 z-20 bg-white border border-[--color-light-gray] px-2 py-2 font-bold text-[--color-blue]" style={{ minWidth: 56 }}>
                        時間
                      </th>
                      {visibleDates.map(({ day, dateStr, dow, dateObj }) => (
                        <th
                          key={dateStr}
                          className="sticky top-0 z-10 bg-white border border-[--color-light-gray] px-1 py-2 font-medium whitespace-nowrap"
                          style={{ color: dow === 0 ? "#e53e3e" : dow === 6 ? "#3182ce" : "var(--color-dark)", minWidth: 40 }}
                        >
                          <div>{dateObj.getMonth() + 1}/{day}</div>
                          <div className="text-[10px]">({DAY_NAMES[dow]})</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TIME_SLOTS.map((ts) => (
                      <tr key={ts}>
                        <td className="sticky left-0 z-10 bg-white border border-[--color-light-gray] px-2 py-1 font-medium text-center text-[--color-blue]">
                          {ts}
                        </td>
                        {visibleDates.map(({ dateStr }) => {
                          const status = getStatus(dateStr, ts);
                          const slot = slotMap.get(`${dateStr}_${ts}`);
                          const bg = status === "available" ? "#22c55e" : status === "booked" ? "#1246d6" : "#ebebeb";
                          const color = status === "available" ? "#fff" : status === "booked" ? "#fff" : "#bbb";
                          const label = status === "available" ? "○" : status === "booked" ? "済" : "×";
                          return (
                            <td
                              key={`${dateStr}_${ts}`}
                              className="border border-[--color-light-gray] text-center font-bold select-none"
                              style={{ backgroundColor: bg, color, width: 40, height: 32, fontSize: 11, cursor: status === "available" ? "pointer" : "default", transition: "background-color 0.15s" }}
                              onClick={() => { if (status === "available" && slot) setSelected(slot); }}
                            >
                              {label}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 凡例 */}
            <div className="flex flex-wrap gap-5 mt-5 text-xs text-[--color-mid-gray]">
              <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: "#22c55e" }} />&nbsp;○ 空き</div>
              <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: "#1246d6" }} />&nbsp;済 予約済み</div>
              <div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: "#ebebeb" }} />&nbsp;× 埋まり</div>
            </div>
          </>
        )}

        {/* 申し込みモーダル */}
        {selected && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded w-full max-w-md p-8 shadow-xl">
              <h2 className="text-lg font-bold mb-1 text-[--color-dark]">面談申し込み</h2>
              <p className="text-sm text-[--color-mid-gray] mb-6">{formatDate(selected.date)} {selected.time_slot}〜</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">名前</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-[--color-light-gray] px-3 py-2 text-sm focus:outline-none focus:border-[--color-blue]" placeholder="山田 太郎" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">連絡先（電話番号）</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-[--color-light-gray] px-3 py-2 text-sm focus:outline-none focus:border-[--color-blue]" placeholder="090-1234-5678" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">メールアドレス</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-[--color-light-gray] px-3 py-2 text-sm focus:outline-none focus:border-[--color-blue]" placeholder="example@email.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">用件</label>
                  <textarea value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} className="w-full border border-[--color-light-gray] px-3 py-2 text-sm focus:outline-none focus:border-[--color-blue] resize-none" rows={3} placeholder="面談の日程調整について" />
                  {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setSelected(null)} className="flex-1 border border-[--color-light-gray] py-2.5 text-sm font-medium hover:bg-gray-50">キャンセル</button>
                  <button type="submit" disabled={submitting} className="flex-1 py-2.5 text-sm font-medium text-white bg-[--color-blue] disabled:opacity-50">{submitting ? "送信中..." : "申し込む"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
