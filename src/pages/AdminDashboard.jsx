import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AppIcon from "../components/admin/AppIcon";
import AdminStatsGrid from "../components/admin/AdminStatsGrid";
import PendingRequestsCard from "../components/admin/PendingRequestsCard";
import RecentActivityCard from "../components/admin/RecentActivityCard";
import NotificationsPanel from "../components/admin/NotificationsPanel";
import { ACCESS_TOKEN_STORAGE_KEY, API_BASE_URL } from "../config/api";
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

const notificationTypeMap = {
  SYSTEM: { category: "system", tone: "danger", icon: "warning" },
  CONNECTION_REQUEST: { category: "registrations", tone: "violet", icon: "registrations" },
  CONNECTION_ACCEPTED: { category: "registrations", tone: "violet", icon: "registrations" },
  COURSE_PUBLISHED: { category: "approvals", tone: "orange", icon: "approvals" },
  COURSE_ENROLLEMENT: { category: "registrations", tone: "violet", icon: "student" },
  PUBLISHED_POST: { category: "approvals", tone: "orange", icon: "announcements" },
  COMMENT_POST: { category: "approvals", tone: "orange", icon: "announcements" },
  LIKE_POST: { category: "approvals", tone: "orange", icon: "announcements" },
  RECEIVED_MESSAGE: { category: "registrations", tone: "violet", icon: "registrations" },
  BOOKMARKED_POST: { category: "approvals", tone: "orange", icon: "approvals" },
};

const activityToneMap = {
  danger: "accent",
  violet: "info",
  orange: "success",
};

const cloneDefaultDashboardState = () => ({
  profile: { ...adminProfile },
  status: { ...systemStatus },
  stats: adminStats.map((card) => ({ ...card })),
  requests: {
    ...pendingRequests,
    items: pendingRequests.items.map((item) => ({ ...item })),
  },
  activity: {
    ...recentActivity,
    items: recentActivity.items.map((item) => ({ ...item })),
  },
  notifications: notifications.map((item) => ({ ...item, isRead: false, apiId: null })),
});

const toRelativeTime = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "Now";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";

  return `${diffDays} days ago`;
};

const toRoleLabel = (role) => {
  if (!role) {
    return "Administrator";
  }

  const normalizedRole = role.toLowerCase();
  return `${normalizedRole.slice(0, 1).toUpperCase()}${normalizedRole.slice(1)}`;
};

const safeProgress = (value, min = 12, multiplier = 10) => {
  const computed = Math.round(value * multiplier);
  return Math.max(min, Math.min(100, computed));
};

