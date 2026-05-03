export default function UserRegistrationStats({ total, students, teachers }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/25">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Total Pending</p>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-4xl font-semibold text-slate-100">{total}</span>
          <span className="text-sm font-medium text-orange-300">+12%</span>
        </div>
      </article>
      <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/25">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Student Requests</p>
        <div className="mt-3 text-4xl font-semibold text-slate-100">{students}</div>
      </article>
      <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/25">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Faculty Requests</p>
        <div className="mt-3 text-4xl font-semibold text-slate-100">{teachers}</div>
      </article>
    </section>
  );
}
