import Link from "next/link";
import { pdfGuides } from "@/lib/pdfData";
import GuideCard from "@/components/GuideCard";
import SocialLinks from "@/components/SocialLinks";
import CursorSparkles from "@/components/CursorSparkles"; 

export default function HomePage() {
  return (
    <>
    <CursorSparkles />
    <main className="relative z-10 min-h-screen">
      {/* Hero */}
      <section className="px-6 pt-24 pb-20 max-w-4xl mx-auto text-center">
        <p
          className="animate-fade-up opacity-0 animate-delay-100 text-xs uppercase tracking-[0.25em] text-stone-400 mb-6 font-body"
        >
          Free Resources
        </p>
        <h1
          className="animate-fade-up opacity-0 animate-delay-200 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-stone-50 mb-6"
        >
          The Charismatic Code
          <br />
          <span className="italic text-amber-400">connect the world</span>
        </h1>
        <p
          className="animate-fade-up opacity-0 animate-delay-300 font-body text-lg text-stone-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Practical, no-fluff guides, let's code and learn together,
          and get those connections!!
        </p>

        <div className="animate-fade-up opacity-0 animate-delay-400">
          <SocialLinks />
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
      </div>

      {/* Guides Grid */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <h2 className="animate-fade-up opacity-0 animate-delay-100 font-display text-2xl text-stone-300 mb-12 text-center">
          Pick your guide
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pdfGuides.map((guide, i) => (
            <div
              key={guide.slug}
              className={`animate-fade-up opacity-0 animate-delay-${(i + 2) * 100}`}
            >
              <GuideCard guide={guide} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-stone-600 text-sm font-body border-t border-stone-800">
        <p>© {new Date().getFullYear()} · By Hammad Hassan.</p>
      </footer>
    </main>
    </>
  );
}
