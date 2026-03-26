"use client";

import Link from "next/link";
import { useState } from "react";
import { ALL_MEETINGS, ORG, formatDateShort, formatDate } from "@/lib/mock-data";

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

export default function Sidebar() {
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = ALL_MEETINGS
    .filter((m) => m.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const nextMeeting = upcoming[0];
  const restUpcoming = upcoming.slice(1, 4);
  const recent = ALL_MEETINGS
    .filter((m) => m.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <aside className="w-72 shrink-0 space-y-5">
      {/* Next meeting hero */}
      {nextMeeting && (
        <Link
          href={`/meetings/${nextMeeting.id}`}
          className="block bg-action rounded-lg p-4 text-text-inverse hover:bg-action-hover transition-colors"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-text-inverse/70">Next Meeting</p>
          <p className="text-base font-bold mt-1 leading-tight">{nextMeeting.typeName}</p>
          <p className="text-sm mt-1.5 text-text-inverse/90">{formatDate(nextMeeting.date)}</p>
          <p className="text-sm text-text-inverse/70">{nextMeeting.time} &middot; {nextMeeting.location}</p>
          {nextMeeting.hasAgenda && (
            <span className="inline-block mt-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white/20">
              Agenda Available
            </span>
          )}
        </Link>
      )}

      {/* Live stream status */}
      <div className="bg-bg-surface border border-border rounded-lg px-4 py-3 flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-text-disabled shrink-0" />
        <p className="text-xs text-text-muted">No meetings currently in session</p>
      </div>

      {/* Calendar */}
      <div className="bg-bg-surface border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">Schedule</h3>
          <Link href="/calendar" className="text-[10px] text-link hover:text-link-hover font-medium">
            Full Calendar
          </Link>
        </div>
        <MiniCalendar />
      </div>

      {/* Upcoming */}
      {restUpcoming.length > 0 && (
        <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wide px-4 py-2 bg-bg-elevated">
            Upcoming
          </h4>
          <div className="divide-y divide-ui-divider">
            {restUpcoming.map((m) => (
              <Link
                key={m.id}
                href={`/meetings/${m.id}`}
                className="block px-4 py-2.5 hover:bg-bg-elevated transition-colors"
              >
                <span className="text-xs font-semibold text-text-primary">{m.typeName}</span>
                <br />
                <span className="text-[11px] text-text-muted">{formatDateShort(m.date)} at {m.time}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent */}
      {recent.length > 0 && (
        <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wide px-4 py-2 bg-bg-elevated">
            Recent Meetings
          </h4>
          <div className="divide-y divide-ui-divider">
            {recent.map((m) => (
              <Link
                key={m.id}
                href={`/meetings/${m.id}`}
                className="block px-4 py-2.5 hover:bg-bg-elevated transition-colors"
              >
                <span className="text-xs font-semibold text-text-primary">{m.typeName}</span>
                <br />
                <span className="text-[11px] text-text-muted">{formatDateShort(m.date)} at {m.time}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

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
