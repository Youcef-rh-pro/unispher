import AppIcon from "./AppIcon";

export default function AdminTopNav({ onOpenSidebar, profile, searchPlaceholder }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-6 border-b border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur">
      <div className="flex flex-1 items-center gap-4">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open mobile sidebar"
          className="inline-flex rounded-lg border border-white/10 bg-slate-900/70 p-2 text-slate-200 transition hover:bg-slate-800 lg:hidden"
        >
          <AppIcon name="menu" className="h-4 w-4" />
        </button>

        <div className="relative w-full max-w-md">
          <AppIcon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder={searchPlaceholder || "Search courses, instructors, or IDs..."}
            className="w-full rounded-full border border-white/10 bg-slate-900/70 py-2 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 text-blue-300">
        <button className="relative rounded-full p-2 transition hover:bg-slate-800/60 hover:text-blue-200" type="button">
          <AppIcon name="bell" className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-orange-400 ring-2 ring-slate-950" />
        </button>
        <button className="rounded-full p-2 transition hover:bg-slate-800/60 hover:text-blue-200" type="button">
          <AppIcon name="apps" className="h-5 w-5" />
        </button>
        <div className="hidden h-8 w-px bg-slate-800 sm:block" />
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800">
            <AppIcon name="user" className="h-4 w-4 text-slate-300" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-slate-200">{profile?.adminName || "Admin User"}</p>
            <p className="text-xs text-slate-500">{profile?.portalSubtitle || "Institutional Management"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
