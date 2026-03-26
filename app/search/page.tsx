"use client";

import { useState } from "react";
import { DOCUMENTS, formatDateShort } from "@/lib/mock-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filtered = query
    ? DOCUMENTS.filter(
        (d) =>
          d.title.toLowerCase().includes(query.toLowerCase()) ||
          (d.meetingType && d.meetingType.toLowerCase().includes(query.toLowerCase()))
      )
    : DOCUMENTS;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-text-primary">Search Documents</h2>

      {/* Search bar */}
      <div className="bg-bg-surface border border-border rounded-lg p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents, agendas, and minutes..."
            className="flex-1 text-sm border border-border rounded px-4 py-2 bg-bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-ui-focus-ring"
          />
          <button className="bg-action text-text-inverse px-5 py-2 rounded text-sm font-semibold hover:bg-action-hover transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="bg-bg-surface border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 bg-bg-elevated border-b border-ui-divider">
          <span className="text-sm text-text-secondary">
            {filtered.length} document{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>
        <div className="divide-y divide-ui-divider">
          {filtered.map((doc) => (
            <div key={doc.id} className="px-5 py-3 hover:bg-bg-elevated transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-link hover:text-link-hover">{doc.title}</h4>
                  <p className="text-xs text-text-muted mt-0.5">
                    {doc.meetingType && <span>{doc.meetingType} &middot; </span>}
                    {formatDateShort(doc.date)} &middot; {doc.type}
                  </p>
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-bg-elevated text-text-muted">
                  {doc.type}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-text-muted text-sm">
              No documents match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
