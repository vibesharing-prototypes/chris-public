"use client";

import { useState } from "react";
import Link from "next/link";
import { ALL_MEETINGS, MEETING_TYPES } from "@/lib/mock-data";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [filterType, setFilterType] = useState<number | null>(null);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const filteredMeetings = filterType
    ? ALL_MEETINGS.filter((m) => m.typeId === filterType)
    : ALL_MEETINGS;

  const meetingsByDate: Record<number, typeof ALL_MEETINGS> = {};
  filteredMeetings.forEach((m) => {
    const d = new Date(m.date + "T00:00:00");
    if (d.getMonth() === month && d.getFullYear() === year) {
      const day = d.getDate();
      if (!meetingsByDate[day]) meetingsByDate[day] = [];
      meetingsByDate[day].push(m);
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text-primary">Calendar</h2>

      {/* Controls */}
      <div className="bg-bg-surface border border-border rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            className="px-3 py-1.5 text-sm border border-border rounded hover:bg-bg-elevated transition-colors"
          >
            &larr; Previous
          </button>
          <h3 className="text-lg font-semibold text-text-primary min-w-[180px] text-center">
            {monthName}
          </h3>
          <button
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            className="px-3 py-1.5 text-sm border border-border rounded hover:bg-bg-elevated transition-colors"
          >
            Next &rarr;
          </button>
        </div>

        <select
          value={filterType ?? ""}
          onChange={(e) => setFilterType(e.target.value ? parseInt(e.target.value) : null)}
          className="text-sm border border-border rounded px-3 py-1.5 bg-bg-surface text-text-primary"
        >
          <option value="">All Meeting Types</option>
          {MEETING_TYPES.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {/* Calendar grid */}
      <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-ui-divider">
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
            <div key={d} className="py-2 px-3 text-xs font-semibold text-text-secondary bg-bg-elevated text-center">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px] border-b border-r border-ui-divider bg-bg-base/50" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayMeetings = meetingsByDate[day] || [];
            const isToday =
              day === new Date().getDate() &&
              month === new Date().getMonth() &&
              year === new Date().getFullYear();
            return (
              <div
                key={day}
                className={`min-h-[100px] border-b border-r border-ui-divider p-2 ${
                  isToday ? "bg-bg-inset" : ""
                }`}
              >
                <span
                  className={`text-xs font-medium ${
                    isToday
                      ? "bg-action text-text-inverse w-6 h-6 rounded-full flex items-center justify-center"
                      : "text-text-secondary"
                  }`}
                >
                  {day}
                </span>
                <div className="mt-1 space-y-1">
                  {dayMeetings.map((m) => (
                    <Link
                      key={m.id}
                      href={`/meetings/${m.id}`}
                      className="block text-[10px] bg-action/10 text-action rounded px-1.5 py-0.5 truncate hover:bg-action/20 transition-colors font-medium"
                    >
                      {m.typeName}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
