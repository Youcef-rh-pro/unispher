export default function UserRegistrationsTable({ rows, onApprove, onReject, disabled }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-xl shadow-slate-950/30">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-slate-900/60 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Applicant Name</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Institutional Email</th>
              <th className="px-6 py-4 font-semibold">Department</th>
              <th className="px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.id} className="group transition hover:bg-slate-900/80">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${row.tone}`}>
                      {row.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100">{row.name}</p>
                      <p className="text-xs text-slate-500">{row.appliedAt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded px-2 py-1 text-xs font-semibold ${
                      row.role === "Teacher"
                        ? "border border-violet-400/30 bg-violet-500/15 text-violet-200"
                        : "border border-orange-400/30 bg-orange-500/15 text-orange-200"
                    }`}
                  >
                    {row.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-300">{row.email}</td>
                <td className="px-6 py-4 text-slate-200">{row.department}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => onReject(row)}
                      disabled={disabled}
                      className="rounded px-3 py-1.5 text-sm font-medium text-rose-300 transition hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      onClick={() => onApprove(row)}
                      disabled={disabled}
                      className="rounded bg-blue-400/90 px-4 py-1.5 text-sm font-semibold text-slate-900 transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Verify
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-slate-900/50 px-6 py-4 text-xs text-slate-400">
        <span>Showing 1-5 of {rows.length}</span>
        <div className="flex items-center gap-2">
          <button type="button" className="text-slate-500 transition hover:text-slate-200" disabled>
            Previous
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
          <span className="text-slate-500">...</span>
          <button type="button" className="h-8 w-8 rounded border border-white/10 text-sm text-slate-400 hover:text-slate-200">
            29
          </button>
          <button type="button" className="text-slate-300 transition hover:text-blue-200">
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
