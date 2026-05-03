import AppIcon from "./AppIcon";

const toneClasses = {
  orange: "bg-orange-500/15 text-orange-300",
  violet: "bg-violet-500/15 text-violet-300",
  danger: "bg-rose-500/15 text-rose-300",
};

export default function NotificationsPanel({
  isOpen,
  filters,
  activeFilter,
  notifications,
  onFilterChange,
  onMarkAllRead,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/60 p-3 sm:p-5" role="presentation" onClick={onClose}>
      <section
        className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40"
        role="dialog"
        aria-modal="true"
        aria-label="Notifications panel"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Notifications</h2>
            <p className="mt-1 text-sm text-slate-400">Review recent activities and system alerts.</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onMarkAllRead}
              className="text-sm font-medium text-blue-300 transition hover:text-blue-200"
            >
              Mark all as read
            </button>
            <button
              type="button"
              aria-label="Close notifications"
              onClick={onClose}
              className="rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              <AppIcon name="close" className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="border-b border-white/10 px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => onFilterChange(filter.id)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "border-blue-400 bg-blue-500/20 text-blue-200"
                      : "border-white/20 text-slate-300 hover:border-slate-400 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-h-[65vh] overflow-y-auto">
          {notifications.length === 0 && (
            <div className="px-6 py-14 text-center text-slate-400">
              No notifications for this filter yet.
            </div>
          )}

          {notifications.map((notice) => (
            <article
              key={notice.id}
              className={`flex items-start justify-between gap-4 border-b border-white/10 px-6 py-6 transition hover:bg-slate-800/80 ${
                notice.tone === "danger" ? "bg-rose-500/6" : "bg-transparent"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`mt-0.5 flex h-11 w-11 items-center justify-center rounded-full ${toneClasses[notice.tone] ?? "bg-slate-700 text-slate-300"}`}
                >
                  <AppIcon name={notice.icon} className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-xl font-medium leading-tight text-slate-100 sm:text-3xl">{notice.title}</h3>
                  <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-300">{notice.message}</p>
                  {notice.actionLabel && (
                    <button
                      type="button"
                      className="mt-4 rounded-lg bg-blue-200 px-4 py-2 text-sm font-semibold text-blue-950 transition hover:bg-blue-100"
                    >
                      {notice.actionLabel}
                    </button>
                  )}
                </div>
              </div>

              <p className="whitespace-nowrap text-sm text-slate-400">{notice.time}</p>
            </article>
          ))}
        </div>

        <footer className="flex justify-center px-6 py-5 text-center">
          <button type="button" className="text-lg font-medium text-blue-300 transition hover:text-blue-200">
            View All Notifications Archive
          </button>
        </footer>
      </section>
    </div>
  );
}
