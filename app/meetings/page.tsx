import Link from "next/link";
import { MEETING_TYPES, formatDateShort } from "@/lib/mock-data";

export default function MeetingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text-primary">Meetings</h2>

      <div className="space-y-4">
        {MEETING_TYPES.map((type) => (
          <div key={type.id} className="bg-bg-surface border border-border rounded-lg overflow-hidden">
            {/* Type header */}
            <div className="bg-bg-elevated px-5 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-text-primary">{type.name}</h3>
              <Link
                href={`/meetings?type=${type.id}`}
                className="text-xs text-link hover:text-link-hover font-medium"
              >
                Members ({type.members.length})
              </Link>
            </div>

            {/* Recent meetings */}
            <div className="divide-y divide-ui-divider">
              {type.meetings.slice(0, 3).map((meeting) => (
                <Link
                  key={meeting.id}
                  href={`/meetings/${meeting.id}`}
                  className="block px-5 py-3 hover:bg-bg-elevated transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-text-primary">
                        {formatDateShort(meeting.date)}
                      </span>
                      <span className="text-sm text-text-secondary ml-2">
                        at {meeting.time}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {meeting.hasAgenda && (
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-status-info-muted text-status-info">
                          Agenda
                        </span>
                      )}
                      {meeting.hasMinutes && (
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-status-success-muted text-status-success">
                          Minutes
                        </span>
                      )}
                      {meeting.hasVideo && (
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-status-warning-muted text-status-warning">
                          Video
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5">{meeting.location}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
