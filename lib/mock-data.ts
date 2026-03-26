export interface MeetingType {
  id: number;
  name: string;
  members: Member[];
  meetings: Meeting[];
}

export interface Member {
  name: string;
  title: string;
  term?: string;
}

export interface Meeting {
  id: number;
  typeId: number;
  typeName: string;
  date: string;
  time: string;
  location: string;
  hasAgenda: boolean;
  hasMinutes: boolean;
  hasVideo: boolean;
  agendaItems?: AgendaItem[];
}

export interface AgendaItem {
  number: string;
  title: string;
  description?: string;
  type: "action" | "information" | "consent";
}

export interface Document {
  id: number;
  title: string;
  type: string;
  date: string;
  meetingType?: string;
}

export const ORG = {
  name: "Glenbrook High School District 225",
  shortName: "Glenbrook 225",
  logoUrl: "/logo.svg",
  externalUrl: "https://glenbrook225.org",
  address: "3801 W. Lake Ave, Glenview, IL 60026",
  phone: "(847) 998-6100",
  social: {
    facebook: "#",
    twitter: "#",
    youtube: "#",
  },
};

export const MEETING_TYPES: MeetingType[] = [
  {
    id: 1,
    name: "Board of Education",
    members: [
      { name: "Karen Greenberg", title: "President", term: "2023-2027" },
      { name: "Peter Dolan", title: "Vice President", term: "2023-2027" },
      { name: "Deborah Faermark", title: "Member", term: "2021-2025" },
      { name: "Bruce Doughty", title: "Member", term: "2021-2025" },
      { name: "Skip Shein", title: "Member", term: "2023-2027" },
      { name: "Melissa Welin", title: "Member", term: "2023-2027" },
      { name: "Jill Whitmore", title: "Member", term: "2021-2025" },
    ],
    meetings: [
      {
        id: 101,
        typeId: 1,
        typeName: "Board of Education",
        date: "2026-03-24",
        time: "7:00 PM",
        location: "GBN Board Room",
        hasAgenda: true,
        hasMinutes: false,
        hasVideo: true,
        agendaItems: [
          { number: "1.0", title: "Call to Order", type: "action" },
          { number: "2.0", title: "Pledge of Allegiance", type: "action" },
          { number: "3.0", title: "Approval of Minutes - March 10, 2026", type: "consent" },
          { number: "4.0", title: "Public Comment", type: "information" },
          { number: "5.0", title: "Superintendent's Report", type: "information" },
          { number: "6.0", title: "Financial Report - February 2026", type: "information" },
          { number: "7.0", title: "Approval of 2026-2027 School Calendar", type: "action" },
          { number: "8.0", title: "Personnel Recommendations", type: "consent" },
          { number: "9.0", title: "Facility Improvement Update", type: "information" },
          { number: "10.0", title: "New Business", type: "action" },
          { number: "11.0", title: "Adjournment", type: "action" },
        ],
      },
      {
        id: 100,
        typeId: 1,
        typeName: "Board of Education",
        date: "2026-03-10",
        time: "7:00 PM",
        location: "GBN Board Room",
        hasAgenda: true,
        hasMinutes: true,
        hasVideo: true,
      },
      {
        id: 99,
        typeId: 1,
        typeName: "Board of Education",
        date: "2026-02-24",
        time: "7:00 PM",
        location: "GBN Board Room",
        hasAgenda: true,
        hasMinutes: true,
        hasVideo: true,
      },
    ],
  },
  {
    id: 2,
    name: "Finance Committee",
    members: [
      { name: "Peter Dolan", title: "Chair" },
      { name: "Bruce Doughty", title: "Member" },
      { name: "Skip Shein", title: "Member" },
    ],
    meetings: [
      {
        id: 201,
        typeId: 2,
        typeName: "Finance Committee",
        date: "2026-03-17",
        time: "6:00 PM",
        location: "GBN Conference Room A",
        hasAgenda: true,
        hasMinutes: false,
        hasVideo: false,
      },
      {
        id: 200,
        typeId: 2,
        typeName: "Finance Committee",
        date: "2026-02-17",
        time: "6:00 PM",
        location: "GBN Conference Room A",
        hasAgenda: true,
        hasMinutes: true,
        hasVideo: false,
      },
    ],
  },
  {
    id: 3,
    name: "Facilities Committee",
    members: [
      { name: "Melissa Welin", title: "Chair" },
      { name: "Deborah Faermark", title: "Member" },
      { name: "Jill Whitmore", title: "Member" },
    ],
    meetings: [
      {
        id: 301,
        typeId: 3,
        typeName: "Facilities Committee",
        date: "2026-03-12",
        time: "5:30 PM",
        location: "GBS Library",
        hasAgenda: true,
        hasMinutes: false,
        hasVideo: false,
      },
    ],
  },
  {
    id: 4,
    name: "Policy Committee",
    members: [
      { name: "Jill Whitmore", title: "Chair" },
      { name: "Karen Greenberg", title: "Member" },
    ],
    meetings: [
      {
        id: 401,
        typeId: 4,
        typeName: "Policy Committee",
        date: "2026-03-05",
        time: "4:00 PM",
        location: "GBN Conference Room B",
        hasAgenda: true,
        hasMinutes: true,
        hasVideo: false,
      },
    ],
  },
  {
    id: 5,
    name: "Communications Committee",
    members: [
      { name: "Skip Shein", title: "Chair" },
      { name: "Melissa Welin", title: "Member" },
    ],
    meetings: [
      {
        id: 501,
        typeId: 5,
        typeName: "Communications Committee",
        date: "2026-02-26",
        time: "4:30 PM",
        location: "GBN Media Center",
        hasAgenda: true,
        hasMinutes: true,
        hasVideo: false,
      },
    ],
  },
];

