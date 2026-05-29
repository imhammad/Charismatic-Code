"use client";

const cards = [
  {
    emoji: "⚡",
    title: "Daily 5‑min Prompt",
    description: "One small action to deepen a relationship today.",
    cta: "Get prompt →",
  },
  {
    emoji: "🛠️",
    title: "Random CS Tool",
    description: "A no‑fluff tool to reclaim focus and do better work.",
    cta: "Surprise me →",
  },
  {
    emoji: "🤝",
    title: "Connection Challenge",
    description: "Reach out to one person – we’ll give you the exact words.",
    cta: "Accept challenge →",
  },
];

export default function MicroInteractionCards() {
  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="font-display text-2xl text-stone-300 mb-12 text-center animate-fade-up opacity-0 animate-delay-100">
        Quick sparks
      </h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className={`group relative rounded-2xl border border-stone-800 bg-stone-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-400/10 animate-fade-up opacity-0 animate-delay-${(i + 2) * 100}`}
          >
            <div className="text-4xl mb-4 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
              {card.emoji}
            </div>
            <h3 className="font-display text-lg font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
              {card.title}
            </h3>
            <p className="font-body text-stone-500 text-sm leading-relaxed mb-4">
              {card.description}
            </p>
            <button
              onClick={() => alert(`✨ ${card.title} – coming soon!`)}
              className="font-body text-xs uppercase tracking-wider text-stone-400 hover:text-amber-400 transition-colors"
            >
              {card.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}