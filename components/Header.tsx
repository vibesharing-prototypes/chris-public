"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ORG } from "@/lib/mock-data";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Calendar", href: "/calendar" },
  { label: "Meetings", href: "/meetings" },
  { label: "Search", href: "/search" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header>
      {/* Top bar */}
      <div className="bg-bg-status-bar text-text-inverse text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href={ORG.externalUrl} className="text-text-inverse/80 hover:text-text-inverse text-xs">
              Public Site
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-text-inverse/80 hover:text-text-inverse text-xs">
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Org banner */}
      <div className="bg-bg-top text-text-inverse">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center text-lg font-bold">
            G
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">{ORG.name}</h1>
            <p className="text-xs text-text-inverse/70">Community Portal</p>
          </div>
        </div>
      </div>

      {/* Primary nav */}
      <nav className="bg-bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex gap-0">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-5 py-3 text-sm font-semibold border-b-2 transition-colors ${
                      isActive
                        ? "border-action text-action"
                        : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-emphasis"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
