"use client";

import Link from "next/link";
import type { PdfGuide } from "@/lib/pdfData";

interface Props {
  guide: PdfGuide;
}

const accentHoverMap: Record<string, string> = {
  rose: "group-hover:border-rose-400/50 group-hover:shadow-rose-400/10",
  amber: "group-hover:border-amber-400/50 group-hover:shadow-amber-400/10",
  sky: "group-hover:border-sky-400/50 group-hover:shadow-sky-400/10",
  emerald: "group-hover:border-emerald-400/50 group-hover:shadow-emerald-400/10",
  violet: "group-hover:border-violet-400/50 group-hover:shadow-violet-400/10",
};

const accentTextMap: Record<string, string> = {
  rose: "group-hover:text-rose-400",
  amber: "group-hover:text-amber-400",
  sky: "group-hover:text-sky-400",
  emerald: "group-hover:text-emerald-400",
  violet: "group-hover:text-violet-400",
};

const accentBgMap: Record<string, string> = {
  rose: "group-hover:bg-rose-400 group-hover:text-stone-950",
  amber: "group-hover:bg-amber-400 group-hover:text-stone-950",
  sky: "group-hover:bg-sky-400 group-hover:text-stone-950",
  emerald: "group-hover:bg-emerald-400 group-hover:text-stone-950",
  violet: "group-hover:bg-violet-400 group-hover:text-stone-950",
};

export default function GuideCard({ guide }: Props) {
  const borderHover = accentHoverMap[guide.accentColor] ?? accentHoverMap.amber;
  const textHover = accentTextMap[guide.accentColor] ?? accentTextMap.amber;
  const btnHover = accentBgMap[guide.accentColor] ?? accentBgMap.amber;

  return (
    <Link href={`/pdf/${guide.slug}`} className="group block h-full">
      <div
        className={`h-full flex flex-col rounded-2xl border border-stone-800 bg-stone-900/50 p-6 transition-all duration-300 ${borderHover} shadow-lg hover:shadow-xl hover:-translate-y-1`}
      >
        <div className="text-4xl mb-4">{guide.emoji}</div>
        <h3
          className={`font-display text-xl font-bold text-stone-100 mb-3 leading-snug transition-colors ${textHover}`}
        >
          {guide.title}
        </h3>
        <p className="font-body text-stone-500 text-sm leading-relaxed flex-1">
          {guide.description}
        </p>
        <div className="mt-6">
          <span
            className={`inline-block font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-stone-700 text-stone-400 transition-all duration-300 ${btnHover}`}
          >
            Get free PDF →
          </span>
        </div>
      </div>
    </Link>
  );
}
