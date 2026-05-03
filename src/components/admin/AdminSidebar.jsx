import { Link, useLocation } from "react-router-dom";
import AppIcon from "./AppIcon";

const statusTone = {
  healthy: "text-emerald-300",
  warning: "text-amber-300",
  danger: "text-rose-300",
};

export default function AdminSidebar({ profile, links, status, mode = "desktop", onClose }) {
  const isMobile = mode === "mobile";
  const location = useLocation();
  const asideClasses = isMobile
    ? "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-slate-900 px-5 py-6 shadow-2xl shadow-black/40 lg:hidden"
    : "hidden min-h-screen w-72 flex-col border-r border-white/10 bg-slate-900/85 px-5 py-6 lg:flex";

  return (
    <aside className={asideClasses}>
      <div className="mb-8 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-300 text-slate-950">
            <AppIcon name="shield" className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-slate-100">{profile.portalName}</h1>
            <p className="text-sm text-slate-400">{profile.portalSubtitle}</p>
          </div>
        </div>

        {isMobile && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={onClose}
            className="rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <AppIcon name="close" className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          const baseClasses =
            "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition";
          const activeClasses = isActive
            ? "bg-blue-500 text-white shadow-[0_0_22px_rgba(59,130,246,0.45)]"
            : "text-slate-300 hover:bg-slate-800 hover:text-slate-100";

          return (
            <Link
              key={link.id}
              to={link.path}
              className={`${baseClasses} ${activeClasses}`}
              onClick={isMobile ? onClose : undefined}
            >
              <AppIcon name={link.icon} className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-white/10 bg-slate-800/70 p-4">
        <p className="text-sm font-medium text-slate-300">{status.title}</p>
        <p className={`mt-2 text-sm ${statusTone[status.tone] ?? "text-slate-300"}`}>
          <span className="mr-1">●</span>
          {status.status}
        </p>
      </div>
    </aside>
  );
}
