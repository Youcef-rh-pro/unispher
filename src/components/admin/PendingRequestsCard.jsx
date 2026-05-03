import AppIcon from "./AppIcon";

export default function PendingRequestsCard({ requests, onAccept, onReject, onViewAll }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-800/70 p-6 shadow-xl shadow-slate-950/25">
      <header className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-100">{requests.title}</h2>
        <button 
          type="button" 
          onClick={onViewAll}
          className="text-sm font-medium text-blue-300 transition hover:text-blue-200"
        >
          {requests.ctaLabel}
        </button>
      </header>

      <div className="space-y-4">
        {requests.items.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-10 text-center text-sm text-slate-400">
            No pending requests found.
          </div>
        )}

        {requests.items.map((item) => (
          <article key={item.id} className="flex items-start justify-between gap-4 rounded-xl border border-transparent px-2 py-2 hover:border-white/10 hover:bg-slate-800/70">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-300">
                <AppIcon name={item.icon} className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-slate-100">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {item.meta} • {item.submittedAgo}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onAccept && onAccept(item.apiId)}
                aria-label="Approve request"
                className="rounded-full p-1.5 text-emerald-300 transition hover:bg-emerald-500/15"
              >
                <AppIcon name="check" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onReject && onReject(item.apiId)}
                aria-label="Reject request"
                className="rounded-full p-1.5 text-rose-300 transition hover:bg-rose-500/15"
              >
                <AppIcon name="close" className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-xl border border-white/10 bg-slate-900/50 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700/70 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={requests.items.length === 0}
      >
        {requests.moreLabel}
      </button>
    </section>
  );
}
