"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  getMeetingById,
  getMeetingTypeForMeeting,
  formatDate,
  formatDateShort,
} from "@/lib/mock-data";

type Tab = "agenda" | "minutes" | "video";

export default function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const meetingId = parseInt(id, 10);
  const meeting = getMeetingById(meetingId);
  const meetingType = getMeetingTypeForMeeting(meetingId);
  const [activeTab, setActiveTab] = useState<Tab>("agenda");

  if (!meeting || !meetingType) {
    return (
      <div className="bg-bg-surface border border-border rounded-lg p-8 text-center">
        <p className="text-text-secondary">Meeting not found.</p>
        <Link href="/meetings" className="text-link hover:text-link-hover text-sm mt-2 inline-block">
          &larr; Back to Meetings
        </Link>
      </div>
    );
  }

  const siblingMeetings = meetingType.meetings;
  const currentIndex = siblingMeetings.findIndex((m) => m.id === meetingId);
  const prevMeeting = siblingMeetings[currentIndex + 1];
  const nextMeeting = siblingMeetings[currentIndex - 1];

  const TABS: { key: Tab; label: string; available: boolean }[] = [
    { key: "agenda", label: "Agenda", available: meeting.hasAgenda },
    { key: "minutes", label: "Minutes", available: meeting.hasMinutes },
    { key: "video", label: "Video", available: meeting.hasVideo },
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="text-xs text-text-muted">
        <Link href="/" className="hover:text-link">Home</Link>
        <span className="mx-1">/</span>
        <Link href="/meetings" className="hover:text-link">Meetings</Link>
        <span className="mx-1">/</span>
        <span className="text-text-primary">{meetingType.name}</span>
      </nav>

      {/* Meeting carousel */}
      <div className="bg-bg-surface border border-border rounded-lg p-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {siblingMeetings.map((m) => (
            <Link
              key={m.id}
              href={`/meetings/${m.id}`}
              className={`shrink-0 px-3 py-2 rounded text-xs font-medium transition-colors ${
                m.id === meetingId
                  ? "bg-action text-text-inverse"
                  : "bg-bg-elevated text-text-secondary hover:bg-bg-inset"
              }`}
            >
              {formatDateShort(m.date)}
            </Link>
          ))}
        </div>
      </div>

      {/* Meeting header */}
      <div className="bg-bg-surface border border-border rounded-lg p-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-primary">{meetingType.name}</h2>
            <p className="text-sm text-text-secondary mt-1">{formatDate(meeting.date)} at {meeting.time}</p>
            <p className="text-sm text-text-muted">{meeting.location}</p>
          </div>
          <div className="flex gap-2">
            {prevMeeting && (
              <Link
                href={`/meetings/${prevMeeting.id}`}
                className="text-xs text-link hover:text-link-hover px-3 py-1.5 border border-border rounded hover:bg-bg-elevated transition-colors"
              >
                &larr; Previous
              </Link>
            )}
            {nextMeeting && (
              <Link
                href={`/meetings/${nextMeeting.id}`}
                className="text-xs text-link hover:text-link-hover px-3 py-1.5 border border-border rounded hover:bg-bg-elevated transition-colors"
              >
                Next &rarr;
              </Link>
            )}
          </div>
        </div>

        {/* Members */}
        <div className="mt-4 pt-4 border-t border-ui-divider">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Members</h4>
          <div className="flex flex-wrap gap-2">
            {meetingType.members.map((member) => (
              <span
                key={member.name}
                className="inline-flex items-center gap-1.5 text-xs bg-bg-elevated rounded-full px-3 py-1"
              >
                <span className="w-5 h-5 bg-action text-text-inverse rounded-full flex items-center justify-center text-[10px] font-bold">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span className="text-text-primary font-medium">{member.name}</span>
                <span className="text-text-muted">({member.title})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
        <div className="flex border-b border-ui-divider">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => tab.available && setActiveTab(tab.key)}
              disabled={!tab.available}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-action text-action"
                  : tab.available
                  ? "border-transparent text-text-secondary hover:text-text-primary"
                  : "border-transparent text-text-disabled cursor-not-allowed"
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2 pr-4">
            <button className="text-xs text-link hover:text-link-hover px-2 py-1 rounded border border-border hover:bg-bg-elevated transition-colors">
              Print Version
            </button>
            <button className="text-xs text-link hover:text-link-hover px-2 py-1 rounded border border-border hover:bg-bg-elevated transition-colors">
              Download PDF
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="p-5">
          {activeTab === "agenda" && (
            <div>
              {meeting.agendaItems ? (
                <div className="space-y-0">
                  {meeting.agendaItems.map((item) => (
                    <div
                      key={item.number}
                      className="flex items-start gap-4 py-3 border-b border-ui-divider last:border-0"
                    >
                      <span className="text-xs font-mono text-text-muted w-10 shrink-0 pt-0.5">
                        {item.number}
                      </span>
                      <div className="flex-1">
                        <span className="text-sm text-text-primary">{item.title}</span>
                      </div>
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                          item.type === "action"
                            ? "bg-status-info-muted text-status-info"
                            : item.type === "consent"
                            ? "bg-status-success-muted text-status-success"
                            : "bg-bg-elevated text-text-muted"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-text-muted text-sm">
                  Agenda document will appear here when available.
                </div>
              )}
            </div>
          )}

          {activeTab === "minutes" && (
            <div className="text-center py-12">
              <p className="text-text-secondary text-sm">Signed minutes document</p>
              <p className="text-text-muted text-xs mt-1">PDF viewer would be embedded here.</p>
              <div className="mt-4 flex justify-center gap-3">
                <button className="text-xs bg-action text-text-inverse px-4 py-2 rounded hover:bg-action-hover transition-colors">
                  View Signed Minutes (PDF)
                </button>
                <button className="text-xs border border-border text-link px-4 py-2 rounded hover:bg-bg-elevated transition-colors">
                  Accessible Web Version
                </button>
              </div>
            </div>
          )}

          {activeTab === "video" && (
            <div className="text-center py-12">
              <div className="bg-bg-inset rounded-lg aspect-video max-w-2xl mx-auto flex items-center justify-center">
                <p className="text-text-muted text-sm">Meeting recording player</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
