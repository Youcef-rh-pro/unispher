import AppIcon from "./AppIcon";

export default function CourseApprovalsTable({ rows, onApprove, onReject }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl shadow-slate-950/30">
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Course Details</th>
              <th className="px-6 py-4 font-semibold">Instructor</th>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 font-semibold">Submitted</th>
              <th className="px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-slate-400">
                  No course approvals to show.
                </td>
              </tr>
            )}

            {rows.map((row) => (
              <tr key={row.id} className="group transition hover:bg-slate-900/80">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-100 group-hover:text-blue-200">{row.title}</span>
                    <span className="mt-1 text-xs text-slate-500">{row.meta}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {row.instructorAvatar ? (
                      <img
                        src={row.instructorAvatar}
                        alt={row.instructor}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-slate-900 ${
                          row.instructorTone || "bg-blue-400"
                        }`}
                      >
                        {row.instructorInitials}
                      </div>
                    )}
                    <span className="text-slate-300">{row.instructor}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/70 px-3 py-1 text-xs font-medium text-slate-300">
                    <AppIcon name={row.typeIcon} className="h-4 w-4" />
                    {row.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400">{row.submitted}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => onReject?.(row)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rose-400/60 text-rose-300 transition hover:bg-rose-500/15"
                      aria-label="Reject"
                    >
                      <AppIcon name="close" className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onApprove?.(row)}
                      className="inline-flex items-center rounded-lg bg-blue-400/90 px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-blue-300"
                    >
                      Approve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-4 text-xs text-slate-400">
        <span>Showing 1 to 4 of 12 pending requests</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded p-1 text-slate-500 transition hover:text-slate-200 disabled:opacity-50"
            disabled
          >
            <AppIcon name="chevron-left" className="h-4 w-4" />
          </button>
          <button type="button" className="h-8 w-8 rounded border border-white/10 bg-slate-800 text-sm text-slate-100">
            1
          </button>
          <button type="button" className="h-8 w-8 rounded border border-white/10 text-sm text-slate-400 hover:text-slate-200">
            2
          </button>
          <button type="button" className="h-8 w-8 rounded border border-white/10 text-sm text-slate-400 hover:text-slate-200">
            3
          </button>
          <button type="button" className="rounded p-1 text-slate-500 transition hover:text-slate-200">
            <AppIcon name="chevron-right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
