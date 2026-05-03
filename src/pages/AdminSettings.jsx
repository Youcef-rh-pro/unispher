import { useEffect, useState, useRef } from "react";
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

export default function AdminSettings() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [universityId, setUniversityId] = useState(null);
  const [name, setName] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");

  const [coverImage, setCoverImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);

  const coverInputRef = useRef(null);
  const logoInputRef = useRef(null);

  useEffect(() => {
    fetchUniversityData();
  }, []);

  const fetchUniversityData = async () => {
    setIsLoading(true);
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    try {
      const data = await apiRequest("/api/university?limit=1", accessToken);
      if (data.data && data.data.length > 0) {
        const uni = data.data[0];
        setUniversityId(uni.id);
        setName(uni.name || "");
        // In the data, you might have different field names, assuming basic ones here
        setEstablishedYear(uni.established_year || "");
        setDomain(uni.domain || "");
        setDescription(uni.description || "");
        
        // If the API provided cover/logo URLs, we would set them here, 
        // but let's assume we don't have them in the basic model or handle defaults
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(URL.createObjectURL(file));
      // You would typically also save the File object in state to upload it on Save
    }
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoImage(URL.createObjectURL(file));
      // You would typically also save the File object in state to upload it on Save
    }
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    
    if (!universityId) {
      setError("No university data found to update.");
      return;
    }

    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    try {
      // Trying to hit the PATCH endpoint to make the frontend ready
      await apiRequest(`/api/university/${universityId}`, accessToken, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          established_year: establishedYear,
          domain,
          description,
        }),
      });
      setSuccess("Changes saved successfully.");
    } catch (err) {
      // Because the endpoint does not exist yet, this will likely fail
      console.error(err);
      setError(`Failed to save changes: ${err.message}`);
    }
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
                <span className="text-slate-300">Settings</span>
              </span>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
                  Institution Profile
                </h1>
                <p className="mt-2 text-sm text-slate-400 sm:text-base">
                  Manage your university's public-facing information and brand identity.
                </p>
              </div>
            </div>
          </header>

          <section className="mb-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur overflow-hidden">
            {/* Cover Image Area */}
            <div 
              className="relative h-64 w-full bg-slate-800 flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: coverImage ? `url(${coverImage})` : 'none' }}
            >
              {!coverImage && <span className="text-slate-500 font-medium">No Cover Image</span>}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              
              <button
                onClick={() => coverInputRef.current?.click()}
                className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-lg bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 border border-white/10 backdrop-blur-md"
              >
                <AppIcon name="add" className="h-4 w-4" /> {/* Or camera icon if available */}
                Change Cover
              </button>
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverChange}
                accept="image/*"
                className="hidden"
              />

              {/* Logo Box */}
              <div className="absolute -bottom-12 left-8 flex flex-col items-center">
                <div 
                  className="h-28 w-28 rounded-xl border-4 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: logoImage ? `url(${logoImage})` : 'none' }}
                >
                   {!logoImage && <span className="text-xs text-slate-500 font-medium">Logo</span>}
                </div>
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="mt-3 flex items-center gap-2 text-xs font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  <AppIcon name="share" className="h-3 w-3" /> {/* Using share/upload icon approximation */}
                  Update Logo
                </button>
                <input
                  type="file"
                  ref={logoInputRef}
                  onChange={handleLogoChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="p-8 pt-20">
              {error && <div className="mb-6 text-sm text-red-400 bg-red-400/10 p-3 rounded-lg">{error}</div>}
              {success && <div className="mb-6 text-sm text-green-400 bg-green-400/10 p-3 rounded-lg">{success}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Global Tech University"
                    className="w-full rounded-xl border border-white/10 bg-slate-800/50 p-3.5 text-sm text-slate-200 outline-none transition focus:border-blue-500/50 focus:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Established Year
                  </label>
                  <input
                    type="text"
                    value={establishedYear}
                    onChange={(e) => setEstablishedYear(e.target.value)}
                    placeholder="e.g. 1984"
                    className="w-full rounded-xl border border-white/10 bg-slate-800/50 p-3.5 text-sm text-slate-200 outline-none transition focus:border-blue-500/50 focus:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Primary Domain
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="e.g. globaltech.edu"
                    className="w-full rounded-xl border border-white/10 bg-slate-800/50 p-3.5 text-sm text-slate-200 outline-none transition focus:border-blue-500/50 focus:bg-slate-800"
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Institution Bio / Description
                  </label>
                  <span className="text-xs text-slate-500">Max 500 characters</span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a brief description..."
                  maxLength={500}
                  className="h-32 w-full resize-none rounded-xl border border-white/10 bg-slate-800/50 p-4 text-sm text-slate-200 outline-none transition focus:border-blue-500/50 focus:bg-slate-800"
                ></textarea>
              </div>

              <div className="mt-8 flex items-center justify-end gap-4 border-t border-white/10 pt-6">
                <button 
                  type="button" 
                  onClick={() => {
                    // Reset or reload data
                    fetchUniversityData();
                  }}
                  className="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.25)] transition hover:bg-blue-400"
                >
                  <AppIcon name="book" className="h-4 w-4" /> {/* Using book or another save-like icon */}
                  Save Changes
                </button>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
