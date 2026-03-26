"use client";

import Link from "next/link";
import { useState } from "react";

const TILES = [
  {
    title: "Welcome",
    description: "Learn how to navigate this portal and find meeting information.",
    href: "#",
    color: "bg-action",
  },
  {
    title: "Policy",
    description: "Search and browse current board policies.",
    href: "#",
    color: "bg-brand-color",
  },
  {
    title: "Subscribe",
    description: "Get email notifications when new agendas are published.",
    href: "#",
    color: "bg-action",
  },
  {
    title: "Document Library",
    description: "Browse and search public board documents.",
    href: "/search",
    color: "bg-brand-color",
  },
];

const GOALS = [
  {
    id: "1",
    title: "Student Learning & Achievement",
    strategies: [
      { label: "Expand AP and dual-credit course offerings", progress: 80 },
      { label: "Implement multi-tiered support systems for at-risk students", progress: 30 },
      { label: "Increase career & technical education pathways", progress: 20 },
      { label: "Adopt competency-based grading pilot program", progress: 10 },
      { label: "Strengthen social-emotional learning curriculum", progress: 30 },
    ],
  },
  {
    id: "2",
    title: "Staff Recruitment & Development",
    strategies: [
      { label: "Launch new teacher mentorship program" },
      { label: "Increase competitive compensation benchmarking" },
      { label: "Expand professional development partnerships" },
      { label: "Improve staff retention through wellness initiatives" },
      { label: "Diversify hiring pipeline outreach" },
    ],
  },
  {
    id: "3",
    title: "Facilities & Operations",
    strategies: [
      { label: "Complete GBN gymnasium renovation" },
      { label: "Upgrade HVAC systems district-wide" },
      { label: "Implement energy efficiency improvements" },
      { label: "Modernize science lab facilities" },
      { label: "Improve campus accessibility and ADA compliance" },
    ],
  },
  {
    id: "4",
    title: "Fiscal Responsibility",
    strategies: [
      { label: "Maintain fund balance above 30% target" },
      { label: "Reduce operational costs through efficiency audits" },
      { label: "Develop long-range capital improvement plan" },
      { label: "Increase transparency in budget reporting" },
    ],
  },
];

function GoalsSection() {
  const [activeGoal, setActiveGoal] = useState("1");
  const goal = GOALS.find((g) => g.id === activeGoal)!;

  return (
    <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
      <div className="bg-action px-5 py-3">
        <h3 className="font-bold text-text-inverse text-sm uppercase tracking-wider">Goals</h3>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ui-divider">
        {GOALS.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveGoal(g.id)}
            className={`flex-1 px-3 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeGoal === g.id
                ? "border-action text-action bg-bg-surface"
                : "border-transparent text-text-secondary hover:text-text-primary bg-bg-elevated"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      {/* Active goal content */}
      <div className="px-5 py-4">
        <div className="space-y-2.5">
          {goal.strategies.map((s) => (
            <div key={s.label}>
              <div className="flex items-start gap-2">
                <span className="text-text-muted mt-0.5 text-xs">&#x25CE;</span>
                <span className="text-sm text-text-secondary">{s.label}</span>
              </div>
              {s.progress !== undefined && (
                <div className="mt-1 ml-5 h-5 bg-bg-elevated rounded-sm overflow-hidden flex items-center">
                  <div
                    className="h-full bg-status-success flex items-center justify-center text-[10px] font-bold text-text-inverse rounded-sm"
                    style={{ width: `${Math.max(s.progress, 12)}%` }}
                  >
                    {s.progress}%
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative bg-bg-top rounded-lg overflow-hidden h-56 flex items-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=400&fit=crop"
          alt="School building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="relative p-6 text-white">
          <h2 className="text-2xl font-bold mb-1">Welcome to the Community Portal</h2>
          <p className="text-sm text-white/80">
            Access board meeting agendas, minutes, and documents for Glenbrook High School District 225.
          </p>
        </div>
      </div>

      {/* Welcome text */}
      <div className="bg-bg-surface border border-border rounded-lg p-5">
        <p className="text-sm text-text-secondary leading-relaxed">
          By Board policy, Glenbrook High School District 225 Board meetings are scheduled on the second and fourth
          Mondays of the month. Regular meetings begin at 7 p.m. and are typically held in the Board Room at 3801 West
          Lake Avenue in Glenview. This portal enables community members to view upcoming agendas, explore past meeting
          materials, and subscribe to notifications.
        </p>
      </div>

      {/* Goals */}
      <GoalsSection />

      {/* Tile grid */}
      <div className="grid grid-cols-2 gap-4">
        {TILES.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="group bg-bg-surface border border-border rounded-lg overflow-hidden hover:shadow-medium transition-shadow"
          >
            <div className={`${tile.color} h-2`} />
            <div className="p-4">
              <h3 className="font-semibold text-text-primary group-hover:text-action transition-colors">
                {tile.title}
              </h3>
              <p className="text-xs text-text-secondary mt-1">{tile.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
