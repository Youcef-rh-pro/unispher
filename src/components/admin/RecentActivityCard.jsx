const toneDotClass = {
  info: "bg-blue-400",
  success: "bg-emerald-400",
  accent: "bg-violet-400",
  muted: "bg-slate-400",
};

export default function RecentActivityCard({ activity }) {
  return (
    <section className="h-full rounded-2xl border border-white/10 bg-slate-800/70 p-6 shadow-xl shadow-slate-950/25">
      <h2 className="mb-5 text-2xl font-semibold text-slate-100">{activity.title}</h2>
      <div className="space-y-4">
        {activity.items.map((item) => (
          <article key={item.id} className="border-l border-white/10 pl-4">
            <div className="flex items-start gap-3">
              <span className={`mt-1 inline-flex h-2.5 w-2.5 rounded-full ${toneDotClass[item.tone] ?? "bg-slate-400"}`} />
              <div>
                <h3 className="font-medium text-slate-100">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.description}</p>
                <p className="mt-1 text-xs text-slate-500">{item.time}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
