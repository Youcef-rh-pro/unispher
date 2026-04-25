import AppIcon from "./AppIcon";

const pillToneClasses = {
  positive: "bg-emerald-500/20 text-emerald-300",
  neutral: "bg-slate-500/30 text-slate-300",
};

function StatCard({ card }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-800/70 p-6 shadow-xl shadow-slate-950/25 backdrop-blur">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/80" style={{ color: card.accentColor }}>
          <AppIcon name={card.icon} className="h-5 w-5" />
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${pillToneClasses[card.pillTone] ?? "bg-slate-700 text-slate-200"}`}>
          {card.pill}
        </span>
      </div>

      <p className="text-sm text-slate-300">{card.title}</p>
      <p className="mt-1 text-4xl font-semibold tracking-tight text-slate-50">{card.value}</p>

      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-600/60">
        <div className="h-full rounded-full" style={{ width: `${card.progress}%`, backgroundColor: card.accentColor }} />
      </div>
    </article>
  );
}

export default function AdminStatsGrid({ cards }) {
  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      {cards.map((card) => (
        <StatCard key={card.id} card={card} />
      ))}
    </section>
  );
}
