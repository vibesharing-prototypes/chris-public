export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-surface mt-8">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-text-muted">
        &copy; Diligent Community {new Date().getFullYear()}
      </div>
    </footer>
  );
}
