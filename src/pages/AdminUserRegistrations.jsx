import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopNav from "../components/admin/AdminTopNav";
import UserRegistrationStats from "../components/admin/UserRegistrationStats";
import UserRegistrationTabs from "../components/admin/UserRegistrationTabs";
import UserRegistrationsTable from "../components/admin/UserRegistrationsTable";
import { adminProfile, adminSidebarLinks, systemStatus } from "../data/adminDashboardData";
import { ACCESS_TOKEN_STORAGE_KEY, API_BASE_URL } from "../config/api";
import {
  userRegistrationsHeader,
  userRegistrationRows,
  userRegistrationTabs,
} from "../data/userRegistrationsData";

const toRelativeTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Applied recently";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));
  if (diffMinutes < 60) return `Applied ${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Applied ${diffHours} hrs ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `Applied ${diffDays} days ago`;
};

const getInitials = (user) => {
  const first = user.first_name?.[0] || "";
  const last = user.last_name?.[0] || "";
  const initials = `${first}${last}`.trim();
  return initials || "--";
};

const roleLabel = (role) => {
  if (!role) return "Student";
  const normalized = role.toLowerCase();
  return `${normalized.slice(0, 1).toUpperCase()}${normalized.slice(1)}`;
};

const roleTone = (role) =>
  role === "TEACHER"
    ? "bg-violet-500/20 text-violet-300"
    : "bg-orange-500/20 text-orange-300";

export default function AdminUserRegistrations() {
  const [activeTab, setActiveTab] = useState("all");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [rows, setRows] = useState(userRegistrationRows);
  const [isLoading, setIsLoading] = useState(true);
  const [liveStatus, setLiveStatus] = useState("Loading registrations...");

  useEffect(() => {
    let isCancelled = false;

    const loadRegistrations = async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
      if (!accessToken) {
        if (!isCancelled) {
          setRows(userRegistrationRows);
          setIsLoading(false);
          setLiveStatus("No access token found. Showing demo registrations.");
        }
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/user?page=1`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload.message || "Failed to load users");
        }

        const users = payload?.users || [];
        const pendingUsers = users.filter((user) => user.status === "PENDING");
        const mappedRows = pendingUsers.map((user) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`.trim(),
          role: roleLabel(user.role),
          email: user.email,
          department:
            user.student_profile?.field?.name ||
            user.teacher_profile?.field_of_study ||
            user.teacher_profile?.university?.name ||
            "Department pending",
          appliedAt: toRelativeTime(user.created_at),
          initials: getInitials(user),
          tone: roleTone(user.role),
        }));

        if (!isCancelled) {
          if (mappedRows.length > 0) {
            setRows(mappedRows);
            setLiveStatus("Live registrations loaded from API.");
          } else {
            setRows(userRegistrationRows);
            setLiveStatus("No pending registrations found. Showing demo data.");
          }
          setIsLoading(false);
        }
      } catch {
        if (!isCancelled) {
          setRows(userRegistrationRows);
          setIsLoading(false);
          setLiveStatus("Could not load registrations from API. Showing demo data.");
        }
      }
    };

    loadRegistrations();

    return () => {
      isCancelled = true;
    };
  }, []);

  const filteredRows = useMemo(() => {
    if (activeTab === "students") {
      return rows.filter((row) => row.role === "Student");
    }

    if (activeTab === "teachers") {
      return rows.filter((row) => row.role === "Teacher");
    }

    return rows;
  }, [activeTab, rows]);

  const totalPending = rows.length;
  const studentCount = rows.filter((row) => row.role === "Student").length;
  const teacherCount = rows.filter((row) => row.role === "Teacher").length;

  const handleApprove = (row) => {
    setRows((prev) => prev.filter((item) => item.id !== row.id));
    setLiveStatus("Registration marked as verified locally. Admin API action not available yet.");
  };

  const handleReject = (row) => {
    setRows((prev) => prev.filter((item) => item.id !== row.id));
    setLiveStatus("Registration declined locally. Admin API action not available yet.");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f2855_0%,_#071329_42%,_#050b18_100%)] text-slate-100">
      <div className="mx-auto flex max-w-[1560px]">
        <AdminSidebar profile={adminProfile} links={adminSidebarLinks} status={systemStatus} />

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
              profile={adminProfile}
              links={adminSidebarLinks}
              status={systemStatus}
              onClose={() => setMobileSidebarOpen(false)}
            />
          </>
        )}

        <div className="flex min-h-screen w-full flex-col">
          <AdminTopNav
            onOpenSidebar={() => setMobileSidebarOpen(true)}
            profile={adminProfile}
            searchPlaceholder="Search system records..."
          />

          <main className="flex-1 px-6 py-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-slate-100">{userRegistrationsHeader.title}</h1>
                  <p className="mt-2 text-sm text-slate-400">{userRegistrationsHeader.subtitle}</p>
                  <p className="mt-2 text-xs text-blue-200/90">
                    {isLoading ? "Loading registrations..." : liveStatus}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                  >
                    Filter
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                  >
                    Export
                  </button>
                </div>
              </div>

              <UserRegistrationStats total={totalPending} students={studentCount} teachers={teacherCount} />

              <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-xl shadow-slate-950/30">
                <UserRegistrationTabs
                  tabs={userRegistrationTabs}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  summary={`Showing 1-${Math.min(filteredRows.length, 5)} of ${filteredRows.length}`}
                />
                <UserRegistrationsTable
                  rows={filteredRows}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
