"use client";

import Link from "next/link";
import { useState } from "react";
import { ALL_MEETINGS, formatDateShort } from "@/lib/mock-data";

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
        <button onClick={prevMonth} className="text-text-muted hover:text-text-primary p-1 text-sm">&larr;</button>
        <span className="text-sm font-semibold text-text-primary">{monthName}</span>
        <button onClick={nextMonth} className="text-text-muted hover:text-text-primary p-1 text-sm">&rarr;</button>
      </div>
      <div className="grid grid-cols-7 gap-0 text-center text-xs">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="py-1.5 text-text-muted font-semibold">{d}</div>
        ))}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="py-1.5" />
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
              className={`py-1.5 rounded text-xs ${
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
      <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wide px-5 py-2 bg-bg-elevated">{title}</h4>
      <div className="divide-y divide-ui-divider">
        {meetings.map((m) => (
          <Link
            key={m.id}
            href={`/meetings/${m.id}`}
            className="block px-5 py-2.5 hover:bg-bg-elevated transition-colors"
          >
            <span className="text-sm font-medium text-text-primary">{m.typeName}</span>
            <br />
            <span className="text-xs text-text-muted">{formatDateShort(m.date)} at {m.time}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function MeetingsPanel() {
  const today = new Date().toISOString().slice(0, 10);

  const todayMeetings = ALL_MEETINGS.filter((m) => m.date === today);
  const upcoming = ALL_MEETINGS
    .filter((m) => m.date > today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);
  const recent = ALL_MEETINGS
    .filter((m) => m.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-bg-elevated px-5 py-3 flex items-center justify-between">
        <h3 className="font-semibold text-text-primary text-sm">Schedule of Meetings</h3>
        <Link href="/calendar" className="text-xs text-link hover:text-link-hover font-medium">
          View Full Calendar
        </Link>
      </div>

      {/* Calendar + Live Stream side by side */}
      <div className="flex border-b border-ui-divider">
        {/* Mini calendar */}
        <div className="flex-1 p-4 border-r border-ui-divider">
          <MiniCalendar />
        </div>

        {/* Live stream */}
        <div className="w-64 p-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-text-disabled" />
            <span className="font-semibold text-text-primary text-sm">Live Stream</span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            No meetings currently in session. The live stream will appear here when a meeting is underway.
          </p>
        </div>
      </div>

      {/* Meeting lists */}
      {todayMeetings.length > 0 && (
        <MeetingList title="Today's Meetings" meetings={todayMeetings} />
      )}
      <MeetingList title="Upcoming Meetings" meetings={upcoming} />
      <MeetingList title="Recent Meetings" meetings={recent} />
    </div>
  );
}
