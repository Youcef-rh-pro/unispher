export default function CourseApprovalFilters({ filters, activeFilter, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 p-1">
      {filters.map((filter) => {
        const label = filter.count ? `${filter.label} (${filter.count})` : filter.label;
        const isActive = activeFilter === filter.id;
        const classes = isActive
          ? "bg-slate-700 text-slate-100 shadow-sm"
          : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50";

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onChange(filter.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${classes}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
