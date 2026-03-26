import Link from "next/link";

const TILES = [
  {
    title: "Welcome",
    description: "Learn how to navigate this portal and find meeting information.",
    href: "#",
    color: "bg-action",
  },
  {
    title: "Live Stream",
    description: "Watch board meetings live when they are in session.",
    href: "#",
    color: "bg-brand-color",
  },
  {
    title: "Policy",
    description: "Search and browse current board policies.",
    href: "#",
    color: "bg-action",
  },
  {
    title: "Subscribe",
    description: "Get email notifications when new agendas are published.",
    href: "#",
    color: "bg-brand-color",
  },
  {
    title: "Document Library",
    description: "Browse and search public board documents.",
    href: "/search",
    color: "bg-action",
  },
];

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

      {/* Tile grid */}
      <div className="grid grid-cols-3 gap-4">
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
