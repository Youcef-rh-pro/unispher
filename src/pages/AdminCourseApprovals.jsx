import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopNav from "../components/admin/AdminTopNav";
import CourseApprovalFilters from "../components/admin/CourseApprovalFilters";
import CourseApprovalsTable from "../components/admin/CourseApprovalsTable";
import { adminProfile, adminSidebarLinks, systemStatus } from "../data/adminDashboardData";
import {
  courseApprovalFilters,
  courseApprovalRows,
  courseApprovalsHeader,
} from "../data/courseApprovalsData";
import { ACCESS_TOKEN_STORAGE_KEY, API_BASE_URL } from "../config/api";

export default function AdminCourseApprovals() {
  const [activeFilter, setActiveFilter] = useState("pending");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [rows, setRows] = useState(courseApprovalRows);
  const [isLoading, setIsLoading] = useState(true);
  const [liveStatus, setLiveStatus] = useState("Loading course approvals...");

  useEffect(() => {
    let isCancelled = false;

    const toDisplayDate = (value) => {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return "Recently";
      }

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    };

    const getInitials = (actor) => {
      if (!actor) {
        return "--";
      }

      const first = actor.first_name?.[0] || "";
      const last = actor.last_name?.[0] || "";
      const initials = `${first}${last}`.trim();
      return initials || "--";
    };

    const loadApprovals = async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
      if (!accessToken) {
        if (!isCancelled) {
          setRows(courseApprovalRows);
          setIsLoading(false);
          setLiveStatus("No access token found. Showing demo approvals.");
        }
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(payload.message || "Failed to load approvals");
        }

        const notifications = payload?.notifications || [];
        const approvalNotifications = notifications.filter(
          (item) => item.type === "COURSE_PUBLISHED" || item.type === "SYSTEM"
        );

        const mappedRows = approvalNotifications.map((item, index) => ({
          id: `approval-${item.id || index}`,
          apiId: item.id || null,
          entityId: item.entity_id || null,
          title: item.title || "New course submission",
          meta: item.body || "Pending course review",
          instructor: item.actor
            ? `${item.actor.first_name || ""} ${item.actor.last_name || ""}`.trim() || "Faculty Member"
            : "Faculty Member",
          instructorAvatar: item.actor?.avatar_url || null,
          instructorInitials: getInitials(item.actor),
          instructorTone: "bg-amber-500",
          type: item.type === "COURSE_PUBLISHED" ? "Core Material" : "System Alert",
          typeIcon: item.type === "COURSE_PUBLISHED" ? "book" : "share",
          submitted: toDisplayDate(item.created_at),
        }));

        if (!isCancelled) {
          if (mappedRows.length > 0) {
            setRows(mappedRows);
            setLiveStatus("Live approvals loaded from notifications.");
          } else {
            setRows(courseApprovalRows);
            setLiveStatus("No approvals found in API yet. Showing demo approvals.");
          }
          setIsLoading(false);
        }
      } catch {
        if (!isCancelled) {
          setRows(courseApprovalRows);
          setIsLoading(false);
          setLiveStatus("Could not load approvals from API. Showing demo approvals.");
        }
      }
    };

    loadApprovals();

    return () => {
      isCancelled = true;
    };
  }, []);

  const filteredRows = useMemo(() => {
    if (activeFilter === "all") {
      return rows;
    }

    if (activeFilter === "pending") {
      return rows;
    }

    return [];
  }, [activeFilter, rows]);

  const filters = useMemo(
    () =>
      courseApprovalFilters.map((filter) =>
        filter.id === "pending" ? { ...filter, count: rows.length } : filter
      ),
    [rows]
  );

  const markNotificationRead = async (notificationId) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (!accessToken || !notificationId) {
      return;
    }

    await fetch(`${API_BASE_URL}/api/notifications/${notificationId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const handleApprove = async (row) => {
    await markNotificationRead(row.apiId);
    setRows((prev) => prev.filter((item) => item.id !== row.id));
    setLiveStatus("Course approval recorded. API course status update requires backend support.");
  };

  const handleReject = async (row) => {
    await markNotificationRead(row.apiId);
    setRows((prev) => prev.filter((item) => item.id !== row.id));
    setLiveStatus("Course rejection recorded. API course status update requires backend support.");
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
            searchPlaceholder="Search courses, instructors, or IDs..."
          />

          <main className="flex-1 px-6 py-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-slate-100">{courseApprovalsHeader.title}</h1>
                  <p className="mt-2 text-sm text-slate-400">{courseApprovalsHeader.subtitle}</p>
                  <p className="mt-2 text-xs text-blue-200/90">
                    {isLoading ? "Loading course approvals..." : liveStatus}
                  </p>
                </div>
                <CourseApprovalFilters
                  filters={filters}
                  activeFilter={activeFilter}
                  onChange={setActiveFilter}
                />
              </div>

              <CourseApprovalsTable rows={filteredRows} onApprove={handleApprove} onReject={handleReject} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
