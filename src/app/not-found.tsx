import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-body text-xs uppercase tracking-widest text-stone-600 mb-4">404</p>
      <h1 className="font-display text-5xl font-bold text-stone-100 mb-4">
        Page not found.
      </h1>
      <p className="font-body text-stone-500 mb-8">
        The guide you&apos;re looking for doesn&apos;t exist — or not yet.
      </p>
      <Link
        href="/"
        className="font-body text-sm px-6 py-3 rounded-full bg-amber-400 text-stone-950 font-semibold hover:bg-amber-300 transition-colors"
      >
        ← Back to all guides
      </Link>
    </main>
  );
}