const apiRequest = async (path, accessToken, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "API request failed");
  }

  return payload;
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(() => cloneDefaultDashboardState());
  const [isLoading, setIsLoading] = useState(true);
  const [liveDataStatus, setLiveDataStatus] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    let isCancelled = false;

    const loadDashboardData = async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
      if (!accessToken) {
        setLiveDataStatus("No access token found. Sign in to load live dashboard data.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const [profileResult, notificationsResult, requestsResult, studentsResult] = await Promise.allSettled([
        apiRequest("/api/user/me", accessToken),
        apiRequest("/api/notifications", accessToken),
        apiRequest("/api/connections/requests?page=1", accessToken),
        apiRequest("/api/user?page=1&role=STUDENT", accessToken),
      ]);

      if (isCancelled) {
        return;
      }

      const nextData = cloneDefaultDashboardState();
      const failedSources = [];
      let studentsCount = nextData.stats[1].value;

      if (profileResult.status === "fulfilled") {
        const profile = profileResult.value?.profile;
        if (profile) {
          const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ");
          nextData.profile = {
            ...nextData.profile,
            adminName: fullName || nextData.profile.adminName,
            adminRole: toRoleLabel(profile.role),
          };
        }
      } else {
        failedSources.push("profile");
      }

      if (requestsResult.status === "fulfilled") {
        const requestItems = requestsResult.value?.connections || [];
        nextData.requests = {
          ...nextData.requests,
          items: requestItems.map((request, index) => {
            const displayName = [request.first_name, request.last_name].filter(Boolean).join(" ") || "Unknown User";
            const universityName =
              request.teacher_profile?.university?.name ||
              request.student_profile?.university?.name ||
              "University pending";
            const roleLabel = request.role ? toRoleLabel(request.role) : "User";

            return {
              id: `req-api-${request.connection_id || index}`,
              apiId: request.connection_id,
              title: `Connection Request: ${displayName}`,
              meta: `${roleLabel} • ${universityName}`,
              submittedAgo: "Pending review",
              icon: request.role === "STUDENT" ? "student" : "user",
            };
          }),
        };
      } else {
        failedSources.push("pending requests");
      }

      if (studentsResult.status === "fulfilled") {
        studentsCount = studentsResult.value?.users?.length || 0;
      } else {
        failedSources.push("student registrations");
      }

      if (notificationsResult.status === "fulfilled") {
        const rawNotifications = notificationsResult.value?.notifications || [];
        const mappedNotifications = rawNotifications.map((item) => {
          const typeConfig = notificationTypeMap[item.type] || {
            category: "approvals",
            tone: "orange",
            icon: "announcements",
          };

          return {
            id: `not-api-${item.id}`,
            apiId: item.id,
            category: typeConfig.category,
            title: item.title,
            message: item.body,
            actionLabel: item.type === "CONNECTION_REQUEST" && !item.is_read ? "Review" : undefined,
            time: toRelativeTime(item.created_at),
            icon: typeConfig.icon,
            tone: typeConfig.tone,
            isRead: item.is_read,
          };
        });

        nextData.notifications = mappedNotifications;
        nextData.activity = {
          ...nextData.activity,
          items: mappedNotifications.slice(0, 4).map((item, index) => ({
            id: `act-api-${index}-${item.apiId || item.id}`,
            title: item.title,
            description: item.message,
            time: item.time,
            tone: activityToneMap[item.tone] || "muted",
          })),
        };
      } else {
        failedSources.push("notifications");
      }

      const pendingCount = nextData.requests.items.length;
      const unreadNotifications = nextData.notifications.filter((item) => !item.isRead).length;
      const activeNotifications = unreadNotifications || nextData.notifications.length;

      nextData.stats = [
        {
          ...nextData.stats[0],
          value: pendingCount,
          pill: pendingCount > 0 ? `${pendingCount} waiting` : "Up to date",
          progress: safeProgress(pendingCount),
        },
        {
          ...nextData.stats[1],
          value: studentsCount,
          pill: studentsCount > 0 ? `+${studentsCount} loaded` : "No records",
          progress: safeProgress(studentsCount, 10, 8),
        },
        {
          ...nextData.stats[2],
          value: activeNotifications,
          pill: unreadNotifications > 0 ? `${unreadNotifications} unread` : "All read",
          progress: safeProgress(activeNotifications, 10, 12),
        },
      ];

      nextData.status = {
        ...nextData.status,
        tone: failedSources.length > 0 ? "warning" : "healthy",
        status: failedSources.length > 0 ? "Live data partially loaded" : "Live API connected",
      };

      setDashboardData(nextData);
      setLiveDataStatus(
        failedSources.length > 0
          ? `Live dashboard connected with fallback for: ${failedSources.join(", ")}.`
          : "Live dashboard data loaded from unispher_api."
      );
      setIsLoading(false);
    };

    loadDashboardData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const unreadCount = dashboardData.notifications.filter((item) => !item.isRead).length;

  const visibleNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return dashboardData.notifications;
    }

    return dashboardData.notifications.filter((item) => item.category === activeFilter);
  }, [activeFilter, dashboardData.notifications]);

  const handleMarkAllAsRead = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

    setDashboardData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((item) => ({ ...item, isRead: true })),
    }));

    if (!accessToken) {
      return;
    }

    const unreadNotificationIds = dashboardData.notifications
      .filter((item) => !item.isRead && Number.isInteger(item.apiId))
      .map((item) => item.apiId);

    if (unreadNotificationIds.length === 0) {
      return;
    }

    await Promise.allSettled(
      unreadNotificationIds.map((notificationId) =>
        apiRequest(`/api/notifications/${notificationId}`, accessToken, { method: "PATCH" })
      )
    );
  };

  const handleAcceptRequest = async (apiId) => {
    if (!apiId) return;
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    try {
      await apiRequest(`/api/connections/${apiId}/accept`, accessToken, { method: "PATCH" });
      setDashboardData((prev) => {
        const newItems = prev.requests.items.filter((item) => item.apiId !== apiId);
        return {
          ...prev,
          requests: { ...prev.requests, items: newItems },
          stats: prev.stats.map((stat, idx) => 
            idx === 0 
              ? { ...stat, value: newItems.length, pill: newItems.length > 0 ? `+${newItems.length} waiting` : "Up to date", progress: safeProgress(newItems.length) }
              : stat
          ),
        };
      });
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };

  const handleRejectRequest = async (apiId) => {
    if (!apiId) return;
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    try {
      await apiRequest(`/api/connections/${apiId}/reject`, accessToken, { method: "DELETE" });
      setDashboardData((prev) => {
        const newItems = prev.requests.items.filter((item) => item.apiId !== apiId);
        return {
          ...prev,
          requests: { ...prev.requests, items: newItems },
          stats: prev.stats.map((stat, idx) => 
            idx === 0 
              ? { ...stat, value: newItems.length, pill: newItems.length > 0 ? `+${newItems.length} waiting` : "Up to date", progress: safeProgress(newItems.length) }
              : stat
          ),
        };
      });
    } catch (error) {
      console.error("Failed to reject request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f2855_0%,_#071329_42%,_#050b18_100%)] text-slate-100">
      <div className="mx-auto flex max-w-[1560px]">
        <AdminSidebar profile={dashboardData.profile} links={adminSidebarLinks} status={dashboardData.status} />

        {mobileSidebarOpen && (
          <>
            <button
              type="button"
              aria-label="Close mobile sidebar"
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden"
            />
            <AdminSidebar
              mode="mobile"
              profile={dashboardData.profile}
              links={adminSidebarLinks}
              status={dashboardData.status}
              onClose={() => setMobileSidebarOpen(false)}
            />
          </>
        )}

        <main className="w-full px-4 pb-8 pt-4 sm:px-7 lg:px-10">
          <header className="mb-8 rounded-2xl border border-white/10 bg-slate-900/55 px-5 py-4 backdrop-blur sm:px-6">
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open mobile sidebar"
                className="inline-flex rounded-lg border border-white/15 bg-slate-800/80 p-2 text-slate-200 transition hover:bg-slate-700 lg:hidden"
              >
                <AppIcon name="menu" className="h-4 w-4" />
              </button>

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
                <p className="mt-2 text-xs text-blue-200/90 sm:text-sm">
                  {isLoading ? "Loading live dashboard data..." : liveDataStatus}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 self-start">
                <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-slate-800/80 px-3 py-2 sm:flex">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-100">{dashboardData.profile.adminName}</p>
                    <p className="text-xs text-slate-400">{dashboardData.profile.adminRole}</p>
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
                  onClick={() => navigate("/dashboard/announcements")}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition hover:bg-blue-400"
                >
                  <AppIcon name="add" className="h-4 w-4" />
                  {adminDashboardHeader.actionLabel}
                </button>
              </div>
            </div>
          </header>

          <AdminStatsGrid cards={dashboardData.stats} />

          <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
            <PendingRequestsCard 
              requests={dashboardData.requests} 
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
              onViewAll={() => navigate("/dashboard/user-registrations")}
            />
            <RecentActivityCard activity={dashboardData.activity} />
          </section>
        </main>
      </div>

      <NotificationsPanel
        isOpen={notificationsOpen}
        filters={notificationFilters}
        activeFilter={activeFilter}
        notifications={visibleNotifications}
        onFilterChange={setActiveFilter}
        onMarkAllRead={handleMarkAllAsRead}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}
