import { useEffect, useState, useMemo } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AppIcon from "../components/admin/AppIcon";
import { ACCESS_TOKEN_STORAGE_KEY, API_BASE_URL } from "../config/api";
import {
  adminProfile,
  adminSidebarLinks,
  systemStatus,
} from "../data/adminDashboardData";

const apiRequest = async (path, accessToken, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(options.body && !(options.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "API request failed");
  }

  return payload;
};

const toRelativeTime = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Now";
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

export default function AdminAnnouncements() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Form State
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("Entire Campus");
  const [pushNotif, setPushNotif] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    try {
      // The endpoint for posts is /api/posts
      const data = await apiRequest("/api/posts?page=1", accessToken);
      const posts = data.posts || [];
      // Filter only ANNOUNCEMENT
      const announcementPosts = posts.filter(post => post.type === "ANNOUNCEMENT");
      setAnnouncements(announcementPosts);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!subject || !message) {
      setError("Please provide a subject and message.");
      return;
    }

    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    
    // As per plan, combine subject and metadata into the content
    const finalContent = `[${audience}] **${subject}**\n\n${message}`;

    const formData = new FormData();
    formData.append("content", finalContent);
    formData.append("type", "ANNOUNCEMENT");

    try {
      await apiRequest("/api/posts", accessToken, {
        method: "POST",
        body: formData, // the API expects multipart form data for posts
      });
      setSuccess("Announcement published successfully.");
      setSubject("");
      setMessage("");
      setAudience("Entire Campus");
      fetchAnnouncements(); // refresh
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to publish announcement.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const parseContent = (fullContent) => {
    // Basic parser for our formatted content: "[Audience] **Subject**\n\nMessage"
    const match = fullContent.match(/^\[(.*?)\] \*\*(.*?)\*\*\n\n([\s\S]*)$/);
    if (match) {
      return {
        audience: match[1],
        subject: match[2],
        message: match[3]
      };
    }
    // Fallback if it wasn't formatted by us
    return { audience: "Campus", subject: "Announcement", message: fullContent };
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f2855_0%,_#071329_42%,_#050b18_100%)] text-slate-100 font-sans">
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
              <span className="flex items-center gap-2">
                <span>/</span>
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-slate-300">Announcements</span>
              </span>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
                  Campus Announcements
                </h1>
                <p className="mt-2 text-sm text-slate-400 sm:text-base">
                  Broadcast critical information to specific segments of the university population or the entire campus simultaneously.
                </p>
              </div>
            </div>
          </header>

          <section className="mb-8 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur">
            <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
              <AppIcon name="add" className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-slate-100">Draft New Announcement</h2>
            </div>
            
            {error && <div className="mb-4 text-sm text-red-400 bg-red-400/10 p-3 rounded-lg">{error}</div>}
            {success && <div className="mb-4 text-sm text-green-400 bg-green-400/10 p-3 rounded-lg">{success}</div>}

            <form onSubmit={handlePublish} className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Subject / Headline
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Spring Registration Deadlines Extended"
                    className="w-full rounded-xl border border-white/10 bg-slate-800/50 p-3.5 text-sm text-slate-200 outline-none transition focus:border-blue-500/50 focus:bg-slate-800"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Message Content
                    </label>
                    <div className="flex items-center gap-3 text-slate-400">
                      <span className="cursor-pointer hover:text-slate-200 font-serif font-bold">B</span>
                      <span className="cursor-pointer hover:text-slate-200 font-serif italic">I</span>
                      <AppIcon name="share" className="h-4 w-4 cursor-pointer hover:text-slate-200" />
                      <AppIcon name="menu" className="h-4 w-4 cursor-pointer hover:text-slate-200" />
                    </div>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Compose your message here..."
                    className="h-48 w-full resize-none rounded-xl border border-white/10 bg-slate-800/50 p-4 text-sm text-slate-200 outline-none transition focus:border-blue-500/50 focus:bg-slate-800"
                  ></textarea>
                </div>
              </div>

              <div className="w-full lg:w-80 flex flex-col space-y-6">
                <div className="rounded-xl border border-white/10 bg-slate-800/30 p-5">
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Target Audience
                  </h3>
                  <div className="space-y-3">
                    {[
                      { id: "Entire Campus", desc: "All registered active accounts" },
                      { id: "Students Only", desc: "Undergrad & Graduate levels" },
                      { id: "Faculty & Staff", desc: "Instructors and administration" },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
                          audience === opt.id
                            ? "border-blue-500/50 bg-blue-500/10"
                            : "border-white/5 bg-transparent hover:border-white/20"
                        }`}
                      >
                        <div className="mt-0.5 relative flex h-4 w-4 items-center justify-center rounded-full border border-slate-500">
                          {audience === opt.id && <div className="h-2 w-2 rounded-full bg-blue-400" />}
                        </div>
                        <input
                          type="radio"
                          name="audience"
                          value={opt.id}
                          checked={audience === opt.id}
                          onChange={() => setAudience(opt.id)}
                          className="sr-only"
                        />
                        <div>
                          <div className="text-sm font-medium text-slate-200">{opt.id}</div>
                          <div className="text-xs text-slate-400">{opt.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Delivery Options
                  </h3>
                  <div className="space-y-3">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={pushNotif}
                        onChange={(e) => setPushNotif(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
                      />
                      Push Notification
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        checked={emailAlert}
                        onChange={(e) => setEmailAlert(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-slate-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900"
                      />
                      Email Alert
                    </label>
                  </div>
                </div>
              </div>
            </form>

            <div className="mt-8 flex items-center justify-end gap-6 border-t border-white/10 pt-6">
              <button type="button" className="text-sm font-medium text-slate-400 transition hover:text-slate-200">
                Save as Draft
              </button>
              <button
                type="button"
                onClick={handlePublish}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500/20 px-6 py-2.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/30"
              >
                <AppIcon name="share" className="h-4 w-4" />
                Publish Announcement
              </button>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-100">Broadcast History</h2>
              <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-slate-800/50 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200">
                <AppIcon name="menu" className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {isLoading && <p className="text-slate-400">Loading history...</p>}
              {!isLoading && announcements.length === 0 && (
                <p className="text-slate-400">No announcements found.</p>
              )}
              {announcements.map((post) => {
                const { audience, subject, message } = parseContent(post.content);
                
                let rolePillClass = "bg-slate-800 text-slate-300";
                if (audience === "Entire Campus") rolePillClass = "bg-violet-500/20 text-violet-300";
                else if (audience === "Students Only") rolePillClass = "bg-amber-500/20 text-amber-300";
                else if (audience === "Faculty & Staff") rolePillClass = "bg-slate-500/20 text-slate-300";

                return (
                  <div key={post.id} className="rounded-xl border border-white/5 bg-slate-900/40 p-5 transition hover:bg-slate-800/50">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${rolePillClass}`}>
                          {audience}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <AppIcon name="play" className="h-3.5 w-3.5" />
                          <span>{toRelativeTime(post.created_at)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <AppIcon name="search" className="h-4 w-4" />
                          <span>12.4k</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <AppIcon name="share" className="h-4 w-4" />
                          <span>842</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="mb-2 text-lg font-semibold text-slate-200">{subject}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap line-clamp-3">
                      {message}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
