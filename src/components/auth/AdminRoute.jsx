import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  API_BASE_URL,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../../config/api";

export default function AdminRoute() {
  const [accessState, setAccessState] = useState({
    loading: true,
    allowed: false,
  });

  useEffect(() => {
    let isCancelled = false;

    const verifyAdminAccess = async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
      if (!accessToken) {
        if (!isCancelled) {
          setAccessState({ loading: false, allowed: false });
        }
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json().catch(() => ({}));
        const isAdmin = response.ok && data?.profile?.role === "ADMIN";

        if (!isAdmin) {
          localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
          localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
        }

        if (!isCancelled) {
          setAccessState({ loading: false, allowed: isAdmin });
        }
      } catch {
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
        if (!isCancelled) {
          setAccessState({ loading: false, allowed: false });
        }
      }
    };

    verifyAdminAccess();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (accessState.loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-200">
        Verifying admin access...
      </div>
    );
  }

  if (!accessState.allowed) {
    return <Navigate to="/login?reason=admin-only" replace />;
  }

  return <Outlet />;
}
