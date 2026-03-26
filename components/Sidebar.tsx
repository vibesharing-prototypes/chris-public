"use client";

import Link from "next/link";
import { useState } from "react";
import { ALL_MEETINGS, ORG, formatDateShort } from "@/lib/mock-data";

function MiniCalendar() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const meetingDates = new Set(
    ALL_MEETINGS.map((m) => m.date)
      .filter((d) => {
        const md = new Date(d + "T00:00:00");
        return md.getMonth() === month && md.getFullYear() === year;
      })
      .map((d) => new Date(d + "T00:00:00").getDate())
  );

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button onClick={prevMonth} className="text-text-muted hover:text-text-primary p-1 text-xs">&larr;</button>
        <span className="text-xs font-semibold text-text-primary">{monthName}</span>
        <button onClick={nextMonth} className="text-text-muted hover:text-text-primary p-1 text-xs">&rarr;</button>
      </div>
      <div className="grid grid-cols-7 gap-0 text-center text-[10px]">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="py-1 text-text-muted font-semibold">{d}</div>
        ))}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="py-1" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const hasMeeting = meetingDates.has(day);
          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();
          return (
            <div
              key={day}
              className={`py-1 rounded text-[11px] ${
                isToday ? "bg-action text-text-inverse font-bold" : ""
              } ${hasMeeting && !isToday ? "bg-bg-inset font-semibold text-action" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MeetingList({ title, meetings }: { title: string; meetings: typeof ALL_MEETINGS }) {
  if (meetings.length === 0) return null;
  return (
    <div>
      <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">{title}</h4>
      <ul className="space-y-1.5">
        {meetings.map((m) => (
          <li key={m.id}>
            <Link
              href={`/meetings/${m.id}`}
              className="block text-xs hover:bg-bg-elevated rounded px-2 py-1.5 transition-colors"
            >
              <span className="font-semibold text-text-primary">{m.typeName}</span>
              <br />
              <span className="text-text-muted">{formatDateShort(m.date)} at {m.time}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Sidebar() {
  const today = new Date().toISOString().slice(0, 10);

  const todayMeetings = ALL_MEETINGS.filter((m) => m.date === today);
  const upcoming = ALL_MEETINGS
    .filter((m) => m.date > today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  const recent = ALL_MEETINGS
    .filter((m) => m.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <aside className="w-72 shrink-0 space-y-5">
      {/* Mini calendar */}
      <div className="bg-bg-surface border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Schedule of Meetings</h3>
        <MiniCalendar />
      </div>

      {/* Meeting lists */}
      <div className="bg-bg-surface border border-border rounded-lg p-4 space-y-4">
        {todayMeetings.length > 0 && (
          <MeetingList title="Today's Meetings" meetings={todayMeetings} />
        )}
        <MeetingList title="Upcoming Meetings" meetings={upcoming} />
        <MeetingList title="Recent Meetings" meetings={recent} />
      </div>

      {/* Social links */}
      <div className="bg-bg-surface border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Connect With Us</h3>
        <div className="flex gap-3">
          {Object.entries(ORG.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center text-text-secondary hover:bg-action hover:text-text-inverse transition-colors text-xs font-bold uppercase"
            >
              {platform[0]}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