export const ALL_MEETINGS: Meeting[] = MEETING_TYPES.flatMap((t) => t.meetings);

export const DOCUMENTS: Document[] = [
  { id: 1, title: "2026-2027 Proposed School Calendar", type: "PDF", date: "2026-03-20", meetingType: "Board of Education" },
  { id: 2, title: "February 2026 Financial Report", type: "PDF", date: "2026-03-15", meetingType: "Finance Committee" },
  { id: 3, title: "Facility Master Plan Update", type: "PDF", date: "2026-03-10", meetingType: "Facilities Committee" },
  { id: 4, title: "Policy 5.10 - Student Conduct Revision", type: "PDF", date: "2026-03-01", meetingType: "Policy Committee" },
  { id: 5, title: "Superintendent's Annual Report 2025", type: "PDF", date: "2026-02-24", meetingType: "Board of Education" },
  { id: 6, title: "Communications Strategy 2026", type: "PDF", date: "2026-02-20", meetingType: "Communications Committee" },
  { id: 7, title: "Q2 Budget Forecast", type: "XLSX", date: "2026-02-15", meetingType: "Finance Committee" },
  { id: 8, title: "GBN Gymnasium Renovation Proposal", type: "PDF", date: "2026-02-10", meetingType: "Facilities Committee" },
];

export function getMeetingById(id: number): Meeting | undefined {
  return ALL_MEETINGS.find((m) => m.id === id);
}

export function getMeetingTypeById(id: number): MeetingType | undefined {
  return MEETING_TYPES.find((t) => t.id === id);
}

export function getMeetingTypeForMeeting(meetingId: number): MeetingType | undefined {
  return MEETING_TYPES.find((t) => t.meetings.some((m) => m.id === meetingId));
}

export function getUpcomingMeetings(count: number = 5): Meeting[] {
  const today = new Date().toISOString().slice(0, 10);
  return ALL_MEETINGS
    .filter((m) => m.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, count);
}

export function getRecentMeetings(count: number = 5): Meeting[] {
  const today = new Date().toISOString().slice(0, 10);
  return ALL_MEETINGS
    .filter((m) => m.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
