import { useMemo, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AppIcon from "../components/admin/AppIcon";
import AdminStatsGrid from "../components/admin/AdminStatsGrid";
import PendingRequestsCard from "../components/admin/PendingRequestsCard";
import RecentActivityCard from "../components/admin/RecentActivityCard";
import NotificationsPanel from "../components/admin/NotificationsPanel";
import {
  adminDashboardHeader,
  adminProfile,
  adminSidebarLinks,
  adminStats,
  notificationFilters,
  notifications,
  pendingRequests,
  recentActivity,
  systemStatus,
} from "../data/adminDashboardData";

export default function AdminDashboard() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const unreadCount = notifications.length;

  const visibleNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return notifications;
    }

    return notifications.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f2855_0%,_#071329_42%,_#050b18_100%)] text-slate-100">
      <div className="mx-auto flex max-w-[1560px]">
        <AdminSidebar profile={adminProfile} links={adminSidebarLinks} status={systemStatus} />

        <main className="w-full px-4 pb-8 pt-4 sm:px-7 lg:px-10">
          <header className="mb-8 rounded-2xl border border-white/10 bg-slate-900/55 px-5 py-4 backdrop-blur sm:px-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
              <AppIcon name="home" className="h-4 w-4" />
              {adminDashboardHeader.breadcrumb.map((item, index) => (
                <span key={item} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  <span>{item}</span>
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
                  {adminDashboardHeader.title}
                </h1>
                <p className="mt-2 text-sm text-slate-400 sm:text-base">{adminDashboardHeader.subtitle}</p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 self-start">
                <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 sm:flex">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-100">{adminProfile.adminName}</p>
                    <p className="text-xs text-slate-400">{adminProfile.adminRole}</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/25 text-blue-200">
                    <AppIcon name="user" className="h-4 w-4" />
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Open notifications"
                  onClick={() => setNotificationsOpen(true)}
                  className="relative rounded-xl border border-white/15 bg-slate-800/80 p-3 text-slate-200 transition hover:bg-slate-700"
                >
                  <AppIcon name="bell" className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-xs font-semibold text-white">
                    {unreadCount}
                  </span>
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition hover:bg-blue-400"
                >
                  <AppIcon name="add" className="h-4 w-4" />
                  {adminDashboardHeader.actionLabel}
                </button>
              </div>
            </div>
          </header>

          <AdminStatsGrid cards={adminStats} />

          <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
            <PendingRequestsCard requests={pendingRequests} />
            <RecentActivityCard activity={recentActivity} />
          </section>
        </main>
      </div>

      <NotificationsPanel
        isOpen={notificationsOpen}
        filters={notificationFilters}
        activeFilter={activeFilter}
        notifications={visibleNotifications}
        onFilterChange={setActiveFilter}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}
