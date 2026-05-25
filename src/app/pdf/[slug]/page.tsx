import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pdfGuides, getPdfBySlug } from "@/lib/pdfData";
import SubscribeForm from "@/components/SubscribeForm";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return pdfGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getPdfBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — Free Guide`,
    description: guide.description,
  };
}

const accentMap: Record<string, string> = {
  rose: "text-rose-400 border-rose-400/30 bg-rose-400/10",
  amber: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  sky: "text-sky-400 border-sky-400/30 bg-sky-400/10",
  emerald: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  violet: "text-violet-400 border-violet-400/30 bg-violet-400/10",
};

const accentTextMap: Record<string, string> = {
  rose: "text-rose-400",
  amber: "text-amber-400",
  sky: "text-sky-400",
  emerald: "text-emerald-400",
  violet: "text-violet-400",
};

export default async function PdfPage({ params }: Props) {
  const { slug } = await params;
  const guide = getPdfBySlug(slug);
  if (!guide) notFound();

  const badgeClasses = accentMap[guide.accentColor] ?? accentMap["amber"];
  const accentText = accentTextMap[guide.accentColor] ?? "text-amber-400";

  return (
    <main className="relative z-10 min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-4xl mx-auto w-full">
        <Link
          href="/"
          className="font-body text-sm text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          All guides
        </Link>
        <span className={`text-xs font-body uppercase tracking-widest px-3 py-1 rounded-full border ${badgeClasses}`}>
          Free PDF
        </span>
      </nav>

      {/* Content */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-2xl mx-auto w-full">
        <div className="text-center mb-12 animate-fade-up opacity-0 animate-delay-100">
          <div className="text-6xl mb-6">{guide.emoji}</div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-stone-50 mb-4 leading-tight">
            {guide.title}
          </h1>
          <p className="font-body text-stone-400 text-lg leading-relaxed">
            {guide.description}
          </p>
        </div>

        {/* Form card */}
        <div className="animate-fade-up opacity-0 animate-delay-200 w-full bg-stone-900/60 border border-stone-800 rounded-2xl p-8 backdrop-blur-sm">
          <p className="font-body text-stone-300 text-center mb-6 text-sm">
            Enter your details below and the guide lands in your inbox{" "}
            <span className={accentText}>immediately.</span>
          </p>
          <SubscribeForm guide={guide} accentColor={guide.accentColor} />
        </div>

        {/* Trust line */}
        <p className="mt-6 text-xs text-stone-600 font-body text-center animate-fade-up opacity-0 animate-delay-300">
          No spam. No nonsense. Unsubscribe any time.
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-stone-700 text-xs font-body">
        © {new Date().getFullYear()} · All rights reserved.
      </footer>
    </main>
  );
}
